import { Router } from "express";
import { inicial, listarEventos } from "./controller/controllerEventos";
import { checarFiltro } from "./Middlewares/middlewareVendas";
import { cadastrarUsuario, logarUsuario } from "./controller/controllerUsuario";
import { checarUsuario, checarlogin } from "./Middlewares/middlewareUsuario";
import { validarComprovante } from "./Middlewares/middlewareComprovante";


const rotas = Router();

rotas.get('/', inicial)
rotas.get('/eventos', checarFiltro, listarEventos)
rotas.post('/usuarios', checarUsuario, cadastrarUsuario)
rotas.post('/login', checarlogin, logarUsuario)
rotas.use(validarComprovante)
rotas.post('/compras')
rotas.get('/compras')

export default rotas;
