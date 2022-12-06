//Lembrete(1): Ao cadastrar novo usuário, um push é dado justamente na chave db_usuarios via JSON no localStorage com todos os dados do usuário.
const pomodoroBtn = document.getElementById('work');
const shortBtn = document.getElementById('short');
const longBtn = document.getElementById('long');
const exibirTempo = document.getElementById("timeDisplay");
const pauseBtn = document.getElementById('pause');
const continueBtn = document.getElementById('continue');
const exibirTexto = document.getElementById('show-text');
const bell = new Audio('../AUDIO/audio_bell.mp3');
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const aprendiz = document.getElementById('aprendiz');
const graduado = document.getElementById('graduado');
const mestre = document.getElementById('mestre');
const doutor = document.getElementById('doutor');
const currentUser = JSON.parse(sessionStorage.getItem('usuarioCorrente')); //Usuário corrente do sessionStorage.
const db_usuarios = JSON.parse(localStorage.getItem('db_usuarios')); //tempos aprendiz, graduado, mestre e doutor armazenado no usuário padrão

let temposPomodoro = 25, temposShortBreak = 5, temposLongBreak = 10;


let minutos = 0, segundos = 0, intervaloId, count = 0, ciclo = 3, totalPomodoro = 0, controlador = 0;

//Função principal

const startTime = () => {
  if (segundos === 0) {
    if (minutos === 0 && controlador != 0) {
      clearInterval(intervaloId) /*Limpa o timer definido pelo método setinterval (desativa a função setInterval)*/
      bell.play()
      return;
    }
    if (controlador == 0) {
      clearInterval(intervaloId);
      return;
    }

  }

  if (segundos > 0) {
    segundos--;
  } else {
    segundos = 60;
    minutos--;
  }

  const textoDoSegundo = segundos < 10 ? "0" + segundos : segundos; /*O método toString retorna REPRESENTAÇÃO string do objeto na base especificada.*/
  const textoDoMinuto = minutos < 10 ? "0" + minutos : minutos;
  exibirTempo.textContent = textoDoMinuto + ":" + textoDoSegundo; /*textContent retorna o conteúdo textual*/


};

if (count > 3) {
  count = 1;
  exibirTexto.textContent = count + "/" + ciclo + " " + "(" + totalPomodoro + ")"
}

//Botões de ação

pomodoroBtn.addEventListener("click", () => {
  clearInterval(intervaloId);
  minutos = temposPomodoro;
  minutos--;
  segundos = 60;
  count++;
  controlador = 1;
  totalPomodoro++;
  if (count > 3) {
    count = 1;
  }
  exibirTexto.textContent = count + "/" + ciclo + " " + "(" + totalPomodoro + ")"
  intervaloId = setInterval(startTime, 1000);     /*função temporizadora cujos parâmetros é a função que vai será executada em intervalos de tempo definidos pelo segundo parâmetro que se encontra em milisegundo (1000ms=1s).*/
});

shortBtn.addEventListener("click", () => {
  clearInterval(intervaloId);
  minutos = temposShortBreak,
    minutos--;
  segundos = 60;
  controlador = 1;
  intervaloId = setInterval(startTime, 1000);
});


longBtn.addEventListener("click", () => {
  clearInterval(intervaloId);
  minutos = temposLongBreak,
    minutos--;
  segundos = 60;
  controlador = 1;
  intervaloId = setInterval(startTime, 1000);
});


pauseBtn.addEventListener("click", () => {
  clearInterval(intervaloId);
});



continueBtn.addEventListener("click", () => {
  clearInterval(intervaloId);
  intervaloId = setInterval(startTime, 1000);
});


// inicio - janela Modal

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
}


[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal())
})

// Fim - Janela Modal

//Pegando a chave db_usuarios no localStorage e armazenando em usuarioAtivo

let usuarioAtivo = JSON.parse(localStorage.getItem("db_usuarios"));

// TESTE MOCK

