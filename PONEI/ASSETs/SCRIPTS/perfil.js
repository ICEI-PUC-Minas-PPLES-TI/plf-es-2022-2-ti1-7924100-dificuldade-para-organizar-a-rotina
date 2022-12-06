
function leDados() {
  let strDados = localStorage.getItem('dbPerfil');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  }
  else {
    objDados = {
      "contatos": [
        { "nome": "Romeu Cordeiro", "aniversario": "12/02", "email": "romeutiktoker@gmail.com", "status": "estudante" }
      ]
    }
  }
  return objDados;
}

function salvaDados(dados) {
  localStorage.setItem('dbPerfil', JSON.stringify(dados));
}

function imprimeDados() {
  let telinha = document.getElementById('telinha');
  let strHtml = '';
  let objDados = leDados();


  for (i = 0; i < objDados.contatos.length; i++) {
    console.log('imprimir');
    strHtml = `
        <h2>${objDados.contatos[i].nome}</h2>
        <p><b>Aniversário:</b> ${objDados.contatos[i].aniversario.split('-').reverse().join('/')}<br>
        <b>Email:</b> ${objDados.contatos[i].email}<br>
        <b>Status:</b> ${objDados.contatos[i].status}</p>`
    localStorage.getItem('dbPerfil');
  }
  telinha.innerHTML = strHtml;
}

function incluirContato() {
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo contato
  let strNome = $("#inputNome").val();
  let strAniversario = $("#inputAniversario").val();
  let strEmail = $('#inputEmail').val();
  let strStatus = $("#inputStatus").val();

  let contato = {
    nome: strNome,
    aniversario: strAniversario,
    email: strEmail,
    status: strStatus
  };

  objDados.contatos.push(contato);
  contato = localStorage.setItem('dbPerfil', JSON.stringify(contato));


  // Salvar os dados no localStorage novamente
  salvaDados(objDados);

  // Atualiza os dados da tela
  imprimeDados();
}

function deletarAnterior() {
  console.log('deletar');
  localStorage.clear();
}


function refreshPage() {
  console.log('refrescar');
  window.location.reload(true);
}

window.onload = imprimeDados();

// Configura os botões
document.getElementById('btnSalva').addEventListener('click', deletarAnterior);
document.getElementById('btnSalva').addEventListener('click', incluirContato);
document.getElementById('btnSalva').addEventListener('click', refreshPage);
