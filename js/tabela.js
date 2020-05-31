// Capturando os elementos
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const exibirOrdem = document.querySelector('#varOrdem')
const localDaTabela = document.querySelector(`#calculoNominal`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#varNome')
const dadosVariavel = document.querySelector('#varDados')
const corpoTabela = document.querySelector('#corpo')
const moda = document.querySelector('#mode')
const media = document.querySelector('#mean')
const mediana = document.querySelector('#median')


/*=========================================================================================================
================================================== Charts =================================================
=========================================================================================================== */
let chart
// Contexto do gráfico
const ctx = document.getElementById('oChartDasBonecas')
Chart.defaults.scale.ticks.beginAtZero = true





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

/*===================================================================================================================
=============================================================== Botão calcular =======================================
=======================================================================================================================*/
function gerarTabela() {
	//--------------------------------------------------------------
	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'


	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = dados.filter((este, i) => dados.indexOf(este) === i)



	// Separando Elementos inseridos
	let sep = dados.reduce((obj, item) => {
		item = item.replace(/\s/g, '') // tira os espacos
		if (!obj[item]) {
			obj[item] = 1
		} else {
			obj[item]++
		}
		return obj

	}, {})





	let totPor = 0
	let fac = 0
	let facP = 0

	//pega o total separado
	Object.keys(sep).forEach(item => {
		totPor += sep[item]
	})

	// =========================================== Para os Charts ===========================================

	chartTeste = Object.values(sep) //Parametros usados para compor o gráfico


	/*==========================================================================================================
	==================================================== Nominal ===============================================
	============================================================================================================ */

	if (tipoCalculo[0].checked) {
		// Inserindo valores na tabela nominal
		corpoTabela.innerHTML = ``
		cont = 0

		Object.keys(sep).forEach(item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>
			${(sep[item] / totPor * 100).toFixed(2) }%</td> <td>${fac}</td> <td>${ facP.toFixed(2) }%</td> </tr>`
			cont += sep[item]

		})

		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">
		${cont}</td> <td id="total"> 100% </td> <td id="total"> </td> <td id="total"> </td> </tr>`


		/*=============================================== Moda,Média,Mediana ========================================== */

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""

		const tesModa = mode(dados)
		const tesMedia = mean(dados)
		const tesMediana = median(dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML += `Média:  ${tesMedia}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`

		/*===================================================== T_T ================================================ */


		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'pie',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: chartTeste
				}]

			}
		})

		// Fim tabela nominal

		/*==========================================================================================================
		==================================================== Ordinal ===============================================
		============================================================================================================ */

	} else if (tipoCalculo[1].checked) {
		// Inserindo valores na tabela ordinal
		let ordemInput = document.querySelector('#ordem').value.split(',')
		ordemInput = ordemInput.filter((este, i) => ordemInput.indexOf(este) === i)



		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0
		ordemInput.forEach(item => {
			item = item.replace(/\s/g, '') // fazer testes
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td>
			 <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
		})

		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td>
		 <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`


		/*=============================================== Moda,Média,Mediana ========================================== */

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""

		const tesModa = mode(dados)
		const tesMedia = mean(dados)
		const tesMediana = median(dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML += `Média:  ${tesMedia}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`

		/*===================================================== T_T ================================================ */



		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'pie',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: chartTeste
				}]

			}
		})

		// Fim tabela ordinal

		/*==========================================================================================================
		==================================================== Descritiva ===============================================
		============================================================================================================ */

	} else if (tipoCalculo[2].checked) {
		//Inserindo valores na tabela Discreta
		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0
		Object.keys(sep).forEach(item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`

		/*=============================================== Moda,Média,Mediana ========================================== */

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""

		const tesModa = mode(dados)
		const tesMedia = mean(dados)
		const tesMediana = median(dados)

		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML += `Média:  ${tesMedia}`
		mediana.innerHTML += `Mediana:  ${tesMediana}`

		/*===================================================== T_T ================================================ */


		chart = new Chart(ctx, {
			//Tipo do gráfico
			type: 'bar',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: chartTeste
				}]

			}
		})

		// Fim da Tabela Discreta

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

		let at = (max - min) //altura

		let k = Number(Math.sqrt(dados.length).toString()[0]) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1

		let inteiro = true
		let ic
		let linha


		while (inteiro) {
			at += 1
			let ic1 = at / k
			let ic2 = at / kmais
			let ic3 = at / kmenos
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

		/*=============================================== Mediana ============================================== */

		const frequencia = dados.length
		


		let pos = frequencia / 2
		let fimd = []
		let maxMd = []
		let fant = []
		let xiAux = []

		/*=================================================== T_T ================================================ */

		corpoTabela.innerHTML = ''

		cont = 0
		ic = Number(ic) //intervalo
		min = Number(min)

		let tot = 0
		let totVet = []
		let minAux = min

		for (i = 0; i < linha; i++) {
			tot = 0
			dados.forEach((item) => {
				if (Number(item) >= minAux && Number(item) < (minAux + ic)) {
					tot += 1
				}
			})

			fimd.push(minAux) // i
			minAux += ic
			maxMd.push(minAux)
			totVet.push(tot)
		}

		for (let i = 0; i < linha; i++) {
			fiP = totVet[i] / totPor * 100
			fac += totVet[i]
			fant.push(fac)
			facP += fiP
			xiAux[i] = (fimd[i]+maxMd[i])/2
			corpoTabela.innerHTML += `<tr> <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td> <td>${totVet[i]}</td> <td>${fiP}</td> <td>${fac}</td> <td>${facP}</td> <td>${xiAux[i]}</td>  </tr>`
			let lblChartContinua = []
			cont += totVet[i]
			min += ic
		}
		
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		/*h = ic
		fi = frequencia 
		fimd = totvet*/
		let iAux
		let fiAuxi
		let fimdAux
		let fantAux
		let mediaCont = 0

		/*=============================================== Mediana ============================================== */
		for (let i = 0; i < linha; i++) {
			if (fant[i] >= pos) {
				iAux = fimd[i]
				fiAuxi = frequencia
				fantAux = fant[i - 1]
				fimdAux = totVet[i]

				medianaCont = iAux + ((fiAuxi / 2 - fantAux) / fimdAux) * ic

				break

			}
		}


		for (let i = 0; i < linha; i++) {
			mediaCont += xiAux[i]*totVet[i]/frequencia
		}
		
		/*============================================== moda,média,medin ======================================== */
		const tesModa = mode(dados)

		moda.innerHTML = ""
		mediana.innerHTML = ""
		media.innerHTML = ""
	
		moda.innerHTML += `Moda:  ${tesModa}`
		media.innerHTML = `Média: ${mediaCont}`
		mediana.innerHTML += `Mediana:  ${medianaCont}`
		
		/*=================================================== T_T ================================================ */

		chart = new Chart(ctx, {
			type: 'bar',
			//Especificações
			data: {
				labels: dadosSeparados,
				datasets: [{
					label: NomeTabela,
					data: chartTeste
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
				}
			}
		});


		// Fim tabela continua
	}

	/*=========================================================================================================
	============================================== Moda, Média e Mediana ======================================
	=========================================================================================================== */


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

}

// Interação com o botão calcular 
document.querySelector('#BotaoCalcular').onclick = e => {
	// chamando a função
	gerarTabela()
}

function destroyChart() {
	chart.destroy()
}