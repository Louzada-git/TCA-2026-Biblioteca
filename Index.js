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
