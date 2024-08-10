import { NextFunction, Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";

export function checarFiltro (req: Request, res: Response, next: NextFunction){
    const {maxPreco} = req.query
    let maxPrecoRecebido 
    if (maxPreco=== undefined){
        return res.status(200).json(bancoDeDados.eventos)
    } 
    if(maxPreco){
        maxPrecoRecebido = typeof maxPreco === 'string'?Number(maxPreco):undefined
        if(maxPrecoRecebido === undefined || maxPrecoRecebido < 0 || isNaN(maxPrecoRecebido)){
            return res.status(400).json({mensagem: 'O preço máximo do evento deve conter apenas números e deve ser positivo'})
        }
    } 
    
    next()
}