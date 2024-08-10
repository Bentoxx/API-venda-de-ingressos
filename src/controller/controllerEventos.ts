import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import {v4 as uuidv4} from 'uuid';
import TCompra from "../tipos/Compra";


export function inicial (req: Request, res: Response){
    return res.status(200).json({mensagem: 'API de vendas de ingressos'})
}
export function listarEventos(req: Request, res: Response){
    const {maxPreco} = req.query
    const {eventos} = bancoDeDados
    
    const dadosFiltrados = eventos.filter(dado => 
        dado.preco <= Number(maxPreco))
    
    return res.status(200).json(dadosFiltrados)
}
export function fazerCompra(req: Request, res: Response){
    const {idEvento}= req.body
    const {comprovante} = req.query
    const verificarIdEvento = bancoDeDados.eventos.findIndex(idDoEvento => idDoEvento.id === idEvento)
    if(!idEvento){
        return res.status(404).json({mensagem: 'O identificador do evento é obrigatório'})
    }
    if(verificarIdEvento === -1){
        return res.status(400).json({mensagem: 'Evento não encontrado'})
    }
    const verificacaoComprovante = typeof comprovante as 'string'
    const coletarId = verificacaoComprovante.split('/')[1]
    const novaCompra: TCompra={
        id: uuidv4(),
        id_usuario: coletarId,
        id_evento: idEvento
    }
    bancoDeDados.compras.push(novaCompra)
    return res.status(201).json(novaCompra)
}