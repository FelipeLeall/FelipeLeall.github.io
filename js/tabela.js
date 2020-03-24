// Capturando os elementos
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const exibirOrdem = document.querySelector('#varOrdem')
const localDaTabela = document.querySelector(`#calculoNominal`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#varNome')
const dadosVariavel = document.querySelector('#varDados')
const corpoTabela = document.querySelector('#corpo')


// mostrar ou esconder o input de ordem
if (tipoCalculo[1].checked) exibirOrdem.style.display = 'block'
tipoCalculo[1].onchange = e => {
	if( e.isTrusted ){
		exibirOrdem.style.display = 'block'

	}
}

tipoCalculo[0].onchange = e => {
	if( e.isTrusted ){
		exibirOrdem.style.display = 'none'

	}
}

tipoCalculo[2].onchange = e => {
	if( e.isTrusted ){
		exibirOrdem.style.display = 'none'

	}
}

tipoCalculo[3].onchange = e => {
	if( e.isTrusted ){
		exibirOrdem.style.display = 'none'

	}
}

// Botão calcular 
function gerarTabela(){
	//--------------------------------------------------------------
	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'


	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = []

	
	// Separando Elementos inseridos
	let sep = dados.reduce( (obj, item) => {
		item = item.replace(/\s/g, '')// tira os espacos
		if(!obj[item]){
			obj[item] = 1
		}else {
			obj[item]++
		}
		return obj
	
	}, {} )


	let totPor = 0
	let fac = 0
	let facP = 0
	//pega o total separado
	Object.keys(sep).forEach( item => {
		totPor += sep[item]
	})

	if( tipoCalculo[0].checked ){
		// Inserindo valores na tabela nominal
		corpoTabela.innerHTML = ``
		cont = 0 

		Object.keys(sep).forEach( item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>
			${(sep[item] / totPor * 100).toFixed(2) }%</td> <td>${fac}</td> <td>${ facP.toFixed(2) }%</td> </tr>`
			cont += sep[item]

		})

		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">
		${cont}</td> <td id="total"> 100% </td> <td id="total"> </td> <td id="total"> </td> </tr>`

		// Fim tabela nominal

	}else if( tipoCalculo[1].checked ){
		// Inserindo valores na tabela ordinal
		let ordemInput = document.querySelector('#ordem').value.split(',')
		ordemInput = ordemInput.filter( (este, i) => ordemInput.indexOf(este) === i )



		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		ordemInput.forEach( item => {
			item = item.replace(/\s/g, '') // fazer testes
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td>
			 <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
		})

		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td>
		 <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`

		// Fim tabela ordinal

	}else if( tipoCalculo[2].checked ){
		//Inserindo valores na tabela Discreta
		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		Object.keys(sep).forEach( item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// Fim da Tabela Discreta

	}else if( tipoCalculo[3].checked ){
		// Inserindo valores na tabela continua
		
		let min = Number( dados[0] )
		let max = Number( dados[0] )
		
		dados.forEach( item => {
			if( Number(item) > max ) max = item
			if( Number(item) < min ) min = item
		} )
		
		let at = (max - min)
		
		let k = Number( Math.sqrt( dados.length ).toString()[0] ) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1

		let inteiro = true
		let ic
		let linha


		while( inteiro ){
			at += 1
			let ic1 = at / k
			let ic2 = at / kmais
			let ic3 = at / kmenos
			if( Number.isInteger(ic1) ){
				ic = ic1
				linha = k
				inteiro = false
			}else if( Number.isInteger(ic2) ){
				ic = ic2
				linha = kmais
				inteiro = false
			}else if ( Number.isInteger(ic3) ){
				ic = ic3
				linha = kmenos
				inteiro = false
			}
		}
		
		corpoTabela.innerHTML = ''
		
		cont = 0
		ic = Number(ic)
		min = Number(min)

		let tot = 0
		let totVet = []

		let minAux = min

		for(i = 0; i < linha; i++){
			tot = 0
			dados.forEach( (item) => {
				if(Number(item) >= minAux && Number(item) < (minAux + ic) ){
					tot += 1
				}
			})
			minAux += ic
			totVet.push(tot)
		}

		for(let i = 0; i < linha; i++) {
			fiP = totVet[i] / totPor * 100
			fac += totVet[i] 
			facP += fiP
			corpoTabela.innerHTML += `<tr> <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td> <td>${totVet[i]}</td> <td>${fiP}</td> <td>${fac}</td> <td>${facP}</td> </tr>`
			cont += totVet[i]
			min += ic
		}
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// Fim tabela continua
	}

	//  console.log(item)
	//  console.log(sep)
	 console.log(dados)

	 //Criando Graficos 
	 
	 // Contexto do gráfico
	 const ctx = document.getElementById('oChartDasBonecas')
	 Chart.defaults.scale.ticks.beginAtZero = true

	 let chart = new Chart(ctx,{
	 	//Tipo do gráfico
	  	type:'pie',
	  	//Especificações
	  	data:{
	  		labels:['teste'],
	  		datasets: [
	  			{
	  				label: 'points',
	  				backgroundColor: ['#f1c40f','#e67e22','#16a085','#2980b9'],
	  				data: [10]
	  			}
	  		]

	  	}
	 })

	
	 


}

// Interação com o botão calcular 
document.querySelector('#BotaoCalcular').onclick = e => {
	// chamando a função
	gerarTabela()
}
