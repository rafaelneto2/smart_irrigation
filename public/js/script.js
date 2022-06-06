function Login() {
    var done = 0;
    var usuario = document.getElementById('usuario');
    var senha = document.getElementById('senha');
    if (usuario.value === "admin" && senha.value === "tst123") {
        window.location="home.html";
        done = 1;
    }
    if (done === 0) { alert("Dados incorretos, tente novamente"); }
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCzQbi51doR6ivijLI-whcfdtekVGwIkXo",
    authDomain: "irrigacao-inteligente.firebaseapp.com",
    databaseURL: "https://irrigacao-inteligente.firebaseio.com",
    projectId: "irrigacao-inteligente",
    storageBucket: "irrigacao-inteligente.appspot.com",
    messagingSenderId: "929348565294",
    appId: "1:929348565294:web:b415f0273a313b483ae2bf",
    measurementId: "G-40L619B9P2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function verificaPeriodo(idDiv, idSelect){
    elementSelect = document.getElementById(idSelect);
    if (elementSelect.value !== '2') {
        document.getElementById(idDiv).classList.remove("d-block");
        document.getElementById(idDiv).classList.add("d-none");
    } else {
        document.getElementById(idDiv).classList.remove("d-none");
        document.getElementById(idDiv).classList.add("d-block");
    }
}

function salvaDadosSetor1(){

    var db = firebase.database();

    var setor1Duracao = db.ref('setor1/duracao');
    var setor1Domingo = db.ref('setor1/dia/domingo');
    var setor1Segunda = db.ref('setor1/dia/segunda');
    var setor1Terca = db.ref('setor1/dia/terca');
    var setor1Quarta = db.ref('setor1/dia/quarta');
    var setor1Quinta = db.ref('setor1/dia/quinta');
    var setor1Sexta = db.ref('setor1/dia/sexta');
    var setor1Sabado = db.ref('setor1/dia/sabado');

    var periodoEscolhido = document.getElementById('periodoSetor1');
    var diasEscolhidos = document.getElementById('diasSetor1');
    var horarios = document.getElementById('horariosSetor1');
    var duracao = document.getElementById('duracaoSetor1');

    if (periodoEscolhido.value === '2'){
        if (diasEscolhidos.value) { // verifica se há ao menos 1 item selecionado
            for (i = 1; i < diasEscolhidos.length; i++) {
                if ((diasEscolhidos[i].value === "0") && (diasEscolhidos[i].selected === true)){
                    setor1Domingo.set(true);
                }
                else if ((diasEscolhidos[i].value === "1") && (diasEscolhidos[i].selected === true)){
                    setor1Segunda.set(true);
                }
                else if ((diasEscolhidos[i].value === "2") && (diasEscolhidos[i].selected === true)){
                    setor1Terca.set(true);
                }
                else if ((diasEscolhidos[i].value === "3") && (diasEscolhidos[i].selected === true)){
                    setor1Quarta.set(true);
                }
                else if ((diasEscolhidos[i].value === "4") && (diasEscolhidos[i].selected === true)){
                    setor1Quinta.set(true);
                }
                else if ((diasEscolhidos[i].value === "5") && (diasEscolhidos[i].selected === true)){
                    setor1Sexta.set(true);
                }
                else if ((diasEscolhidos[i].value === "6") && (diasEscolhidos[i].selected === true)){
                    setor1Sabado.set(true);
                }
                else if ((diasEscolhidos[i].value === "0") && (diasEscolhidos[i].selected === false)){
                    setor1Domingo.set(false);
                }
                else if ((diasEscolhidos[i].value === "1") && (diasEscolhidos[i].selected === false)){
                    setor1Segunda.set(false);
                }
                else if ((diasEscolhidos[i].value === "2") && (diasEscolhidos[i].selected === false)){
                    setor1Terca.set(false);
                }
                else if ((diasEscolhidos[i].value === "3") && (diasEscolhidos[i].selected === false)){
                    setor1Quarta.set(false);
                }
                else if ((diasEscolhidos[i].value === "4") && (diasEscolhidos[i].selected === false)){
                    setor1Quinta.set(false);
                }
                else if ((diasEscolhidos[i].value === "5") && (diasEscolhidos[i].selected === false)){
                    setor1Sexta.set(false);
                }
                else if ((diasEscolhidos[i].value === "6") && (diasEscolhidos[i].selected === false)){
                    setor1Sabado.set(false);
                }
            }
        } else {
            alert("Nenhum dia selecionado.");
        }
    } else if (periodoEscolhido.value === '1') {
        setor1Domingo.set(true);
        setor1Segunda.set(true);
        setor1Terca.set(true);
        setor1Quarta.set(true);
        setor1Quinta.set(true);
        setor1Sexta.set(true);
        setor1Sabado.set(true);
    } else {
        alert("Nenhum período selecionado.");
    }

    var horariosSet1 = []; // cria a array
    var aux = 1;

    if (horarios.value) { // verifica se há ao menos 1 item selecionado
        db.ref('setor1/horario').set(false);
        for (i = 0; i < horarios.length; i++) {
            if (horarios[i].selected === true) {

                horariosSet1.push(horarios[i].value); // adiciona na array apenas os itens selecionados

                db.ref('setor1/horario/hora' + aux).set(horarios[i].value);

                aux++;
            }
        }
    } else {
        alert("Nenhum horário selecionado.");
    }

    if (duracao.value == null || duracao.value === 0 || duracao.value === ''){
        alert("Preencha o campo de duração.");
    } else {
        setor1Duracao.set(parseInt(document.getElementById('duracaoSetor1').value));
        alert("Configurações salvas com sucesso!");
    }

}

