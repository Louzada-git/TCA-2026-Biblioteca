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

    function ModificarEstoque(Quantidade) {
        Livro.Estoque += Quantidade
    }

    function EditarLivroTitulo(TituloNovo) {
        Livro.Titulo = TituloNovo
    }

    function EditarLivroAutor(AutorNovo) {
        Livro.Autor = AutorNovo
    }

    function EditarLivroLancamento(LancamentoNovo) {
        Livro.Lancamento = LancamentoNovo
    }

    function EditarLivroGenero(GeneroNovo) {
        Livro.Genero = GeneroNovo
    }

    function EditarLivroGenTexto(GenTextoNovo) {
        Livro.GenTexto = GenTextoNovo
    }

    function EditarLivroFaixaEtaria(FaixaEtariaNovo) {
        Livro.FaixaEtaria = FaixaEtariaNovo
    }

}
