import fs from "fs"

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
        SalvarLivros()
    }

    EditarLivroTitulo(TituloNovo) {
        this.Titulo = TituloNovo
        SalvarLivros()
    }

    EditarLivroAutor(AutorNovo) {
        this.Autor = AutorNovo
        SalvarLivros()
    }

    EditarLivroLancamento(LancamentoNovo) {
        this.Lancamento = LancamentoNovo
        SalvarLivros()
    }

    EditarLivroGenero(GeneroNovo) {
        this.Genero = GeneroNovo
        SalvarLivros()
    }

    EditarLivroGenTexto(GenTextoNovo) {
        this.GenTexto = GenTextoNovo
        SalvarLivros()
    }

    EditarLivroFaixaEtaria(FaixaEtariaNovo) {
        this.FaixaEtaria = FaixaEtariaNovo
        SalvarLivros()
    }

}

let Livros = []

if (fs.existsSync("livros.json")) {
    // o JSON volta como objeto comum, sem os métodos, então recria cada livro com new Livro
    let dados = JSON.parse(fs.readFileSync("livros.json", "utf-8"))
    let i = 0
    while (i < dados.length) {
        let l = dados[i]
        Livros.push(new Livro(l.Titulo, l.Autor, l.Lancamento, l.Genero, l.GenTexto, l.FaixaEtaria, l.Estoque))
        i++
    }
} else {
    // lista padrão, usada só quando o livros.json ainda não existe
    Livros = [
        new Livro("Shadow Slave Vol.1", "Guiltythree", "30/01/2001", "Fantasia sombria", "Romance", 16, 5),
        new Livro("O Hobbit", "J.R.R. Tolkien", "21/09/1937", "Fantasia", "Romance", 10, 5),
        new Livro("Harry Potter e a Pedra Filosofal", "J.K. Rowling", "26/06/1997", "Fantasia", "Romance", 10, 5),
        new Livro("O Nome do Vento", "Patrick Rothfuss", "27/03/2007", "Fantasia", "Romance", 14, 4),
        new Livro("Mistborn: O Império Final", "Brandon Sanderson", "17/07/2006", "Fantasia", "Romance", 14, 5),
        new Livro("A Guerra dos Tronos", "George R.R. Martin", "01/08/1996", "Fantasia sombria", "Romance", 18, 4),
        new Livro("1984", "George Orwell", "08/06/1949", "Distopia", "Romance", 14, 5),
        new Livro("Drácula", "Bram Stoker", "26/05/1897", "Terror", "Romance", 16, 4),
        new Livro("Frankenstein", "Mary Shelley", "01/01/1818", "Terror gótico", "Romance", 14, 5),
        new Livro("O Iluminado", "Stephen King", "28/01/1977", "Terror", "Romance", 18, 4)
    ]
    SalvarLivros()
}

function SalvarLivros() {
    fs.writeFileSync("livros.json", JSON.stringify(Livros, null, 2))
}

// procura o livro pelo título, sem ligar para maiúsculas e minúsculas
function BuscarLivro(Titulo) {
    let i = 0
    while (i < Livros.length) {
        if (Livros[i].Titulo.toLowerCase() == Titulo.toLowerCase()) return Livros[i]
        i++
    }
    return null
}

export { Livro, Livros, SalvarLivros, BuscarLivro }
