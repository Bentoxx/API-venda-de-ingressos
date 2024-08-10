import { NextFunction, Request, Response } from "express";
import { comprovante } from "../controller/controllerUsuario";
import bancoDeDados from "../bancoDeDados";

export function validarComprovante(req: Request, res: Response, next: NextFunction){
    const {comprovante} = req.query
    if(!comprovante){
        return res.status(401).json({mensagem: 'Falha na autenticação'})
    }
    const verificacaoComprovante = typeof comprovante as 'string'
    const verificarId = verificacaoComprovante.split('/')[1]
    const verificarExistUser = bancoDeDados.usuarios.findIndex(idDoUsuario=> idDoUsuario.id === verificarId)
    if(verificarExistUser === -1){
        return res.status(404).json({mensagem: 'Falha na autenticação'})
    }
    next()
    }
