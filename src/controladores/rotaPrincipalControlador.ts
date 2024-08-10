import { Request, Response } from "express";

export default async function mensagemInicial(_req: Request, res: Response) {
  return res.status(200).json({ mensagem: "API de vendas de ingressos" });
}
