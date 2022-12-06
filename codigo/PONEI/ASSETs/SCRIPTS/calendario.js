
const date = new Date();
const locale = "pt-br"

var last = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDate();

//console.log(last);

const listaTarefasMock = {
  "tarefas": [
    {
      "nome": "",
      "dia": "",
      "prazo": "",
      "faltam": "",
      "descricao": "",
      "color": ""
    }
  ]
}

let listaTarefas = JSON.parse(localStorage.getItem("dbTasks"));
if (!listaTarefas) {
  listaTarefas = listaTarefasMock;
}




const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex;

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];


  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = "Hoje: " + new Date().toLocaleDateString(locale);

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prevDate">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today" id="d${i}">${i}</div>`;
    } else {
      days += `<div id="d${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="nextDate">${j}</div>`;

    monthDays.innerHTML = days;
  }

  var numMes = (date.getMonth() + 1);



  changeToDoDay(numMes);

  renderTarefas(numMes);

};

document.querySelector(".prev")?.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  var numMes = (date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next")?.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  var numMes = (date.getMonth() + 1);
  renderCalendar();
});

// Define o título da parte de tarefas de acordo com o dia atual

var dia = new Date().getDate();
var Mes = new Date().getMonth() + 1;
const test = document.getElementById("toDoHoje");

if (Mes < 10 && dia < 10) {
  document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
}
else if (Mes < 10) {
  document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
}
else if (dia < 10) {
  document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
}
else {
  document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
}

renderCalendar();

renderTarefas();


// Muda o título da parte de tarefas de acordo com o dia clicado no calendário

function changeToDoDay(MesReset) {
  window.days.onclick = e => {
    dia = (e.target.textContent).match(/\d+/g); // Separa os números na string

    Mes = MesReset;


    // Muda o título (dd/mm) e coloca um "0" em números do dia e mês menores que 10

    if (e.target.className.includes("prevDate")) {
      Mes -= 1;
    }

    if (e.target.className.includes("nextDate")) {
      if (Mes == 12) {
        Mes = 1;
      }
      else {
        Mes += 1;
      }
    }


    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }

    renderTarefas();

    // Muda o subtítulo

    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }



  }

}


// Volta pro dia atual

function Hoje() {

  var dia = new Date().getDate();
  var Mes = new Date().getMonth() + 1;
  document.getElementById("toDoHoje").innerHTML = ("Hoje");

  if (Mes < 10 && dia < 10) {
    document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
  }
  else if (Mes < 10) {
    document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
  }
  else if (dia < 10) {
    document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
  }
  else {
    document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
  }

  date.setMonth(new Date().getMonth());
  renderCalendar();
  renderTarefas();
}


// Volta um dia 

function funcPrevDia() {

  if (dia > 1) {

    dia -= 1;

    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }


    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }
  }

  console.log(dia);
  renderTarefas();
}


// Avança um dia

function funcNextDia() {

  if (dia < last) {

    //console.log(last);
    dia = dia - 1 + 1;
    dia += 1;

    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }


    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }
  }

  //console.log(dia);
  renderTarefas();

}


// Abre o formulário para criar nova tarefa

function novaTarefa() {

  document.getElementById("formDiv").style.display = "inline";
}


// Transforma os dados do formulário em uma array e salva no local storage

