// Define o título da parte de tarefas de acordo com o dia atual

var dia = new Date().getDate();
dia = ('0' + dia);
var mes = new Date().getMonth() + 1;

function dadosNulos() {
  let strHtml = '';
  if (localStorage.length == 0) {
    strHtml = ` <dd>
                   <li>Você ainda não tem tarefas para hoje!</li>
                </dd>`
  }
  document.getElementById('tela1').innerHTML = strHtml;
}


function imprimeTarefas() {
  let strHtml = '';
  let listaTarefas = JSON.parse(localStorage.getItem("dbTasks"));
  // alterar - listaTarefas.tarefas.length
  for (let i = 0; i <= 2; i++) {
    if (listaTarefas.tarefas[i]?.dia == (dia + "/" + mes)) {
      console.log("funcionou");
      strHtml += ` <dd>
                    <ul>
                        <li><b>Nome da tarefa:</b> ${listaTarefas.tarefas[i].nome}</li>
                        <li><b>Dia:</b> ${listaTarefas.tarefas[i]?.dia}</li>
                        <li><b>Prazo:</b> ${listaTarefas.tarefas[i].prazo.split('-').reverse().join('/')}</li>
                        <li><b>Objetivo:</b> ${listaTarefas.tarefas[i].descricao}</li>
                    </ul> 
                </dd>`
    }
  }
  document.getElementById('tela2').innerHTML = strHtml;
}

window.onload = dadosNulos();
window.onload = imprimeTarefas();