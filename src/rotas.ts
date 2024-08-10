import { Router } from "express";
import { listarEventos } from "./controladores/eventosControlador";
import { validarFiltro } from "./intermediarios/eventosIntermediario";
import {
  cadastrarUsuario,
  logarUsuario,
} from "./controladores/usuariosControlador";
import validarComprovante from "./intermediarios/validarComprovante";
import {
  cadastrarCompra,
  deletarCompra,
  listarCompras,
} from "./controladores/comprasControlador";
import mensagemInicial from "./controladores/rotaPrincipalControlador";

const rotas = Router();

rotas.get("/", mensagemInicial);

rotas.get("/eventos", validarFiltro, listarEventos);

rotas.post("/usuarios", cadastrarUsuario);
rotas.post("/login", logarUsuario);

rotas.use(validarComprovante);

rotas.post("/compras", cadastrarCompra);

rotas.get("/compras", listarCompras);
rotas.delete("/compras/:id", deletarCompra);

export default rotas;
