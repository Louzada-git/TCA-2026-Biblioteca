import { Livros } from "./Livros.js"

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
      if (Livros[i].Titulo == Titulo && Livros[i].Estoque > 0 && this.Idade >= ((this.Idade >= Livros[i].FaixaEtaria) || Livros[i].FaixaEtaria == "L")) {
        Livros[i].Estoque--;
        this.LivrosComprados.push(Livros[i]);
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
        break;
      }
      i++;
    }
  }
}

let Usuarios = [
  new Usuario("Lucas", 12, 5, 2015),   // 11 anos
  new Usuario("Ana", 3, 11, 2011),     // 14 anos
  new Usuario("Pedro", 25, 8, 2009),   // 17 anos
  new Usuario("Mariana", 7, 2, 2001),  // 25 anos
  new Usuario("Carlos", 30, 12, 1980)  // 45 anos
]

export { Usuario, Usuarios }