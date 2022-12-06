// declara um conjunto inicial de contatos
var db_contatos_inicial = {
    "data": [
        {
            "id": 1,
            "nome": "Eliana de Lurdes Maziero",
            "descrição": "Psicóloga há 20 anos. Pós-graduação: Neuropsicologia e MBA em Gestão de Pessoas. Experiência com ansiedade, pânico, depressão, medos, relacionamentos e carreira. O objetivo é propiciar um processo terapêutico seguro, para que você alcance autoconhecimento, força, bem-estar e leveza do seu lugar.",
            "email": "ElianaLurdesMaziero@gmail.com",
            "horarios": "08:00 10:00 17:00 17:30 18:00",
            "valor": "R$9.000,00",
            "cidade": "Santa Catarina"
        },
        {
            "id": 2,
            "nome": "Rodrigo Pires Azevedo",
            "descrição": "Sou psicólogo, atuo utilizando a abordagem junguiana como referência e também realizo intervenções filosóficas. Se você procura um lugar para olhar para dentro, tentar compreender as suas questões internas e dar especial atenção aos seus sonhos, talvez precisemos nos encontrar.",
            "email": "RodrigoPires@gmail.com",
            "horarios": "09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 17:00 17:30",
            "valor": "R$810.00",
            "cidade": "Belo Horizonte"
        },
        {
            "id": 3,
            "nome": "Fernanda Martines Costa",
            "descrição": "Olá, sou psicóloga há 18 anos pela PUC-SP e tenho experiência em temas da área clínica e organizacional, como orientação profissional, reorientação de carreira e processos de psicoterapia, na linha psicanalítica. Atuo também na área da maternagem, como psicóloga perinatal - período que abrange desde a gestação, parto e pós parto (puerpério). Aguardo você para juntos caminharmos, com autoconhecimento e propósito!",
            "email": "FernandaCosta@gmail.com",
            "horarios": "14:00, 14:30, 15:00, 15:30",
            "valor": "R$ 190 / 50 MINUTOS",
            "cidade": "São Paulo"
        },
        {
            "id": 4,
            "nome": "Vinicius Cardoso Lopes",
            "descrição": "Sou psicanalista, hipnoterapeuta, professor universitário e antropólogo, atualmente cursando o pós-doutorado (UFRRJ). Atuo na formação de psicólogos e psicanalistas desde 2013, no ensino superior e em cursos de formação.",
            "email": "ViniciusLopes@gmail.com",
            "horarios": "16:00",
            "valor": "R$ 150 / 50 MINUTOS",
            "cidade": "Rio de Janeiro"
        }
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_contato'));
if (!db) {
    db = db_contatos_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertContato(contato) {
    // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
    let novoId = 1;
    if (db.data.length != 0) 
      novoId = db.data[db.data.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "nome": contato.nome,
        "descrição" : contato.descrição,
        "email": contato.email,
        "horarios" : contato.horarios,
        "valores": contato.valor,
        "cidade": contato.cidade,
        "foto": contato.foto,
        "numero" : contato.numero
    };

    // Insere o novo objeto no array
    db.data.push(novoContato);
    displayMessage("Contato inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function updateContato(id, contato) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].nome = contato.nome,
    db.data[index].descrição = contato.descrição,
    db.data[index].email = contato.email,
    db.data[index].horarios = contato.horarios,
    db.data[index].valor = contato.valor,
    db.data[index].cidade = contato.cidade,
    db.data[index].foto = contato.foto,
    db.data[index].numero = contato.numero

    displayMessage("Contato alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}