const mockTest = {
  ...usuarioAtivo,
  tempos: [
    { id: '1', nivel: 'aprendiz', pomodoro: '25', shortBreak: '5', longBreak: '10' }, //0
    { id: '2', nivel: 'graduado', pomodoro: '40', shortBreak: '10', longBreak: '15' }, //1
    { id: '3', nivel: 'mestre', pomodoro: '50', shortBreak: '10', longBreak: '15' }, //2
    { id: '4', nivel: 'doutor', pomodoro: '60', shortBreak: '10', longBreak: '20' } //3
  ],
};

let nivelUsuario, pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario, tempoUsuario;

localStorage.setItem("db_usuarios", JSON.stringify(mockTest));

aprendiz.addEventListener("click", () => {
  temposPomodoro = 25;
  temposShortBreak = 5;
  temposLongBreak = 10;
  exibirTempo.textContent = temposPomodoro + ":" + "00";
  salvarDadosLocalStorage("1");
  carregarDadosUsuario();
});

graduado.addEventListener("click", () => {
  temposPomodoro = 40;
  temposShortBreak = 10;
  temposLongBreak = 15;
  exibirTempo.textContent = temposPomodoro + ":" + "00";
  salvarDadosLocalStorage("2");
  carregarDadosUsuario();
});

mestre.addEventListener("click", () => {
  temposPomodoro = 50;
  temposShortBreak = 10;
  temposLongBreak = 15;
  exibirTempo.textContent = temposPomodoro + ":" + "00";
  salvarDadosLocalStorage("3");
  carregarDadosUsuario();
});

doutor.addEventListener("click", () => {
  temposPomodoro = 60;
  temposShortBreak = 10;
  temposLongBreak = 20;
  exibirTempo.textContent = temposPomodoro + ":" + "00";
  salvarDadosLocalStorage("4");
  carregarDadosUsuario();
});

function carregarDadosUsuario() {
  clearInterval(intervaloId);
  // for (let i = 0; i < usuarioAtivo.tempos.length; i++) {
  //   if (usuarioAtivo.tempos[i].id == tempoUsuario) { //Trocar de usuario ativo (escrito no codigo) para usuario ativo conforme LocalStorage
  //     nivelUsuario = parseInt(usuarioAtivo.tempos[i].id);
  //     pomodoro_Usuario = parseInt(usuarioAtivo.tempos[i].pomodoro);
  //     shortBreak_Usuario = parseInt(usuarioAtivo.tempos[i].shortBreak);
  //     longBreak_Usuario = parseInt(usuarioAtivo.tempos[i].longBreak);
  //   }
  // }

  const { tempos, usuarios } = db_usuarios; // db_usuario é um valor salvo no localStore que tem as chaves tempos, usuarios, na linha 177 estou desconstruindo essas chavez do db_usuarios

  let pomodoroId = '';

  for (let i = 0; i <= usuarios.length; i++) {
    if (usuarios[i]?.login == currentUser?.login) {
      pomodoroId = usuarios[i]?.pomodoroId;
    }
  }

  for (let i = 0; i <= tempos.length; i++) {
    if (tempos[i]?.id == pomodoroId) {
      nivelUsuario = parseInt(usuarioAtivo.tempos[i].id);
      pomodoro_Usuario = parseInt(usuarioAtivo.tempos[i].pomodoro);
      shortBreak_Usuario = parseInt(usuarioAtivo.tempos[i].shortBreak);
      longBreak_Usuario = parseInt(usuarioAtivo.tempos[i].longBreak);
    }
  }

  temposPomodoro = pomodoro_Usuario;
  temposShortBreak = shortBreak_Usuario;
  temposLongBreak = longBreak_Usuario;
  exibirTempo.textContent = temposPomodoro + ":" + "00";
}

