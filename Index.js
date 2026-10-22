import { Livro, Livros, SalvarLivros } from "./Livros.js"
import { Usuario, Usuarios, SalvarUsuarios } from "./Usuario.js"

function VerificarAlugueis(DiasAviso = 3) {
  let Hoje = new Date();
  Hoje.setHours(0, 0, 0, 0);

  let i = 0;
  while (i < Usuarios.length) {


    let j = 0;
    while (j < Usuarios[i].LivrosAlugados.length) {
      let aluguel = Usuarios[i].LivrosAlugados[j];
      let dias = Math.floor((aluguel.Entrega - Hoje) / 86400000);

        if (dias < 0) {
        console.log(`o ${Usuarios[i].Nome} está ${-dias} dia${-dias == 1 ? "" : "s"} atrasado para entregar o "${aluguel.Livro}"`);
        } else if (dias == 0) {
        console.log(`o ${Usuarios[i].Nome} deve entregar o "${aluguel.Livro}" hoje`);
        } else if (dias <= DiasAviso) {
        console.log(`faltam ${dias} dia${dias == 1 ? "" : "s"} para o ${Usuarios[i].Nome} entregar o "${aluguel.Livro}"`);
        }

      j++;
    }

    i++;
  }
}

VerificarAlugueis()

function CriarUsuario(Nome, Dia, Mes, Ano) {
  let usuario = new Usuario(Nome, Dia, Mes, Ano);
  Usuarios.push(usuario);
  SalvarUsuarios();
  return usuario;
}

function CriarLivro(Titulo, Autor, Lancamento, Genero, GenTexto, FaixaEtaria, Estoque) {
  let livro = new Livro(Titulo, Autor, Lancamento, Genero, GenTexto, FaixaEtaria, Estoque);
  Livros.push(livro);
  SalvarLivros();
  return livro;
}

function Devolver(Titulo, NomeUsuario) {
  let i = 0;
  while (i < Usuarios.length) {
    if (Usuarios[i].Nome == NomeUsuario) {

      let j = 0;
      while (j < Usuarios[i].LivrosAlugados.length) {
        if (Usuarios[i].LivrosAlugados[j].Livro == Titulo) {
          Usuarios[i].LivrosAlugados.splice(j, 1);

          let x = 0;
          while (x < Livros.length) {
            if (Livros[x].Titulo == Titulo) {
              Livros[x].Estoque++;
              break;
            }
            x++;
          }

          SalvarLivros();
          SalvarUsuarios();
          return;
        }
        j++;
      }

    }
    i++;
  }
}
