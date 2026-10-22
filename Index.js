import readline from "readline/promises"
import { Livro, Livros, SalvarLivros, BuscarLivro } from "./Livros.js"
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

// procura o usuário pelo nome, sem ligar para maiúsculas e minúsculas
function BuscarUsuario(Nome) {
  let i = 0;
  while (i < Usuarios.length) {
    if (Usuarios[i].Nome.toLowerCase() == Nome.toLowerCase()) return Usuarios[i];
    i++;
  }
  return null;
}

// transforma "dd/mm/aaaa" em Date, ou devolve null se a data for inválida
function LerData(Texto) {
  let partes = Texto.split("/");
  if (partes.length != 3) return null;

  let dia = Number(partes[0]);
  let mes = Number(partes[1]);
  let ano = Number(partes[2]);
  if (!Number.isInteger(dia) || !Number.isInteger(mes) || !Number.isInteger(ano)) return null;

  let data = new Date(ano, mes - 1, dia);
  // o Date aceita 31/02 e vira 03/03, então confere se a data continua igual
  if (data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano) return null;

  return data;
}

function CriarUsuario(Nome, Dia, Mes, Ano) {
  if (BuscarUsuario(Nome) != null) return `Já existe um usuário chamado ${Nome}`;

  let usuario = new Usuario(Nome, Dia, Mes, Ano);
  if (usuario.Nascimento > new Date()) return "A data de nascimento não pode ser no futuro";

  Usuarios.push(usuario);
  SalvarUsuarios();
  return `Usuário ${Nome} criado`;
}

function CriarLivro(Titulo, Autor, Lancamento, Genero, GenTexto, FaixaEtaria, Estoque) {
  if (BuscarLivro(Titulo) != null) return `Já existe um livro chamado "${Titulo}"`;

  let livro = new Livro(Titulo, Autor, Lancamento, Genero, GenTexto, FaixaEtaria, Estoque);
  Livros.push(livro);
  SalvarLivros();
  return `Livro "${Titulo}" criado`;
}

function Devolver(Titulo, NomeUsuario) {
  let usuario = BuscarUsuario(NomeUsuario);
  if (usuario == null) return "Usuário não encontrado";

  let j = 0;
  while (j < usuario.LivrosAlugados.length) {
    if (usuario.LivrosAlugados[j].Livro.toLowerCase() == Titulo.toLowerCase()) {
      let tituloAlugado = usuario.LivrosAlugados[j].Livro;
      usuario.LivrosAlugados.splice(j, 1);

      let livro = BuscarLivro(tituloAlugado);
      if (livro != null) livro.Estoque++;

      SalvarLivros();
      SalvarUsuarios();
      return `"${tituloAlugado}" devolvido`;
    }
    j++;
  }

  return `${usuario.Nome} não está com "${Titulo}" alugado`;
}

let rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// faz a pergunta e tira os espaços sobrando do começo e do fim
async function Perguntar(Texto) {
  return (await rl.question(Texto)).trim();
}

let rodando = true;