function salvarDadosLocalStorage(pomodoroId) {
  const { tempos, usuarios } = db_usuarios;
  //Em uma constante, é possível mudar valores e acrescentar chavez, mas não mudar chavez.
  // exibirTempo.textContent = `${pomodoro}:00`;
  // controlador = 0;
  // localStorage.setItem('long_break', longBreak);
  // localStorage.setItem('short_break', shortBreak);
  // localStorage.setItem('pomodoro', pomodoro);
  // temposPomodoro = pomodoro;                                              
  /*localStorage.getItem("db.usuarios").tempos.*/
  // temposShortBreak = shortBreak;
  // temposLongBreak = longBreak;
  // minutos = 0;
  // segundos = 0;
  // clearInterval(intervaloId);
  const db_users = {
    tempos,
    usuarios
  };

  //Aqui, estamos checando se a chave login de usuarios[i] - objeto do array que é um valor de chave usuarios, é igual ao valor da chave login do usuário corrente no sessionStorage. Caso seja igual, a gente vai armazenar em usuarios[i] uma nova chave: pomodoroId.

  for (let i = 0; i <= usuarios.length; i++) {
    if (usuarios[i]?.login == currentUser?.login) {
      usuarios[i] = { ...usuarios[i], pomodoroId };
      return localStorage.setItem('db_usuarios', JSON.stringify(db_users));
    }
  }
}



// document.body.onload = () => {
//   if (!localStorage.getItem('pomodoro')) {
//     exibirTempo.textContent = temposPomodoro + ":" + "00";
//   }
//   else {
//     temposPomodoro = localStorage.getItem('pomodoro');
//     temposShortBreak = localStorage.getItem('short_break');
//     temposLongBreak = localStorage.getItem('long_break');
//     exibirTempo.textContent = temposPomodoro + ":" + "00";
//   }
// }

// document.body.onload = () => {
//   console.log("entre1")
//   const { tempos, usuarios } = db_usuarios;
//   let pomodoroId = "1";
//   const pomodoroObject = {
//     "id": '1',
//     "nivel": "aprendiz",
//     temposPomodoro,
//     temposShortBreak,
//     temposLongBreak,
//   };

//   for (let i = 0; i <= usuarios.length; i++) {
//     if (usuarios[i]?.login == currentUser?.login) {
//       if (usuarios[i].pomodoroId != undefined) {
//         pomodoroId = usuarios[i].pomodoroId;
//       }
//     }
//   }
//   console.log("entrei2")

//   for (let i = 0; i <= tempos.length; i++) {
//     if (tempos[i]?.id == pomodoroId && pomodoroId != "1") {
//       pomodoroObject.id = tempos[i].id;
//       pomodoroObject.nivel = tempos[i].nivel;
//       pomodoroObject.temposPomodoro = tempos[i].pomodoro;
//       pomodoroObject.temposShortBreak = tempos[i].shortBreak;
//       pomodoroObject.temposLongBreak = tempos[i].longBreak;
//     }
//   }

//   temposPomodoro = pomodoroObject.temposPomodoro;
//   temposShortBreak = pomodoroObject.temposShortBreak;
//   temposLongBreak = pomodoroObject.temposLongBreak;
//   exibirTempo.textContent = pomodoroObject.temposPomodoro + ":" + "00";
//   console.log("entrei3");
// }

const callWhenLoad = () => {
  console.log("entre1")
  const { tempos, usuarios } = db_usuarios;
  let pomodoroId = "1";
  const pomodoroObject = {
    "id": '1',
    "nivel": "aprendiz",
    temposPomodoro,
    temposShortBreak,
    temposLongBreak,
  };

  for (let i = 0; i <= usuarios.length; i++) {
    if (usuarios[i]?.login == currentUser?.login) {
      if (usuarios[i].pomodoroId != undefined) {
        pomodoroId = usuarios[i].pomodoroId;
      }
    }
  }
  console.log("entrei2")

  for (let i = 0; i <= tempos.length; i++) {
    if (tempos[i]?.id == pomodoroId && pomodoroId != "1") {
      pomodoroObject.id = tempos[i].id;
      pomodoroObject.nivel = tempos[i].nivel;
      pomodoroObject.temposPomodoro = tempos[i].pomodoro;
      pomodoroObject.temposShortBreak = tempos[i].shortBreak;
      pomodoroObject.temposLongBreak = tempos[i].longBreak;
    }
  }

  temposPomodoro = pomodoroObject.temposPomodoro;
  temposShortBreak = pomodoroObject.temposShortBreak;
  temposLongBreak = pomodoroObject.temposLongBreak;
  exibirTempo.textContent = pomodoroObject.temposPomodoro + ":" + "00";
  console.log("entrei3");
};

window.onload = callWhenLoad();


