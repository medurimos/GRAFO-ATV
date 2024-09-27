const mapa = {
    Alfa: ['Beta', 'Eta'],
    Beta: ['Alfa', 'Gama'],
    Gama: ['Beta', 'Delta'],
    Delta: ['Gama', 'Epsilon'],
    Epsilon: ['Delta','Zeta','Kappa'],
    Zeta: ['Epsilon', 'Lambda'],
    Lambda: ['Zeta','Mu'],
    Mu: ['Lambda','Kappa','Iota'],
    Kappa: ['Epsilon','Mu'],
    Iota: ['Mu','Teta'],
    Teta: ['Iota','Eta'],
    Eta: ['Teta','Alfa']
};

const caminhoMaisCurto = (comeco, destino) => {
    const visited = new Set();
    const fila = [[comeco, [comeco]]]; 

    while (fila.length > 0) {
        const [node, caminho] = fila.shift();

        if (node === destino) return caminho; 

        visited.add(node);

        for (let vizinho of mapa[node]) {
            if (!visited.has(vizinho)) {
                fila.push([vizinho, [...caminho, vizinho]]); 
            }
        }
    }

    return null; 
};

function criarRota() {
    const partida = document.getElementById("ponto-partida").value;
    const chegada = document.getElementById("ponto-chegada").value;
    const resultadoDiv = document.getElementById("resultado");
    const listaOnibus = document.getElementById("lista-onibus");

    listaOnibus.innerHTML = '';

    const caminho = caminhoMaisCurto(partida, chegada);

    if (caminho && caminho.length > 1) {

        const listItem = document.createElement('li');
        listItem.textContent = `${caminho.join(' -> ')}`;
        listaOnibus.appendChild(listItem);

        onibusDaRota(caminho,listaOnibus);
        
        desenharRota(caminho);
        
        resultadoDiv.classList.remove('hidden');
    } else {
        listaOnibus.innerHTML = '<li>Mesmo ponto de parada e saida, escolha uma rota valida.</li>';
        resultadoDiv.classList.remove('hidden');
    }
}












function onibusDaRota(caminho, listaOnibus) {
    const onibusCaminho = []; 
    const output = [];
    for (let i = 0; i < caminho.length - 1; i++) {
        const estacaoAtual = caminho[i];
        const proximaEstacao = caminho[i + 1]; 
        
        let onibus = new Set(estacoes[estacaoAtual].onibus);
        
        onibus.forEach(bus => {
            if (!onibusCaminho.includes(bus)) {
                onibusCaminho.push(bus);
            }
        });

        const onibusProxima = new Set(estacoes[proximaEstacao].onibus);

        onibus.forEach(bus => {
            if (!onibusProxima.has(bus)) {
                onibus.delete(bus);
            }
        });

        if (onibus.size === 1 || i + 1 == caminho.length - 1) {
            const onibusRestante = Array.from(onibus)[0]; 
            if (!onibusCaminho.includes(onibusRestante)) {
                onibusCaminho.push(onibusRestante);
            }
            if(!output.includes(onibusRestante)){
                output.push(onibusRestante)
            }
            
            onibus.clear(); 
        }
    }

    const onibusListItem = document.createElement('li');
    onibusListItem.textContent = `Ônibus a serem pegos: ${output.join('-> ')}`;
    listaOnibus.appendChild(onibusListItem);
}







const estacoes = {
    Alfa: { x: 100, y: 100, onibus: ["101", "606"] },
    Beta: { x: 200, y: 150, onibus: ["101","909"] },
    Gama: { x: 300, y: 200, onibus: ["101", "202","909"] },
    Delta: { x: 400, y: 100, onibus: ["202","909"] },
    Epsilon: { x: 500, y: 300, onibus: ["202", "303"] },
    Zeta: { x: 600, y: 400, onibus: ["202", "303"] },
    Eta: { x: 100, y: 400, onibus: ["606","1010"] },
    Teta: { x: 200, y: 350, onibus: ["505", "606","1010"] },
    Iota: { x: 350, y: 500, onibus: ["505","1010"] },
    Kappa: { x: 450, y: 450, onibus: ["303","1010"] },
    Lambda: { x: 650, y: 200, onibus: ["303", "404"] },
    Mu: { x: 700, y: 500, onibus: ["303", "404", "505"] }
};

const conexoes = [
    ['Alfa', 'Beta'],
    ['Beta', 'Gama'],
    ['Gama', 'Delta'],
    ['Delta', 'Epsilon'],
    ['Epsilon', 'Zeta'],
    ['Zeta', 'Lambda'],
    ['Lambda', 'Mu'],
    ['Mu', 'Iota'],
    ['Iota', 'Teta'],
    ['Teta', 'Eta'],
    ['Eta', 'Alfa'],
    ['Alfa', 'Gama'],
    ['Epsilon', 'Kappa'],
    ['Kappa', 'Mu']
];

const canvas = document.getElementById('mapa-estacoes');
const ctx = canvas.getContext('2d');

function desenharRota(caminho) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.font = '15px Arial';
    for (let i = 0; i < caminho.length - 1; i++) {
        const est1 = caminho[i];
        const est2 = caminho[i + 1];
        const { x: x1, y: y1 } = estacoes[est1];
        const { x: x2, y: y2 } = estacoes[est2];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#FF9800"; 
        ctx.lineWidth = 4; 
        ctx.stroke();
    }

    caminho.forEach(estacao => {
        const { x, y } = estacoes[estacao];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF5722"; 
        ctx.fill();
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        ctx.fillStyle = "#FFF";
        ctx.fillText(estacao, x - 20, y - 15); 
    });
}


function desenharEstacoes() {
    conexoes.forEach(([est1, est2]) => {
        const { x: x1, y: y1 } = estacoes[est1];
        const { x: x2, y: y2 } = estacoes[est2];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#FF9800";
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    for (const estacao in estacoes) {
        const { x, y } = estacoes[estacao];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF5722";
        ctx.fill();
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        ctx.fillStyle = "#FFF";
        ctx.fillText(estacao, x - 20, y - 15);
    }
}