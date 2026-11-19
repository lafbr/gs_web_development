function pegarNumeros(texto) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= "0" && texto[i] <= "9") {
      resultado = resultado + texto[i];
    }
  }
  return resultado;
}

function cpfValido(cpf) {
  let iguais = true;
  for (let i = 1; i < 11; i++) {
    if (cpf[i] != cpf[0]) {
      iguais = false;
    }
  }
  if (iguais == true) {
    return false;
  }

  let soma = 0;
  let peso = 10;
  for (let i = 0; i < 9; i++) {
    soma = soma + Number(cpf[i]) * peso;
    peso = peso - 1;
  }
  let resto = (soma * 10) % 11;
  if (resto == 10) {
    resto = 0;
  }
  if (resto != Number(cpf[9])) {
    return false;
  }

  soma = 0;
  peso = 11;
  for (var i = 0; i < 10; i++) {
    soma = soma + Number(cpf[i]) * peso;
    peso = peso - 1;
  }
  resto = (soma * 10) % 11;
  if (resto == 10) {
    resto = 0;
  }
  if (resto != Number(cpf[10])) {
    return false;
  }

  return true;
}

function cnpjValido(cnpj) {
  let iguais = true;
  for (let i = 1; i < 14; i++) {
    if (cnpj[i] != cnpj[0]) {
      iguais = false;
    }
  }
  if (iguais == true) {
    return false;
  }

  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma = soma + Number(cnpj[i]) * peso;
    peso = peso - 1;
    if (peso < 2) {
      peso = 9;
    }
  }
  let resto = soma % 11;
  let digito1 = 0;
  if (resto >= 2) {
    digito1 = 11 - resto;
  }
  if (digito1 != Number(cnpj[12])) {
    return false;
  }

  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma = soma + Number(cnpj[i]) * peso;
    peso = peso - 1;
    if (peso < 2) {
      peso = 9;
    }
  }
  resto = soma % 11;
  let digito2 = 0;
  if (resto >= 2) {
    digito2 = 11 - resto;
  }
  if (digito2 != Number(cnpj[13])) {
    return false;
  }

  return true;
}

