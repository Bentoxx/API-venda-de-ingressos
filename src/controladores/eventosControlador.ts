import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import TEvento from "../tipos/Evento";

export function listarEventos(req: Request, res: Response) {
  const { maxPreco } = req.query;
  if (maxPreco) {
    const eventosFiltrados: TEvento[] = bancoDeDados.eventos.filter(
      (evento) => evento.preco <= Number(maxPreco)
    );
    return res.status(200).json(eventosFiltrados);
  }

  return res.status(200).json(bancoDeDados.eventos);
}
