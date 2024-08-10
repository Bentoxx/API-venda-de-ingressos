import { Request, Response, NextFunction } from "express";
import bancoDeDados from "../bancoDeDados";

export function checarUsuario(req: Request, res: Response, next: NextFunction){
    const {nome, email, senha} = req.body
    if(!nome || !email || !senha){
        return res .status(400).json({mensagem: 'Todos os campos são obrigatórios'})
    }
    const usuariosCadastrados = bancoDeDados.usuarios;
    const usuarioEncontrado = usuariosCadastrados.find(
        (usuario) => usuario.email === email
    )
    if(usuarioEncontrado){
        return res.status(400).json({mensagem: 'E-mail já cadastrado'})
    }
    next()
}
export function checarlogin(req: Request, res: Response, next: NextFunction){
    const {email, senha} = req.body
    if(!email || !senha){
        return res .status(400).json({mensagem: 'Todos os campos são obrigatórios'})
    }
    const usuarioEncontrado = bancoDeDados.usuarios.find(
    (usuario) => usuario.email === email
    )
    if(!usuarioEncontrado){
        return res.status(400).json({mensagem: 'E-mail ou senha inválidos'})    
    }
    next()
}