import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bancoDeDados from "../bancoDeDados";
import criptografarSenha from "../auxiliares/criptografia";
import comprovanteLogin from "../fraseSecreta";
import TUsuario from "../tipos/Usuario";

export function cadastrarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  const existeEmailCadastrado = bancoDeDados.usuarios.find(
    (usuario) => usuario.email === email
  );

  if (existeEmailCadastrado) {
    return res.status(400).json({ mensagem: "E-mail já cadastrado" });
  }

  const senhaCriptografada = criptografarSenha(senha);

  const novoUsuario = {
    id: uuidv4(),
    nome,
    email,
    senha: senhaCriptografada,
  };

  bancoDeDados.usuarios.push(novoUsuario);

  const usuarioRetornado: Omit<TUsuario, "senha"> = {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
  };

  return res.status(201).json(usuarioRetornado);
}

export function logarUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  const usuarioEncontrado = bancoDeDados.usuarios.find(
    (usuario) => usuario.email === email
  );

  if (!usuarioEncontrado) {
    return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
  }

  const senhaPassadaCriptografada = criptografarSenha(senha);

  if (senhaPassadaCriptografada !== usuarioEncontrado.senha) {
    return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
  }

  const retorno = comprovanteLogin + "/" + usuarioEncontrado.id;
  return res.status(200).json({ comprovante: retorno });
}
