import fraseSecreta from "../fraseSecreta";


function gerarToken(idDeEntrada:string){
    const comprovante = `${fraseSecreta}/${idDeEntrada}`;
    return comprovante;
}
export default gerarToken;