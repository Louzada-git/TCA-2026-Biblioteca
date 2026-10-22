import fs from "fs"
import { Livros, SalvarLivros } from "./Livros.js"

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

  Comprar(Titulo) {
    let i = 0;
    while (i < Livros.length) {
      if (Livros[i].Titulo == Titulo && Livros[i].Estoque > 0 && ((this.Idade >= Livros[i].FaixaEtaria) || Livros[i].FaixaEtaria == "L")) {
        Livros[i].Estoque--;
        this.LivrosComprados.push(Livros[i].Titulo);
        SalvarLivros();
        SalvarUsuarios();
        break;
      }
      i++;
    }
  }

  Alugar(Titulo, DiaEntrega, MesEntrega, AnoEntrega) {
    let i = 0;
    while (i < Livros.length) {
      if (Livros[i].Titulo == Titulo && Livros[i].Estoque > 0 && ((this.Idade >= Livros[i].FaixaEtaria) || Livros[i].FaixaEtaria == "L")) {
        Livros[i].Estoque--;
        this.LivrosAlugados.push({
          Livro: Livros[i].Titulo,
          Entrega: new Date(AnoEntrega, MesEntrega - 1, DiaEntrega)
        });
        SalvarLivros();
        SalvarUsuarios();
        break;
      }
      i++;
    }
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
