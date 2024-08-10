function criptografarSenha (senha: string){
    const senhainvertida = senha.split('').reverse().join('');
    const criptografia = "zz" + senhainvertida + "yy";
    return criptografia;
}

export default criptografarSenha