function salvaDadosSetor2(){

    var db = firebase.database();

    var setor2Duracao = db.ref('setor2/duracao');
    var setor2Domingo = db.ref('setor2/dia/domingo');
    var setor2Segunda = db.ref('setor2/dia/segunda');
    var setor2Terca = db.ref('setor2/dia/terca');
    var setor2Quarta = db.ref('setor2/dia/quarta');
    var setor2Quinta = db.ref('setor2/dia/quinta');
    var setor2Sexta = db.ref('setor2/dia/sexta');
    var setor2Sabado = db.ref('setor2/dia/sabado');

    var periodoEscolhido = document.getElementById('periodoSetor2');
    var diasEscolhidos = document.getElementById('diasSetor2');
    var horarios = document.getElementById('horariosSetor2');
    var duracao = document.getElementById('duracaoSetor2');

    if (periodoEscolhido.value === '2'){
        if (diasEscolhidos.value) { // verifica se há ao menos 1 item selecionado
            for (i = 1; i < diasEscolhidos.length; i++) {
                if ((diasEscolhidos[i].value === "0") && (diasEscolhidos[i].selected === true)){
                    setor2Domingo.set(true);
                }
                else if ((diasEscolhidos[i].value === "1") && (diasEscolhidos[i].selected === true)){
                    setor2Segunda.set(true);
                }
                else if ((diasEscolhidos[i].value === "2") && (diasEscolhidos[i].selected === true)){
                    setor2Terca.set(true);
                }
                else if ((diasEscolhidos[i].value === "3") && (diasEscolhidos[i].selected === true)){
                    setor2Quarta.set(true);
                }
                else if ((diasEscolhidos[i].value === "4") && (diasEscolhidos[i].selected === true)){
                    setor2Quinta.set(true);
                }
                else if ((diasEscolhidos[i].value === "5") && (diasEscolhidos[i].selected === true)){
                    setor2Sexta.set(true);
                }
                else if ((diasEscolhidos[i].value === "6") && (diasEscolhidos[i].selected === true)){
                    setor2Sabado.set(true);
                }
                else if ((diasEscolhidos[i].value === "0") && (diasEscolhidos[i].selected === false)){
                    setor2Domingo.set(false);
                }
                else if ((diasEscolhidos[i].value === "1") && (diasEscolhidos[i].selected === false)){
                    setor2Segunda.set(false);
                }
                else if ((diasEscolhidos[i].value === "2") && (diasEscolhidos[i].selected === false)){
                    setor2Terca.set(false);
                }
                else if ((diasEscolhidos[i].value === "3") && (diasEscolhidos[i].selected === false)){
                    setor2Quarta.set(false);
                }
                else if ((diasEscolhidos[i].value === "4") && (diasEscolhidos[i].selected === false)){
                    setor2Quinta.set(false);
                }
                else if ((diasEscolhidos[i].value === "5") && (diasEscolhidos[i].selected === false)){
                    setor2Sexta.set(false);
                }
                else if ((diasEscolhidos[i].value === "6") && (diasEscolhidos[i].selected === false)){
                    setor2Sabado.set(false);
                }
            }
        } else {
            alert("Nenhum dia selecionado.");
        }
    } else if (periodoEscolhido.value === '1') {
        setor2Domingo.set(true);
        setor2Segunda.set(true);
        setor2Terca.set(true);
        setor2Quarta.set(true);
        setor2Quinta.set(true);
        setor2Sexta.set(true);
        setor2Sabado.set(true);
    } else {
        alert("Nenhum período selecionado.");
    }

    var horariosSet2 = []; // cria a array
    var aux = 1;

    if (horarios.value) { // verifica se há ao menos 1 item selecionado
        db.ref('setor2/horario').set(false);
        for (i = 0; i < horarios.length; i++) {
            if (horarios[i].selected === true) {

                horariosSet2.push(horarios[i].value); // adiciona na array apenas os itens selecionados

                db.ref('setor2/horario/hora' + aux).set(horarios[i].value);

                aux++;
            }
        }
    } else {
        alert("Nenhum horário selecionado.");
    }

    if (duracao.value == null || duracao.value === 0 || duracao.value === ''){
        alert("Preencha o campo de duração.");
    } else {
        setor2Duracao.set(parseInt(document.getElementById('duracaoSetor2').value));
        alert("Configurações salvas com sucesso!");
    }

}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, 'options');
});