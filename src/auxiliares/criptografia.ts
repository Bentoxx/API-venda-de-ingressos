export default function criptografarSenha(senha: string): string {
  const senhaInvertida: string = senha.split("").reverse().join("");
  const senhaCriptografada: string = `zz${senhaInvertida}yy`;
  return senhaCriptografada;
}
