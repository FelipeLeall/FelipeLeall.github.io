// Capturando os elementos
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const exibirOrdem = document.querySelector('#varOrdem')
const localDaTabela = document.querySelector(`#showTabela`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#varNome')
const dadosVariavel = document.querySelector('#varDados')
const corpoTabela = document.querySelector('#corpo')
const HeadTabela = document.querySelector('#headTabela')
const moda = document.querySelector('#mode')
const media = document.querySelector('#mean')
const mediana = document.querySelector('#median')
const desvioPadrao = document.querySelector('#desvioP')
const CoeficienteVaria = document.querySelector('#cofVaria')
const amostra = document.querySelector('#Amostra')
const medidasS = document.querySelector('#medidasS')
const divRespostas = document.querySelector('#divRespostas')


/*=========================================================================================================
================================================== Charts =================================================
=========================================================================================================== */
let chart
let colorsChart = ['rgba(255, 99, 132, 1)',
	'rgba(54, 162, 235, 1)',
	'rgba(255, 206, 86, 1)',
	'rgba(75, 192, 192, 1)',
	'rgba(153, 102, 255, 1)',
	'rgba(255, 159, 64, 1)',
	'rgba(221, 91, 155, 1)',
	'rgba(55, 148, 110, 1)',
	'rgba(95, 205, 228, 1)',
	'rgba(153, 229, 80, 1)',
	'rgb(118, 66, 138, 1)'
]


// Contexto do gráfico
const oChartDelas = document.querySelector('#oChartDelas')
const ctx = document.getElementById('oChartDasBonecas')
Chart.defaults.scale.ticks.beginAtZero = true


/*========================================== Select Medidas separatrizes ================================== */
// mostrar ou esconder o input de ordem
if (tipoCalculo[1].checked) exibirOrdem.style.display = 'block'
tipoCalculo[1].onchange = e => {
	if (e.isTrusted) {
		exibirOrdem.style.display = 'block'
	}
}

tipoCalculo[0].onchange = e => {
	if (e.isTrusted) {
		exibirOrdem.style.display = 'none'
	}
}

tipoCalculo[2].onchange = e => {
	if (e.isTrusted) {
		exibirOrdem.style.display = 'none'
	}
}

tipoCalculo[3].onchange = e => {
	if (e.isTrusted) {
		exibirOrdem.style.display = 'none'
	}
}

const msSelect = document.querySelector('#msSelect')
const msSpan = document.querySelector('#msSpan')
const msRange = document.querySelector('#msRange')

var msValor = 50

function carregar() {
	msRange.addEventListener('input', function () {
		msSpan.textContent = this.value;
		if (msSelect.value == "Quartil") {
			msRange.step = 25
			msRange.min = 25
			msRange.max = 100
		} else if (msSelect.value == "Quintil") {
			msRange.step = 20
			msRange.min = 20
			msRange.max = 100
		} else if (msSelect.value == "Decil") {
			msRange.step = 10
			msRange.min = 10
			msRange.max = 100
		} else if (msSelect.value == "Porcentil") {
			msRange.step = 1
			msRange.min = 1
			msRange.max = 100
		}

		return msValor = msRange.value
	});
}
/*===================================================================================================================
=============================================================== Botão calcular =======================================
=======================================================================================================================*/
function gerarTabela() {
	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'

	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = dados.filter((este, i) => dados.indexOf(este) === i)

	let dadosQuick = dados
	quickSort(dadosQuick)

	let dadosSemRep = dadosQuick.filter((este, i) => dados.indexOf(este) === i)
	let dpXi = dadosSeparados.map((dadosSeparados) => Number(dadosSeparados))

	let dadosElemRepetidos = []
	let comparacao = 0,
		compCont = 0
	let AuxComp = dadosQuick[0]

	for (let i = 0; i < dadosQuick.length; i++) {
		if (AuxComp == dadosQuick[i]) {
			compCont++
			dadosElemRepetidos[comparacao] = compCont
		} else {
			AuxComp = dadosQuick[i]
			comparacao += 1
			compCont = 1
			dadosElemRepetidos[comparacao] = compCont
		}
	}



	// Criando objeto para auxiliar na quantitativa ordinal
	let sep = dados.reduce((obj, item) => {
		item = item.replace(/\s/g, '') // tira os espacos
		if (!obj[item]) {
			obj[item] = 1
		} else {
			obj[item]++
		}
		return obj

	}, {})

	let numTotalDados = dados.length //pega o total de itens inseridos
	let fac = 0
	let facP = 0
	let dadosElemRepetidosCharts = dadosCharts(numTotalDados, dadosElemRepetidos)

	/*==========================================================================================================
	==================================================== Nominal ===============================================
	============================================================================================================ */
	if (tipoCalculo[0].checked) {
		// Inserindo valores na tabela nominal

		corpoTabela.innerHTML = ''
		for (i = 0; i < dadosElemRepetidos.length; i++) {
			fac += dadosElemRepetidos[i]
			facP += dadosElemRepetidos[i] / numTotalDados * 100
			corpoTabela.innerHTML += `<tr> <td>${dadosSemRep[i]}</td>
										   <td>${dadosElemRepetidos[i]}</td>
										   <td>${(dadosElemRepetidos[i] / numTotalDados * 100).toFixed(2) }%</td>
										   <td>${fac}</td>
										   <td>${ facP.toFixed(2) }%</td>
									  </tr>`
		}

		corpoTabela.innerHTML += `<tr> <td id="total">Total</td>
								   <td id="total">${numTotalDados}</td> 
								   <td id="total"> 100% </td>
								   <td id="total"> </td>
								   <td id="total"></td>
	 							 </tr>`
		/*=============================================== Moda,Média,Mediana ========================================== */

		divRespostas.style.display = 'block'

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""
		desvioPadrao.innerHTML = ""
		CoeficienteVaria.innerHTML = ""
		medidasS.innerHTML = ""

		const msResposta = medidaSeparatriz(msValor, numTotalDados, dados)
		const tesModa = modeString(dados)
		const tesMediana = median(dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`
		medidasS.innerHTML += `Medida Separatriz: ${msResposta}`

		// Grafico
		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'pie',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: dadosElemRepetidosCharts,
					backgroundColor: colorsChart,
					borderColor: colorsChart,
					borderWidth: 1

				}]

			},
		})


		/*==========================================================================================================
		==================================================== Ordinal ===============================================
		============================================================================================================ */
	} else if (tipoCalculo[1].checked) {

		let ordemInput = document.querySelector('#ordem').value.split(',')
		ordemInput = ordemInput.filter((este, i) => ordemInput.indexOf(este) === i)

		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``

		ordemInput.forEach(item => {
			item = item.replace(/\s/g, '') // tirar espa
			fac += sep[item]
			facP += sep[item] / numTotalDados * 100
			corpoTabela.innerHTML += `<tr> 
										<td>${item}</td>
										<td>${sep[item]}</td>
										<td>${(sep[item] / numTotalDados * 100).toFixed(2) }%</td>
										<td> ${fac} </td>
										<td>${ facP.toFixed(2) }</td>
									 </tr>`
		})

		corpoTabela.innerHTML += `<tr> 
									<td id="total">Total</td>
									<td id="total">${numTotalDados}</td>
									<td id='total'>100%</td>
									<td id='total'></td>
									<td id='total'></td>
								 </tr>`
		/*=============================================== Moda,Média,Mediana ========================================== */
		divRespostas.style.display = 'block'

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""
		desvioPadrao.innerHTML = ""
		CoeficienteVaria.innerHTML = ""
		medidasS.innerHTML = ""

		const tesModa = modeString(dados)
		const tesMediana = median(dados)
		const msResposta = medidaSeparatriz(msValor, numTotalDados, dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`
		medidasS.innerHTML += `Medida Separatriz: ${msResposta}`

		// Grafico
		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'pie',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: dadosElemRepetidosCharts,
					backgroundColor: colorsChart,
					borderColor: colorsChart,
					borderWidth: 1
				}]

			},
			// options: options
		})

		// Fim tabela ordinal

		/*==========================================================================================================
		==================================================== Descritiva ============================================
		============================================================================================================ */
	} else if (tipoCalculo[2].checked) {
		//Inserindo valores na tabela Discreta

		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``

		for (i = 0; i < dadosElemRepetidos.length; i++) {
			fac += dadosElemRepetidos[i]
			facP += dadosElemRepetidos[i] / numTotalDados * 100
			corpoTabela.innerHTML += `<tr> 
										<td>${dadosSemRep[i]}</td>
										<td>${dadosElemRepetidos[i]}</td>
										<td>${(dadosElemRepetidos[i] / numTotalDados * 100).toFixed(2) }%</td>
										<td>${fac}</td>
										<td>${facP.toFixed(2) }%</td>
									  </tr>`

		}

		corpoTabela.innerHTML += `<tr> 
								   <td id="total">Total</td>
								   <td id="total">${numTotalDados}</td> 
								   <td id="total"> 100% </td>
								   <td id="total"> </td>
								   <td id="total"></td>
	 							 </tr>`

		/*=============================================== Moda,Média,Mediana ========================================== */
		divRespostas.style.display = 'block'

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""
		medidasS.innerHTML = ""

		const tesModa = mode(dados)
		const tesMedia = mean(dados)
		const tesMediana = medianDesc(dados)
		const msResposta = medidaSeparatriz(msValor, numTotalDados, dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML += `Média:  ${tesMedia}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`
		medidasS.innerHTML += `Medida Separatriz: ${msResposta}`


		// Para o Desvio Padrão
		let desvioP = 0
		let cofVaria = 0

		if (amostra.value === 'População') {
			for (let i = 0; i < dadosElemRepetidos.length; i++) {
				desvioP += ((dpXi[i] - tesMedia) ** 2) * dadosElemRepetidos[i]
			}
			desvioP = Math.sqrt(desvioP / numTotalDados)
			cofVaria = (desvioP / tesMedia) * 100

		} else {
			for (let i = 0; i < dadosElemRepetidos.length; i++) {
				desvioP += ((dpXi[i] - tesMedia) ** 2) * dadosElemRepetidos[i]
			}
			desvioP = Math.sqrt(desvioP / (numTotalDados - 1))
			cofVaria = (desvioP / tesMedia) * 100
		}

		desvioPadrao.innerHTML = ""
		CoeficienteVaria.innerHTML = ""

		desvioPadrao.innerHTML += `Desvio Padrão : ${desvioP.toFixed(2)}`
		CoeficienteVaria.innerHTML += `Coeficiente de Variação: ${cofVaria.toFixed(2)}%`

		// oChartDelas.innerHTML = '&nbsp;'
		// $('#oChartDelas').append('<canvas id=oChartDasBonecas><canvas>')
		// ctx = $("oChartDasBonecas").get(0).getContext('2d')

		//Grafico
		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'bar',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: dadosElemRepetidosCharts,
					backgroundColor: colorsChart,
					borderColor: colorsChart,
					borderWidth: 1
				}]

			},
			// options: options
		})
		/*==========================================================================================================
		==================================================== Continua ===============================================
		============================================================================================================ */
	} else if (tipoCalculo[3].checked) {
		// Inserindo valores na tabela continua

		let min = Number(dados[0])
		let max = Number(dados[0])

		dados.forEach(item => {
			if (Number(item) > max) max = item
			if (Number(item) < min) min = item
		})

		let intervalo = (max - min) //Intervalo

		let k = Number(Math.sqrt(dados.length).toString()[0]) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1

		let inteiro = true
		let ic
		let linha

		while (inteiro) {
			intervalo += 1
			let ic1 = intervalo / k
			let ic2 = intervalo / kmais
			let ic3 = intervalo / kmenos
			if (Number.isInteger(ic1)) {
				ic = ic1
				linha = k
				inteiro = false
			} else if (Number.isInteger(ic2)) {
				ic = ic2
				linha = kmais
				inteiro = false
			} else if (Number.isInteger(ic3)) {
				ic = ic3
				linha = kmenos
				inteiro = false
			}
		}
		/*=============================================== Var para Mediana ============================================== */
		const frequencia = dados.length


		let pos = frequencia / 2
		let fimd = []
		let maxMd = []
		let fant = []
		let xiAux = []

		corpoTabela.innerHTML = ''

		cont = 0
		ic = Number(ic) //intervalo
		min = Number(min)

		let repeatIntervalo = 0
		let vetRepeat = []
		let minAux = min

		for (i = 0; i < linha; i++) {
			repeatIntervalo = 0
			dados.forEach((item) => {
				if (Number(item) >= minAux && Number(item) < (minAux + ic)) {
					repeatIntervalo += 1
				}
			})
			fimd.push(minAux) // i
			minAux += ic
			maxMd.push(minAux)
			vetRepeat.push(repeatIntervalo)
		}

		for (let i = 0; i < linha; i++) {
			fiP = vetRepeat[i] / numTotalDados * 100
			fac += vetRepeat[i]
			fant.push(fac)
			facP += fiP
			xiAux[i] = (fimd[i] + maxMd[i]) / 2
			corpoTabela.innerHTML += `<tr>
										 <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td>
										 <td>${vetRepeat[i]}</td> 
										 <td>${fiP.toFixed(0)}</td>
										 <td>${fac}</td> <td>${facP.toFixed(0)}</td>
										 <td>${xiAux[i]}</td>
									  </tr>`
			let lblChartContinua = []
			cont += vetRepeat[i]
			min += ic
		}
		corpoTabela.innerHTML += `<tr>
									<td id="total">Total</td>
									<td id="total">${cont}</td>
									<td id='total'>100%</td>
									<td id='total'></td>
									<td id='total'></td> 
								 </tr>`

		let iAux, fiAuxi, fimdAux, fantAux
		let mediaCont = 0
		/*=============================================== Mediana ============================================== */
		for (let i = 0; i < linha; i++) {
			if (fant[i] >= pos) {
				if (i == 0) { // caso a mediana esteja no primeiro intervalo e o fant tenha que ter o valor de 0
					iAux = fimd[i]
					fiAuxi = frequencia
					fantAux = 0
					fimdAux = vetRepeat[i]

					medianaCont = iAux + ((fiAuxi / 2 - fantAux) / fimdAux) * ic

					break
				} else {
					iAux = fimd[i]
					fiAuxi = frequencia
					fantAux = fant[i - 1]
					fimdAux = vetRepeat[i]

					medianaCont = iAux + ((fiAuxi / 2 - fantAux) / fimdAux) * ic

					break
				}
			}
		}


		for (let i = 0; i < linha; i++) { //Media
			mediaCont += xiAux[i] * vetRepeat[i] / frequencia
		}
		/*============================================== moda,média,medin ======================================== */
		divRespostas.style.display = 'block'

		const tesModa = modaCont(vetRepeat, xiAux)

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""

		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML = `Média: ${mediaCont.toFixed(2)}`
		mediana.innerHTML += `Mediana:  ${medianaCont.toFixed(2)}`

		let msPosAux = (msValor / 100) * numTotalDados //Medidas Separatrizes
		let msResposta



		for (let i = 0; i < linha; i++) {
			if (fant[i] >= msPosAux) {
				if (i == 0) { // caso a mediana esteja no primeiro intervalo e o fant tenha que ter o valor de 0
					iAux = fimd[i]
					fiAuxi = msPosAux
					fantAux = 0
					fimdAux = vetRepeat[i]

					msResposta = iAux + ((msPosAux - fantAux) / fimdAux) * ic

					break
				} else {
					iAux = fimd[i]
					fiAuxi = msPosAux
					fantAux = fant[i - 1]
					fimdAux = vetRepeat[i]
					msResposta = iAux + ((msPosAux - fantAux) / fimdAux) * ic

					break
				}
			}
		}

		medidasS.innerHTML = ""
		medidasS.innerHTML += `Medida Separatriz: ${msResposta.toFixed(2)}`

		// Para o Desvio Padrão
		let desvioP = 0
		let cofVaria = 0

		if (amostra.value === 'População') {
			for (let i = 0; i < vetRepeat.length; i++) {
				desvioP += ((xiAux[i] - mediaCont) ** 2) * vetRepeat[i]

			}
			desvioP = Math.sqrt(desvioP / numTotalDados)
			cofVaria = (desvioP / mediaCont) * 100

		} else {
			for (let i = 0; i < vetRepeat.length; i++) {
				desvioP += ((xiAux[i] - mediaCont) ** 2) * vetRepeat[i]
			}

			desvioP = Math.sqrt(desvioP / (numTotalDados - 1))
			cofVaria = (desvioP / mediaCont) * 100
		}

		console.log(vetRepeat)


		desvioPadrao.innerHTML = ""
		CoeficienteVaria.innerHTML = ""

		desvioPadrao.innerHTML += `Desvio Padrão : ${desvioP.toFixed(2)}`
		CoeficienteVaria.innerHTML += `Coeficiente de Variação: ${cofVaria.toFixed(2)}%`

		// oChartDelas.innerHTML = '&nbsp;'
		// $('#oChartDelas').append('<canvas id=oChartDasBonecas><canvas>')
		// ctx = $("oChartDasBonecas").get(0).getContext('2d')

		let vetRepeatChart = dadosCharts(numTotalDados, vetRepeat)
		chart = new Chart(ctx, {
			type: 'bar',
			//Especificações
			data: {
				labels: maxMd,
				datasets: [{
					label: NomeTabela,
					data: vetRepeatChart,
					backgroundColor: colorsChart,
					borderColor: colorsChart,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					xAxes: [{
						display: false,
						barPercentage: 1.30,
					}, {
						display: true,
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
				// tooltips: {
				// 	callbacks: {
				// 		label: function (tooltipItem, data) {
				// 			return data['datasets'][0]['data'][tooltipItem['index']];
				// 		},
				// 		afterLabel: function (tooltipItem, data) {
				// 			var dataset = data['datasets'][0];
				// 			var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
				// 			return '(' + percent + '%)';
				// 		}
				// 	}
				// }
			}
		});
	}


	/*=========================================================================================================
	============================================== Moda, Média e Mediana ======================================
	=========================================================================================================== */
	function modaCont(dadosVariavel, xiAux) {
		let repetição = 0
		let cont = 0
		let modaAux = []
		let moda = []

		repetição = dadosVariavel[0]
		for (let i = 0; i < dadosVariavel.length; i++) {
			if (repetição < dadosVariavel[i]) {
				repetição = dadosVariavel[i]
				modaAux.push(i)
			}
		}

		for (let i = 0; i < xiAux.length; i++) {

			if (i == modaAux[cont]) {
				cont += 1
				moda.push(xiAux[i])
			}
		}

		return moda
	}

	/**
	 * A "MODA" é o número que mais se repete no dataset
	 *
	 * Por exemplo, a "moda" de [3, 5, 4, 4, 1, 1, 2, 3] é [1, 3, 4].
	 *
	 * @param {Array} dadosVariavel um Array de números.
	 * @return {Array} A moda dos números especificados.
	 */
	function mode(dadosVariavel) {
		// como o resultado pode ser bimodal ou multi-modal,
		// o valor retornado é um Array
		// moda de [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
		let modes = [],
			count = [],
			i, number, maxIndex = 0;


		for (i = 0; i < dadosVariavel.length; i++) {
			number = dadosVariavel[i];
			count[number] = (count[number] || 0) + 1;
			if (count[number] > maxIndex) {
				maxIndex = count[number];
			}
		}

		for (i in count) {
			if (count.hasOwnProperty(i)) {
				if (count[i] === maxIndex) {
					modes.push(Number(i));

				}
			}
		}

		return modes;
	}

	function modeString(dadosVariavel) {
		// como o resultado pode ser bimodal ou multi-modal,
		// o valor retornado é um Array
		// moda de [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
		let modes = [],
			count = [],
			i, number, maxIndex = 0;

		for (i = 0; i < dadosVariavel.length; i++) {
			number = dadosVariavel[i];
			count[number] = (count[number] || 0) + 1;
			if (count[number] > maxIndex) {
				maxIndex = count[number];
			}
		}

		for (i in count) {
			if (count.hasOwnProperty(i)) {
				if (count[i] === maxIndex) {
					modes.push(i);
				}
			}
		}

		return modes;
	}


	/**
	 * A "Média" é calculada da maneira simples, somando todos os números
	 * e então dividindo pela quantidade de números existentes.
	 *
	 * Por exemplo, a média de [3, 5, 4, 4, 1, 1, 2, 3] é 2.875.
	 *
	 * @param {Array} dadosVariavel Um Array de números.
	 * @return {Number} A média calculada à partir dos números especificados.
	 */
	function mean(dadosVariavel) {
		let total = 0,
			i;
		for (i = 0; i < dadosVariavel.length; i++) {
			total += Number(dadosVariavel[i]);

		}
		return total / dadosVariavel.length;
	}


	/**
	 * A mediana é o valor do meio de uma lista de números
	 *
	 * @param {Array} dadosVariavel Um Array de números.
	 * @return {Number} A mediana calculada a partir dos números especificados.
	 */
	function median(dadosVariavel) {
		// mediana de [3, 5, 4, 4, 1, 1, 2, 3] = 3 

		var median = [],
			numsLen = dadosVariavel.length;
		dadosVariavel.sort();

		var mediaPar1 = dadosVariavel[(numsLen / 2) - 1]
		var mediaPar2 = dadosVariavel[numsLen / 2]

		if (numsLen % 2 === 0) { // é par
			// média dos dois números do meio

			// median = dadosVariavel[(numsLen -1) / 2], dadosVariavel[numsLen / 2]
			// median[0] = dadosVariavel[(numsLen -1) / 2]
			// median[1] = dadosVariavel[numsLen / 2]
			median[0] = mediaPar1
			median[1] = mediaPar2
		} else { // é ímpar
			// o número do meio
			median[0] = (dadosVariavel[(numsLen - 1) / 2]);
		}
		return median;

	}

	function medianDesc(dadosVariavel) {
		// mediana de [3, 5, 4, 4, 1, 1, 2, 3] = 3 

		var median = [],
			numsLen = dadosVariavel.length;
		dadosVariavel.sort();

		var mediaPar1 = Number(dadosVariavel[(numsLen / 2) - 1])
		var mediaPar2 = Number(dadosVariavel[numsLen / 2])

		if (numsLen % 2 === 0) { // é par
			// média dos dois números do meio

			// median = dadosVariavel[(numsLen -1) / 2], dadosVariavel[numsLen / 2]
			// median[0] = dadosVariavel[(numsLen -1) / 2]
			// median[1] = dadosVariavel[numsLen / 2]
			median[0] = (mediaPar1 + mediaPar2) / 2
		} else { // é ímpar
			// o número do meio
			median[0] = (dadosVariavel[(numsLen - 1) / 2]);
		}
		return median;

	}

}

function medidaSeparatriz(msValor, totPor, dados) {
	var msResultAux = parseInt((msValor / 100) * totPor) //posição
	var msResult
	for (i = 1; i <= dados.length; i++) {
		if (i == msResultAux) {
			msResult = dados[i - 1]
		}
	}
	return msResult
}


// Interação com o botão calcular 
document.querySelector('#BotaoCalcular').onclick = e => {
	// chamando a função
	gerarTabela()
}

function destroyChart() {
	chart.destroy()
}

// ============================================= QuickSort ================================================
function troca(vet, i, j) {
	let aux = vet[i]
	vet[i] = vet[j]
	vet[j] = aux
}

function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
	if (posFim > posIni) {
		const posPivot = posFim
		let posDiv = posIni - 1

		for (let i = posIni; i < posFim; i++) {
			if (vet[i] < vet[posPivot]) {
				posDiv++
				troca(vet, i, posDiv)
			}
		}
		posDiv++
		troca(vet, posDiv, posPivot)

		// Subvetor à esquerda
		quickSort(vet, posIni, posDiv - 1)

		// Subvetor à direita
		quickSort(vet, posDiv + 1, posFim)
	}
}

function dadosCharts(total, dados) {
	let porcentual = []
	for (let i = 0; i < dados.length; i++) {
		porcentual[i] = Number(((dados[i] / total) * 100).toFixed(2))
	}
	return porcentual
}


function pieChart(){

}