function funcForm() {

  var dataHoje = document.getElementById("diaTitulo").innerHTML;

  let task = Array.from(document.querySelectorAll('#formulario input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  task.dia = dataHoje;
  task.cor = document.querySelector("#cor").value;


  // Usar o ultimo dia de cada mês e o difMes pra achar o faltam

  const lastDays = [
    "31",
    "28",
    "31",
    "30",
    "31",
    "30",
    "31",
    "31",
    "30",
    "31",
    "30",
    "31",
  ];

  var mesDia = task.dia.slice(3, 5);

  var mesPrazo = task.prazo.slice(5, 7);


  var diaDia = task.dia.slice(0, 2);
  console.log(diaDia);
  var diaPrazo = task.prazo.slice(8, 10);
  console.log(diaPrazo);

  if (mesPrazo - mesDia < 0 || (mesPrazo - mesDia == 0 && diaPrazo - diaDia < 0)) {
    task.faltam = "--"
  }

  else {
    var somaMes = 0;

    var difMes = mesPrazo - mesDia;
    console.log("difMes: " + difMes);

    var j = 2;

    for (let i = 0; i < difMes; i++) {

      somaMes += parseInt(lastDays[mesPrazo - j]);
      j++;
    }

    if (difMes > 0) {
      task.faltam = parseInt(somaMes) - parseInt(diaDia) + parseInt(diaPrazo);
    }

    else {
      task.faltam = parseInt(somaMes) - parseInt(diaDia) + parseInt(diaPrazo);
    }

    console.log(somaMes);

  }


  //console.log(task);
  listaTarefas.tarefas.push(task);
  //console.log(listaTarefas.tarefas);
  localStorage.setItem("dbTasks", JSON.stringify(listaTarefas));



  document.getElementById("formDiv").style.display = "none";
  document.getElementById("formulario").reset();
  //renderTarefas();
  renderCalendar();
}



function removerTarefa(i) {


  var items = JSON.parse(localStorage.getItem("dbTasks"));

  items.tarefas.splice(i, 1);

  items = JSON.stringify(items);

  localStorage.setItem("dbTasks", items);

  location.reload();


}




function renderTarefas(Mes) {

  document.getElementById("tarefaBox").innerHTML = ""

  var j = 1;

  for (var i = 1; i < (listaTarefas.tarefas.length); i++) {

    if (listaTarefas.tarefas[i].dia.slice(0, 2) < 10) {

      var diaTarefa = listaTarefas.tarefas[i].dia.slice(1, 2);
      var diaDiv = document.querySelector(".d" + diaTarefa);

      if (Mes == listaTarefas.tarefas[i].dia.slice(3, 5)) {

        document.querySelector("#d" + diaTarefa).innerHTML += `&nbsp<b id='circulo${j}' > ● </b>`;
        document.querySelector("#circulo" + j).setAttribute('class', (listaTarefas.tarefas[i].cor));

        j += 1;
      }



    }

    else {

      var diaTarefa = listaTarefas.tarefas[i].dia.slice(0, 2);
      var diaDiv = document.querySelector("#d" + diaTarefa);

      if (Mes == listaTarefas.tarefas[i].dia.slice(3, 5)) {


        document.querySelector("#d" + diaTarefa).innerHTML += `&nbsp <b id='circulo${j}' > ● </b>`;
        document.querySelector("#circulo" + j).setAttribute('class', (listaTarefas.tarefas[i].cor));

        j += 1;
      }


    }

    if ((listaTarefas.tarefas[i].dia.slice(0, 2) == document.getElementById("diaTitulo").textContent.slice(0, 2)) && (listaTarefas.tarefas[i].dia.slice(3, 5) == document.getElementById("diaTitulo").textContent.slice(3, 5))) {

      var prazoDia = listaTarefas.tarefas[i].prazo.slice(8, 10);
      var prazoMes = listaTarefas.tarefas[i].prazo.slice(5, 7);
      //var prazoAno = listaTarefas.tarefas[i].prazo.slice(0, 4);



      document.getElementById("tarefaBox").innerHTML += `<div class='tarefa' id='${i}'><h2 class='nome' id='nome${i}'>Nome</h2><div class='descri'><div class='desDiv'><h3 class='descricao' id='descricao${i}'>Descrição</h3></div></div><div class='prazoEfalta'><p class='prazo'>Prazo: <b id='praz${i}'>xx/yy/zz</b></p><p class='faltam'>Dias restantes: <b id='falt${i}'>X</b></p></div><button class="remover" id="remover" onclick="this.parentElement.style.display = 'none'; removerTarefa(this.parentElement.id);">Remover</button></div>`

      document.getElementById("praz" + i).textContent = prazoDia + "/" + prazoMes;
      document.getElementById("falt" + i).textContent = listaTarefas.tarefas[i].faltam;
      document.getElementById("nome" + i).textContent = listaTarefas.tarefas[i].nome;
      document.getElementById("descricao" + i).textContent = listaTarefas.tarefas[i].descricao;

    }

  }

  if (document.getElementById("tarefaBox").innerHTML == "") {

    document.getElementById("tarefaBox").innerHTML = "<h1>Sem tarefas</h1>"
  }

  //console.log(listaTarefas.tarefas[1].dia.slice(0, 2));
  //console.log(document.getElementById("diaTitulo").textContent.slice(0, 2));

}

//mudar o tema
function changeStylesheet(newstylesheet){
  document.getElementById('shtylesheet').setAttribute('href', newstylesheet);
}







//const matches = [];
//for (const div of document.querySelectorAll('div')) {
//  if (div.className.includes("prevDate")) {
//    matches.push(div);
//  }
//}
//
//console.log(matches); // 👉️ [div.box]




//function liveSearch() {
//  // Locate the card elements
//  let cards = document.querySelectorAll('.cards')
//  // Locate the search input
//  let search_query = document.getElementById("searchbox").value;
//  // Loop through the cards
//  for (var i = 0; i < cards.length; i++) {
//    // If the text is within the card...
//    if(cards[i].innerText.toLowerCase()
//      // ...and the text matches the search query...
//      .includes(search_query.toLowerCase())) {
//        // ...remove the `.is-hidden` class.
//        cards[i].classList.remove("is-hidden");
//    } else {
//      // Otherwise, add the class.
//      cards[i].classList.add("is-hidden");
//    }
//  }
//}