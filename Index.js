let Hoje = new Date();
class Livro {
    constructor(Titulo, Autor, Lancamento, Genero, GenTexto, FaixaEtaria, Estoque) {
        this.Titulo = Titulo // Shadow Slave Vol.1
        this.Autor = Autor // GuiltyThree
        this.Lancamento = Lancamento // Ex.: 30/01/2001
        this.Genero = Genero // Ação, Fantasia, Romance (Romantico) e etc
        this.GenTexto = GenTexto // Romance (novel), Poesia, Jornal e etc
        this.FaixaEtaria = FaixaEtaria // L, 10+, 12+, 14+, 16+, 18+, 21+
        this.Estoque = Estoque // Numero de livros em estoque
    }

    ModificarEstoque(Quantidade) {
        this.Estoque += Quantidade
    }

    EditarLivroTitulo(TituloNovo) {
        this.Titulo = TituloNovo
    }

    EditarLivroAutor(AutorNovo) {
        this.Autor = AutorNovo
    }

    EditarLivroLancamento(LancamentoNovo) {
        this.Lancamento = LancamentoNovo
    }

    EditarLivroGenero(GeneroNovo) {
        this.Genero = GeneroNovo
    }

    EditarLivroGenTexto(GenTextoNovo) {
        this.GenTexto = GenTextoNovo
    }

    EditarLivroFaixaEtaria(FaixaEtariaNovo) {
        this.FaixaEtaria = FaixaEtariaNovo
    }

}



class Usuario {
  constructor(Nome, Dia, Mes, Ano) {
    this.Nome = Nome;
    this.Nascimento = new Date(Ano, Mes - 1, Dia);
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

  get Adulto() {
    return this.Idade >= 18;
  }
}


