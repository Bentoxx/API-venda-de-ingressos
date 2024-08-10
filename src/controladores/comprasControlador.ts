import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import TCompra from "../tipos/Compra";
import TEvento from "../tipos/Evento";

type TRetorno = {
  idCompra: string;
  idEvento: string;
  nome: string;
  endereco: string;
  data: string;
  preco: number;
};

export function cadastrarCompra(req: Request, res: Response) {
  const { comprovante } = req.query;
  const { idEvento } = req.body;

  if (!idEvento) {
    return res
      .status(400)
      .json({ mensagem: "O identificador do evento é obrigatório" });
  }

  const eventoEncontrado: TEvento | undefined = bancoDeDados.eventos.find(
    (evento) => evento.id === idEvento
  );

  if (!eventoEncontrado) {
    return res.status(404).json({ mensagem: "Evento não encontrado" });
  }

  const comprovanteEnviado = comprovante as string;

  const idUsuario: string = comprovanteEnviado.split("/")[1];

  const novaCompra: TCompra = {
    id: uuidv4(),
    id_usuario: idUsuario,
    id_evento: idEvento,
  };

  bancoDeDados.compras.push(novaCompra);

  return res.status(201).json(novaCompra);
}

export function listarCompras(req: Request, res: Response) {
  const { comprovante } = req.query;

  const comprovanteEnviado = comprovante as string;

  const idUsuario = comprovanteEnviado.split("/")[1];

  const comprasUsuario: TCompra[] = bancoDeDados.compras.filter(
    (compra) => compra.id_usuario === idUsuario
  );

  const eventos: TEvento[] = bancoDeDados.eventos;

  const dadosComprasUsuario: TRetorno[] = [];

  for (let compra of comprasUsuario) {
    const eventoEncontrado = eventos.find(
      (evento) => evento.id === compra.id_evento
    );
    if (eventoEncontrado) {
      const dadosASeremRetornados = {
        idCompra: compra.id,
        idEvento: eventoEncontrado.id,
        nome: eventoEncontrado.nome,
        endereco: eventoEncontrado.endereco,
        data: eventoEncontrado.data,
        preco: eventoEncontrado.preco,
      };
      dadosComprasUsuario.push(dadosASeremRetornados);
    }
  }

  return res.status(200).json(dadosComprasUsuario);
}

export function deletarCompra(req: Request, res: Response) {
  const { id } = req.params;
  const { comprovante } = req.query;

  const comprovanteEnviado = comprovante as string;

  const idUsuario = comprovanteEnviado.split("/")[1];

  const compraEncontrada: TCompra | undefined = bancoDeDados.compras.find(
    (compra) => compra.id === id
  );

  if (!compraEncontrada || compraEncontrada.id_usuario !== idUsuario) {
    return res.status(404).json({ mensagem: "Compra não encontrada" });
  }

  const idCompraEncontrado = bancoDeDados.compras.findIndex(
    (compra) => compra.id === id
  );

  bancoDeDados.compras.splice(idCompraEncontrado, 1);

  return res.status(204).end();
}
