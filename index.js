const listaStorage = localStorage.getItem("listaEnderecos")
let listaEnderecos = [];
if (listaStorage) {
  listaEnderecos = JSON.parse(listaStorage);
}

function buscarCep() {
  const inputCep = document.getElementById("input_cep");
  const valorCep = inputCep.value;
  console.log("buscando cep " + valorCep);
  fetch("https://brasilapi.com.br/api/cep/v2/" + valorCep)
    .then((resposta) => {
      return resposta.json();
    })
    .then((json) => {
      console.log(json);
      const inputState = document.getElementById("input_state");
      inputState.value = json.state;

      const inputCity = document.getElementById("input_city");
      inputCity.value = json.city;

      const inputNeighborhood = document.getElementById("input_neighborhood");
      inputNeighborhood.value = json.neighborhood;

      const inputStreet = document.getElementById("input_street");
      inputStreet.value = json.street;
    });
}

function clicarSalvar() {
  console.log("Clicou para salvar");
  const inputCep = document.getElementById("input_cep");
  const valorCep = inputCep.value;

  const inputState = document.getElementById("input_state");
  const valorState = inputState.value;

  const inputCity = document.getElementById("input_city");
  const valorCity = inputCity.value;

  const inputNeighborhood = document.getElementById("input_neighborhood");
  const valorNeighborhood = inputNeighborhood.value;

  const inputStreet = document.getElementById("input_street");
  const valorStreet = inputStreet.value;

  const novoEndereco = {
    cep: valorCep,
    state: valorState,
    city: valorCity,
    neighborhood: valorNeighborhood,
    street: valorStreet
  }

  listaEnderecos.push(novoEndereco);
  console.log(listaEnderecos);
  localStorage.setItem("listaEnderecos", JSON.stringify(listaEnderecos))
}

function configurarEventos() {
  const inputCep = document.getElementById("input_cep");
  inputCep.addEventListener("focusout", buscarCep);

  const botaoSalvar = document.getElementById("botao_salvar");
  botaoSalvar.addEventListener("click", clicarSalvar)
}

window.addEventListener("load", configurarEventos);
