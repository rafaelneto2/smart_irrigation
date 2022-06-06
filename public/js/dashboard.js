$(document).ready(function(){
    $('.tabs').tabs();
});

(function(){

    const config = {
        apiKey: "AIzaSyCzQbi51doR6ivijLI-whcfdtekVGwIkXo",
        authDomain: "irrigacao-inteligente.firebaseapp.com",
        databaseURL: "https://irrigacao-inteligente.firebaseio.com",
        projectId: "irrigacao-inteligente",
        storageBucket: "irrigacao-inteligente.appspot.com",
        messagingSenderId: "929348565294",
        appId: "1:929348565294:web:b415f0273a313b483ae2bf",
        measurementId: "G-40L619B9P2"
    };

    firebase.initializeApp(config);
    firebase.analytics();

    var db = firebase.database();

    var umidArRef = db.ref('setor1/umidadeAr');
    var umidSoloSetor2Ref = db.ref('setor2/umidadeSolo');
    var duracaoSetor1Ref = db.ref('setor1/duracao');
    var duracaoSetor2Ref = db.ref('setor2/duracao');

    umidArRef.on('value', onNewData('currentUmidAr', 'umidArLineChart' , 'Umidade do Ar', '%'));
    umidSoloSetor2Ref.on('value', onNewData('umidSoloSetor2', 'umidSoloSetor2LineChart' , 'Umidade do Solo', '%'));

    duracaoSetor1Ref.on('value', function(snapshot){
        var duracaoSetor1 = snapshot.val();
        document.getElementById('currentDuracaoSetor1').innerText = duracaoSetor1 + ' minutos';
    });

    duracaoSetor2Ref.on('value', function(snapshot){
        var duracaoSetor2 = snapshot.val();
        document.getElementById('currentDuracaoSetor2').innerText = duracaoSetor2 + ' minutos';
    });

})();

function onNewData(currentValueEl, chartEl, label, metric){
    return function(snapshot){
        var readings = snapshot.val();
        if(readings){
            var currentValue;
            var data = [];
            for(var key in readings){
                currentValue = readings[key]
                data.push(currentValue);
            }
            console.log(currentValue);
            document.getElementById(currentValueEl).innerText = currentValue + ' ' + metric;
            buildLineChart(chartEl, label, data);
        }
    }
}('value', function(snapshot){
});

function buildLineChart(el, label, data){
    var elNode = document.getElementById(el);
    new Chart(elNode, {
        type: 'line',
        data: {
            labels: new Array(data.length).fill(""),
            datasets: [{
                label: label,
                data: data,
                borderWidth: 1,
                fill: false,
                spanGaps: false,
                lineTension: 0.1,
                backgroundColor: "#F9A825",
                borderColor: "#F9A825"
            }]
        }
    });
}