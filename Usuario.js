class Usuario {
  constructor(Nome, Dia, Mes, Ano) {
    this.Nome = Nome;
    this.Nascimento = new Date(Ano, Mes - 1, Dia);
    this.LivrosComprados = [];
  }

  get Idade() {
    let idade = new Date().getFullYear() - this.Nascimento.getFullYear();
    let jaFezAniversario =
      Hoje.getMonth() > this.Nascimento.getMonth() ||
      (Hoje.getMonth() === this.Nascimento.getMonth() &&
        Hoje.getDate() >= this.Nascimento.getDate());

    if (!jaFezAniversario) idade--;
    return idade;
  }


  Comprar(Titulo) {
    let i = 0;
    while (i < Livros.length && Livros[i].Titulo !== Titulo) {
      i++;
      if (Livros[i].Titulo == Titulo && Livros[i].Estoque > 0 && this.Idade >= Livros[i].FaixaEtaria) {
        Livros[i].Estoque--;
        this.LivrosComprados 
      }
    }
  } 
}

export { Usuario }