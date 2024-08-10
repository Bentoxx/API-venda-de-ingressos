import { NextFunction, Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";

export default function validarComprovante(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { comprovante } = req.query;

  if (!comprovante) {
    return res.status(401).json({ mensagem: "Falha na autenticação" });
  }

  const comprovanteEnviado = comprovante as string;

  const idUsuario: string = comprovanteEnviado.split("/")[1];

  const usuarioEncontrado = bancoDeDados.usuarios.find(
    (usuario) => usuario.id === idUsuario
  );

  if (!usuarioEncontrado) {
    return res.status(401).json({ mensagem: "Falha na autenticação" });
  }

  next();
}
