import { NextFunction, Request, Response } from "express";

export function validarFiltro(req: Request, res: Response, next: NextFunction) {
  const { maxPreco } = req.query;
  if (maxPreco) {
    const maxPrecoNumero = Number(maxPreco);
    if (isNaN(maxPrecoNumero) || maxPrecoNumero < 0) {
      return res.status(400).json({
        mensagem:
          "O preço máximo do evento deve conter apenas números e deve ser positivo",
      });
    }
  }
  next();
}
