import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import {v4 as uuidv4} from 'uuid';
import criptografarSenha from "../utils/criptografia";
import TUsuario from "../tipos/Usuario";
import gerarToken from "../utils/gerarComprovante";

export const cadastrarUsuario = (req: Request, res: Response) => {
    const {nome, email, senha} = req.body
    const senhaCriptografada = criptografarSenha(senha)
    const novoUsuario: TUsuario = {
        id: uuidv4(),
        nome,
        email,
        senha: senhaCriptografada
    }
    const retornoUsuario = {
        id: uuidv4(),
        nome,
        email,
    }
    bancoDeDados.usuarios.push(novoUsuario)
    return res.status(201).json(retornoUsuario)
}
export let comprovante = ''
export const logarUsuario = (req: Request, res: Response) => {
    const {email, senha} = req.body
    const encontrarUsuario = bancoDeDados.usuarios.find(
        usuario => usuario.email === email
    )
    if(!email || !senha){
        return res.status(404).json({mensagem: 'Todos os campos são obrigatórios'})
    }
    
    if(!encontrarUsuario){
        return res.status(404).json({mensagem: 'E-mail ou senha inválidos'})
    }
    const senhaDigitadaCriptografada = criptografarSenha(senha)
    if(senhaDigitadaCriptografada !== encontrarUsuario.senha){
        return res.status(400).json({mensagem: 'E-mail ou senha inválidos'})
    }
    comprovante = gerarToken(encontrarUsuario.id)
    return res.status(200).json({
        comprovante: comprovante
    })
}