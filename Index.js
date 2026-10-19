import { Livro, Livros } from "./Livros.js"
import { Usuario, Usuarios } from "./Usuario.js"


function VerificarAlugueis(DiasAviso = 3) {
  let Hoje = new Date();
  Hoje.setHours(0, 0, 0, 0);

  let i = 0;
  while (i < Usuarios.length) {


    let j = 0;
    while (j < Usuarios[i].LivrosAlugados.length) {
      let aluguel = Usuarios[i].LivrosAlugados[j];
      let dias = Math.round((aluguel.Entrega - Hoje) / 86400000);

        if (dias < 0) {
        console.log(`o ${Usuarios[i].Nome} está ${-dias} dia${-dias == 1 ? "" : "s"} atrasado para entregar o "${aluguel.Livro.Titulo}"`);
        } else if (dias == 0) {
        console.log(`o ${Usuarios[i].Nome} deve entregar o "${aluguel.Livro.Titulo}" hoje`);
        } else if (dias <= DiasAviso) {
        console.log(`faltam ${dias} dia${dias == 1 ? "" : "s"} para o ${Usuarios[i].Nome} entregar o "${aluguel.Livro.Titulo}"`);
        }

      j++;
    }

    i++;
  }
}

VerificarAlugueis()