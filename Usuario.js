import fs from "fs"
import { SalvarLivros, BuscarLivro } from "./Livros.js"

class Usuario {
  constructor(Nome, Dia, Mes, Ano) {
    this.Nome = Nome;
    this.Nascimento = new Date(Ano, Mes - 1, Dia);
    this.LivrosComprados = [];
    this.LivrosAlugados = [];
  }

  get Idade() {
    let Hoje = new Date();
    let idade = Hoje.getFullYear() - this.Nascimento.getFullYear();
    let jaFezAniversario =
      Hoje.getMonth() > this.Nascimento.getMonth() ||
      (Hoje.getMonth() === this.Nascimento.getMonth() &&
        Hoje.getDate() >= this.Nascimento.getDate());

    if (!jaFezAniversario) idade--;
    return idade;
  }

  // devolve o motivo se o usuário não puder pegar o livro, ou "" se puder
  PodePegar(livro) {
    if (livro == null) return "Livro não encontrado";
    if (livro.Estoque <= 0) return `"${livro.Titulo}" está sem estoque`;
    if (livro.FaixaEtaria != "L" && this.Idade < livro.FaixaEtaria) {
      return `"${livro.Titulo}" é para maiores de ${livro.FaixaEtaria} anos, ${this.Nome} tem ${this.Idade}`;
    }
    return "";
  }

  Comprar(Titulo) {
    let livro = BuscarLivro(Titulo);
    let erro = this.PodePegar(livro);
    if (erro != "") return erro;

    livro.Estoque--;
    this.LivrosComprados.push(livro.Titulo);
    SalvarLivros();
    SalvarUsuarios();
    return `Compra feita: "${livro.Titulo}"`;
  }

  Alugar(Titulo, DiaEntrega, MesEntrega, AnoEntrega) {
    let livro = BuscarLivro(Titulo);
    let erro = this.PodePegar(livro);
    if (erro != "") return erro;

    let i = 0;
    while (i < this.LivrosAlugados.length) {
      if (this.LivrosAlugados[i].Livro == livro.Titulo) return `${this.Nome} já está com "${livro.Titulo}" alugado`;
      i++;
    }

    let Hoje = new Date();
    Hoje.setHours(0, 0, 0, 0);
    let Entrega = new Date(AnoEntrega, MesEntrega - 1, DiaEntrega);
    if (Entrega < Hoje) return "A data de entrega não pode ser antes de hoje";

    livro.Estoque--;
    this.LivrosAlugados.push({
      Livro: livro.Titulo,
      Entrega: Entrega
    });
    SalvarLivros();
    SalvarUsuarios();
    return `Aluguel feito: "${livro.Titulo}", entregar até ${Entrega.toLocaleDateString("pt-BR")}`;
  }
}

let Usuarios = [];

if (fs.existsSync("usuarios.json")) {
  // as datas voltam do JSON como texto, então converte de volta para Date
  let dados = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
  let i = 0;
  while (i < dados.length) {
    let u = dados[i];
    let nasc = new Date(u.Nascimento);
    let usuario = new Usuario(u.Nome, nasc.getDate(), nasc.getMonth() + 1, nasc.getFullYear());
    usuario.LivrosComprados = u.LivrosComprados;

    let j = 0;
    while (j < u.LivrosAlugados.length) {
      usuario.LivrosAlugados.push({
        Livro: u.LivrosAlugados[j].Livro,
        Entrega: new Date(u.LivrosAlugados[j].Entrega)
      });
      j++;
    }

    Usuarios.push(usuario);
    i++;
  }
} else {
  // lista padrão, usada só quando o usuarios.json ainda não existe
  Usuarios = [
    new Usuario("Lucas", 12, 5, 2015),   // 11 anos
    new Usuario("Ana", 3, 11, 2011),     // 14 anos
    new Usuario("Pedro", 25, 8, 2009),   // 17 anos
    new Usuario("Mariana", 7, 2, 2001),  // 25 anos
    new Usuario("Carlos", 30, 12, 1980)  // 45 anos
  ];
  SalvarUsuarios();
}

function SalvarUsuarios() {
  fs.writeFileSync("usuarios.json", JSON.stringify(Usuarios, null, 2));
}

export { Usuario, Usuarios, SalvarUsuarios }