function validar() {
  let erros = 0;
  let tipo = tipoSelecionado();

  let documento = document.getElementById("documento").value.trim();
  let nome = document.getElementById("nome").value.trim();
  let email = document.getElementById("email").value.trim();
  let cep = document.getElementById("cep").value.trim();
  let rua = document.getElementById("rua").value.trim();
  let numero = document.getElementById("numero").value.trim();
  let complemento = document.getElementById("complemento").value.trim();
  let bairro = document.getElementById("bairro").value.trim();
  let cidade = document.getElementById("cidade").value.trim();
  let estado = document.getElementById("estado").value.trim().toUpperCase();
  let produto = document.getElementById("produto").value.trim();

  document.getElementById("resultado").textContent = "";

  document.getElementById("erro-documento").textContent = "";
  let numerosDoc = pegarNumeros(documento);

  if (documento == "") {
    document.getElementById("erro-documento").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (tipo == "cpf") {
    if (numerosDoc.length != 11) {
      document.getElementById("erro-documento").textContent = "O CPF precisa ter 11 números.";
      erros = erros + 1;
    } else if (cpfValido(numerosDoc) == false) {
      document.getElementById("erro-documento").textContent = "CPF inválido.";
      erros = erros + 1;
    }
  } else {
    if (numerosDoc.length != 14) {
      document.getElementById("erro-documento").textContent = "O CNPJ precisa ter 14 números.";
      erros = erros + 1;
    } else if (cnpjValido(numerosDoc) == false) {
      document.getElementById("erro-documento").textContent = "CNPJ inválido.";
      erros = erros + 1;
    }
  }

  document.getElementById("erro-nome").textContent = "";
  if (nome == "") {
    document.getElementById("erro-nome").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (tipo == "cpf" && nome.indexOf(" ") == -1) {
    document.getElementById("erro-nome").textContent = "Digite nome e sobrenome.";
    erros = erros + 1;
  }

  document.getElementById("erro-email").textContent = "";
  if (email == "") {
    document.getElementById("erro-email").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (email.indexOf(" ") != -1) {
    document.getElementById("erro-email").textContent = "O e-mail não pode ter espaço.";
    erros = erros + 1;
  } else if (email.indexOf("@") < 1) {
    document.getElementById("erro-email").textContent = "O e-mail precisa ter @ (exemplo: nome@site.com).";
    erros = erros + 1;
  } else if (email.indexOf(".", email.indexOf("@")) == -1) {
    document.getElementById("erro-email").textContent = "O e-mail precisa ter um ponto depois do @.";
    erros = erros + 1;
  }

  document.getElementById("erro-cep").textContent = "";
  if (cep == "") {
    document.getElementById("erro-cep").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (pegarNumeros(cep).length != 8) {
    document.getElementById("erro-cep").textContent = "O CEP precisa ter 8 números.";
    erros = erros + 1;
  }

  document.getElementById("erro-rua").textContent = "";
  if (rua == "") {
    document.getElementById("erro-rua").textContent = "Preencha este campo.";
    erros = erros + 1;
  }

  document.getElementById("erro-numero").textContent = "";
  if (numero == "") {
    document.getElementById("erro-numero").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (isNaN(numero) == true && numero.toUpperCase() != "S/N") {
    document.getElementById("erro-numero").textContent = "Digite só números (ou S/N).";
    erros = erros + 1;
  }

  document.getElementById("erro-complemento").textContent = "";
  if (complemento == "") {
    document.getElementById("erro-complemento").textContent = "Preencha este campo.";
    erros = erros + 1;
  }

  document.getElementById("erro-bairro").textContent = "";
  if (bairro == "") {
    document.getElementById("erro-bairro").textContent = "Preencha este campo.";
    erros = erros + 1;
  }

  document.getElementById("erro-cidade").textContent = "";
  if (cidade == "") {
    document.getElementById("erro-cidade").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (pegarNumeros(cidade) != "") {
    document.getElementById("erro-cidade").textContent = "A cidade não pode ter número.";
    erros = erros + 1;
  }

  document.getElementById("erro-estado").textContent = "";
  let siglas = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO";
  if (estado == "") {
    document.getElementById("erro-estado").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (estado.length != 2 || siglas.indexOf(estado) == -1) {
    document.getElementById("erro-estado").textContent = "Estado inválido. Exemplo: SP, RJ, MG.";
    erros = erros + 1;
  }

  document.getElementById("erro-produto").textContent = "";
  if (produto == "") {
    document.getElementById("erro-produto").textContent = "Preencha este campo.";
    erros = erros + 1;
  } else if (produto.length < 10) {
    document.getElementById("erro-produto").textContent = "Descreva o produto com pelo menos 10 caracteres.";
    erros = erros + 1;
  }

  if (erros == 0) {
    document.getElementById("resultado").textContent = "Formulário enviado com sucesso!";
  }
}

let ultimoCep = "";
let ultimoCnpj = "";

function preencher(id, valor) {
  if (valor !== undefined && valor !== null && String(valor).trim() !== "") {
    document.getElementById(id).value = String(valor).trim();
  }
}

function limparErro(id) {
  document.getElementById(id).textContent = "";
}

async function buscarCep(cep) {
  let erro = document.getElementById("erro-cep");
  erro.textContent = "Buscando CEP...";

  try {
    let resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    let dados = await resposta.json();

    if (dados.erro) {
      erro.textContent = "CEP não encontrado.";
      return;
    }

    preencher("rua", dados.logradouro);
    preencher("bairro", dados.bairro);
    preencher("cidade", dados.localidade);
    preencher("estado", dados.uf);
    erro.textContent = "";
    limparErro("erro-rua");
    limparErro("erro-bairro");
    limparErro("erro-cidade");
    limparErro("erro-estado");

    if (!dados.logradouro) {
      document.getElementById("rua").focus();
    } else {
      document.getElementById("numero").focus();
    }
  } catch (e) {
    erro.textContent = "Não foi possível buscar o CEP. Preencha manualmente.";
  }
}

async function consultarCnpj(cnpj) {
  let urls = [
    "https://brasilapi.com.br/api/cnpj/v1/" + cnpj,
    "https://minhareceita.org/" + cnpj
  ];

  for (let i = 0; i < urls.length; i++) {
    try {
      let resposta = await fetch(urls[i]);
      if (resposta.status == 404) {
        return { naoEncontrado: true };
      }
      if (resposta.ok) {
        return { dados: await resposta.json() };
      }
      console.error("Falha em " + urls[i] + " - status " + resposta.status);
    } catch (e) {
      console.error("Falha em " + urls[i], e);
    }
  }
  return null;
}

async function buscarCnpj(cnpj) {
  let erro = document.getElementById("erro-documento");

  if (cnpjValido(cnpj) == false) {
    erro.textContent = "CNPJ inválido.";
    return;
  }

  erro.textContent = "Buscando CNPJ...";

  let resultado = await consultarCnpj(cnpj);

  if (resultado == null) {
    erro.textContent = "Não foi possível buscar o CNPJ agora. Tente de novo em instantes ou preencha manualmente.";
    return;
  }
  if (resultado.naoEncontrado) {
    erro.textContent = "CNPJ não encontrado na Receita.";
    return;
  }

  let d = resultado.dados;

  preencher("nome", d.razao_social);
  preencher("email", d.email);
  if (d.cep) {
    let cepTexto = String(d.cep).padStart(8, "0");
    document.getElementById("cep").value = cepTexto.slice(0, 5) + "-" + cepTexto.slice(5);
    ultimoCep = cepTexto;
  }
  preencher("rua", d.logradouro);
  preencher("numero", d.numero);
  preencher("complemento", d.complemento || "nenhum");
  preencher("bairro", d.bairro);
  preencher("cidade", d.municipio);
  preencher("estado", d.uf);

  erro.textContent = "";
  let campos = ["nome", "email", "cep", "rua", "numero", "complemento", "bairro", "cidade", "estado"];
  for (let i = 0; i < campos.length; i++) {
    limparErro("erro-" + campos[i]);
  }
}

document.getElementById("cep").addEventListener("input", function () {
  let numeros = pegarNumeros(this.value);
  if (numeros.length == 8 && numeros != ultimoCep) {
    ultimoCep = numeros;
    buscarCep(numeros);
  } else if (numeros.length != 8) {
    ultimoCep = "";
  }
});

document.getElementById("documento").addEventListener("input", function () {
  let numeros = pegarNumeros(this.value);
  if (tipoSelecionado() == "cnpj" && numeros.length == 14 && numeros != ultimoCnpj) {
    ultimoCnpj = numeros;
    buscarCnpj(numeros);
  } else if (numeros.length != 14) {
    ultimoCnpj = "";
  }
});

function tipoSelecionado() {
  return document.querySelector('input[name="tipo"]:checked').value;
}

function trocarTipo() {
  let tipo = tipoSelecionado();
  let campo = document.getElementById("documento");

  campo.value = "";
  document.getElementById("erro-documento").textContent = "";
  document.getElementById("resultado").textContent = "";
  ultimoCnpj = "";

  if (tipo == "cpf") {
    document.getElementById("rotulo-documento").textContent = "CPF";
    document.getElementById("rotulo-nome").textContent = "Nome completo";
    campo.placeholder = "000.000.000-00";
    campo.maxLength = 14;
  } else {
    document.getElementById("rotulo-documento").textContent = "CNPJ";
    document.getElementById("rotulo-nome").textContent = "Razão social";
    campo.placeholder = "00.000.000/0000-00";
    campo.maxLength = 18;
  }

  campo.focus();
}

let opcoesTipo = document.querySelectorAll('input[name="tipo"]');
for (let i = 0; i < opcoesTipo.length; i++) {
  opcoesTipo[i].addEventListener("change", trocarTipo);
}