while (rodando) {
  console.log("\n===== Biblioteca =====");
  console.log("1 - Listar livros");
  console.log("2 - Listar usuários");
  console.log("3 - Comprar livro");
  console.log("4 - Alugar livro");
  console.log("5 - Devolver livro");
  console.log("6 - Adicionar usuário");
  console.log("7 - Adicionar livro");
  console.log("0 - Sair");

  let opcao = await Perguntar("Escolha: ");

  if (opcao == "1") {
    if (Livros.length == 0) console.log("Nenhum livro cadastrado");

    let i = 0;
    while (i < Livros.length) {
      console.log(`${Livros[i].Titulo} - ${Livros[i].Autor} | ${Livros[i].FaixaEtaria} | estoque: ${Livros[i].Estoque}`);
      i++;
    }

  } else if (opcao == "2") {
    if (Usuarios.length == 0) console.log("Nenhum usuário cadastrado");

    let i = 0;
    while (i < Usuarios.length) {
      let u = Usuarios[i];
      console.log(`\n${u.Nome} (${u.Idade} anos)`);
      console.log(`  Comprados: ${u.LivrosComprados.length > 0 ? u.LivrosComprados.join(", ") : "nenhum"}`);

      if (u.LivrosAlugados.length == 0) {
        console.log("  Alugados: nenhum");
      } else {
        console.log("  Alugados:");
        let j = 0;
        while (j < u.LivrosAlugados.length) {
          console.log(`    ${u.LivrosAlugados[j].Livro} - entrega ${u.LivrosAlugados[j].Entrega.toLocaleDateString("pt-BR")}`);
          j++;
        }
      }

      i++;
    }

  } else if (opcao == "3") {
    let usuario = BuscarUsuario(await Perguntar("Seu nome: "));
    if (usuario == null) {
      console.log("Usuário não encontrado");
    } else {
      console.log(usuario.Comprar(await Perguntar("Título do livro: ")));
    }

  } else if (opcao == "4") {
    let usuario = BuscarUsuario(await Perguntar("Seu nome: "));
    if (usuario == null) {
      console.log("Usuário não encontrado");
    } else {
      let titulo = await Perguntar("Título do livro: ");
      let entrega = LerData(await Perguntar("Data de entrega (dd/mm/aaaa): "));
      if (entrega == null) {
        console.log("Data inválida, use o formato dd/mm/aaaa");
      } else {
        console.log(usuario.Alugar(titulo, entrega.getDate(), entrega.getMonth() + 1, entrega.getFullYear()));
      }
    }

  } else if (opcao == "5") {
    let nome = await Perguntar("Seu nome: ");
    let titulo = await Perguntar("Título do livro: ");
    console.log(Devolver(titulo, nome));

  } else if (opcao == "6") {
    let nome = await Perguntar("Nome: ");
    if (nome == "") {
      console.log("O nome não pode ficar vazio");
    } else {
      let nasc = LerData(await Perguntar("Data de nascimento (dd/mm/aaaa): "));
      if (nasc == null) {
        console.log("Data inválida, use o formato dd/mm/aaaa");
      } else {
        console.log(CriarUsuario(nome, nasc.getDate(), nasc.getMonth() + 1, nasc.getFullYear()));
      }
    }

  } else if (opcao == "7") {
    let titulo = await Perguntar("Título: ");
    let autor = await Perguntar("Autor: ");
    let lancamento = await Perguntar("Lançamento (dd/mm/aaaa): ");
    let genero = await Perguntar("Gênero: ");
    let genTexto = await Perguntar("Gênero textual: ");
    let faixa = (await Perguntar("Faixa etária (L, 10, 12, 14, 16, 18, 21): ")).toUpperCase().replace("+", "");
    let estoque = await Perguntar("Estoque: ");

    if (titulo == "" || autor == "" || genero == "" || genTexto == "") {
      console.log("Nenhum campo pode ficar vazio");
    } else if (LerData(lancamento) == null) {
      console.log("Data de lançamento inválida, use o formato dd/mm/aaaa");
    } else if (!["L", "10", "12", "14", "16", "18", "21"].includes(faixa)) {
      console.log("Faixa etária inválida, use L, 10, 12, 14, 16, 18 ou 21");
    } else if (estoque == "" || !Number.isInteger(Number(estoque)) || Number(estoque) < 0) {
      console.log("O estoque precisa ser um número inteiro, 0 ou maior");
    } else {
      console.log(CriarLivro(titulo, autor, lancamento, genero, genTexto, faixa == "L" ? "L" : Number(faixa), Number(estoque)));
    }

  } else if (opcao == "0") {
    rodando = false;

  } else {
    console.log("Opção inválida, escolha um número de 0 a 7");
  }
}

rl.close();
