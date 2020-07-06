let dataBubble = []
let regLine = []
let a = 0
let b = 0

const valoresx = document.querySelector('#valoresx')
const valoresy = document.querySelector('#valoresy')
const showResult = document.querySelector('#resultado')

const novox = document.querySelector('#novox')
const novoy = document.querySelector('#novoy')
const showAtualizar = document.querySelector('#showAtualizar')
const alerta = document.querySelector('#alerta')

const correResult = document.querySelector('#correResult')
const correAuxi = document.querySelector('#correAuxi')
const equacaoReg = document.querySelector('#equacaoReg')

// Contextp chart
let chart
const ctx = document.getElementById('chartCorre')
Chart.defaults.scale.ticks.beginAtZero = true


function correlacao() {
    let vlrX = valoresx.value.split(',')
    let vlrY = valoresy.value.split(',')
    vlrX = vlrX.map((dadosSeparados) => Number(dadosSeparados))
    vlrY = vlrY.map((dadosSeparados) => Number(dadosSeparados))
    console.log(vlrX)
    console.log(vlrY)


    //Numero de elementos Inseridos
    let nElementos = vlrX.length

    //Soma valores vetor X e Y
    let somaX = somaValores(vlrX)
    let somaY = somaValores(vlrY)

    //Multiplicação entre os valores dos Vetores
    let multVets = multEntreVets(vlrX, vlrY)
    let somaMultVets = somaValores(multVets)

    //Numeros elevado a pontencia 2
    let potenciaX = pontenciaVet(vlrX)
    let potenciaY = pontenciaVet(vlrY)
    let somaPotenX = somaValores(potenciaX)
    let somaPotenY = somaValores(potenciaY)

    //Aplicando a formula da corelação
    let r = (nElementos * somaMultVets - (somaX * somaY)) / Math.sqrt((nElementos * somaPotenX - (somaX ** 2)) * (nElementos * somaPotenY - (somaY ** 2))).toFixed(2)

    a = (nElementos * somaMultVets - somaX * somaY) / ((nElementos * somaPotenX) - (somaX ** 2))

    b = (somaY / nElementos) - a * (somaX / nElementos)

    console.log(r)
    console.log(a)
    console.log(b)
    correResult
    // Formula da Regressao
    // y = a*x+b
    let forcaCorre

    if(r === 1){
        forcaCorre = 'Perfeita Positiva'
    }else if( r === -1){
        forcaCorre = 'Perfeita Negativa'
    }else if(r === 0){
        forcaCorre = 'Variaveis não correlacionadas'
    }else if( r > 0 && r < 0.30){
        forcaCorre = 'Fraca Positiva'
    }else if(r > -0.30 && r < 0){
        forcaCorre = 'Fraca Negativa'
    }else if(r > 0.30 && r < 0.70){
        forcaCorre = 'Moderada Positiva'
    }else if( r >  -0.70 && r < -0.30){
        forcaCorre = 'Moderada Negativa'
    }else if(r > 0.70 && r < 1){
        forcaCorre = 'Forte Positiva'
    }else if(r > -1 && r < -0.70){
        forcaCorre = 'Forte Negativa'
    }else{
        forcaCorre = 'Que coisa estranha foi essa ?'
    }

    correAuxi.style.display = 'block'

    correResult.innerHTML = ''
    equacaoReg.innerHTML = ''

    correResult.innerHTML += `Correlação: ${r.toFixed(4)} ${forcaCorre}`
    equacaoReg.innerHTML += `Equação: Y = ${a.toFixed(4)} * X + ${b.toFixed(4)}`

    apresentaChart(vlrX, vlrY, ctx, a, b)
}

function somaValores(vetor) {
    let soma
    soma = vetor.reduce((acum, n) => acum += n)
    return soma
}

function multEntreVets(vetx, vety) {
    let multVets = []
    for (let i = 0; i < vetx.length; i++) {
        multVets[i] = vetx[i] * vety[i]
    }
    return multVets
}

function pontenciaVet(vetor) {
    let potenVet
    potenVet = vetor.map((n) => n ** 2)
    return potenVet
}

function apresentaChart(x, y, ctx, a, b) {
    for (let i = 0; i < x.length; i++) {
        dataBubble.push({
            x: x[i],
            y: y[i],
            r: 5
        })

        regLine.push({
            x: x[i],
            y: (parseFloat(Math.round(parseFloat(a) * x[i] + parseFloat(b), 2)))
        })

    }
    // // Grafico
    chart = new Chart(ctx, {
        // Tipo do gráfico
        type: 'bubble',
        //Especificações

        data: {
            datasets: [{
                type: 'bubble',
                data: dataBubble,
                backgrouncolor: 'rgba(0, 255, 0)',
                borderWidth: 1
            }, {
                type: 'line',
                backgrouncolor: 'rgba(0, 0, 255)',
                data: regLine,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    // // X: ${dataBubble[{x}].value} Y: ${dataBubble[{y}].value}
                    title: function (tooltipItem, data) {
                        return `X , Y`
                    },
                    // label: function (tooltipItem, data) {
                    //     console.log('tooltipItem.yLabel')
                    //     console.log(tooltipItem.yLabel)
                    //     console.log('tooltipItem.xLabel')
                    //     console.log(tooltipItem.xLabel)

                    //     var label = `X: ${data.datasets[tooltipItem.xLabel.value]} Y: ${data.datasets[tooltipItem.yLabel.value]}`

                    //     // if (label) {
                    //     //     label += '';
                    //     // }

                    //     return label;
                    // }
                }
            },
            title: {
                text: 'Regressão',
                fontSize: 15,
                display: true,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valores Independentes (X)',
                        fontSize: 15
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valores Dependentes de (Y)',
                        fontSize: 15
                    },
                }]
            }
        }
    })


    showAtualizar.style.display = 'block'
}

function atualizar() {
    let nvX = Number(novox.value)
    let nvY = Number(novoy.value)
    if (!nvX && !nvY) {
        alerta.style.display = 'block'
    } else if (!nvY) {
        alerta.style.display = 'none'

        let regressao = a * nvX + b

        dataBubble.push({
            x: nvX,
            y: regressao,
            r: 5
        })
        regLine.push({
            x: nvX,
            y: (parseFloat(Math.round(parseFloat(a) * nvX + parseFloat(b), 2)))
        })

        chart.update()
    } else {
        alerta.style.display = 'none'

        let regressao = (nvY - (b)) / a

        dataBubble.push({
            x: regressao,
            y: nvY,
            r: 5
        })
        regLine.push({
            x: regressao,
            y: (parseFloat(Math.round(parseFloat(a) * regressao + parseFloat(b), 2)))
        })
        chart.update()
    }
}