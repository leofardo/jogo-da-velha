class Iniciar{
	recuperarClick(fila, valor){

		for (var i = 1; i <= 4; i++) {
			let x = document.querySelector(`#designJogo .fileira:nth-child(${fila}) div:nth-child(${valor})`)

			if(x.innerHTML.includes('img')){
				console.log('ta marcado')
				break
			}else{
				if(fila == i){
					x.innerHTML = '<img src="img/x.png">'
					let vencedor = new Vencedor()
					if(vencedor.verificarVencedor()){
						let robo = new Robo()
						robo.roboJogada()
					}
					break
				}
			}
		}		
	}

	recomeçarPartida(){
		for (var a = 1; a <= 3; a++) {
			for (var i = 1; i <= 3; i++) {
				document.querySelector(`#designJogo .fileira:nth-child(${i}) div:nth-child(${a})`).innerHTML = '' 
			}
		}
		
	}

	pontosIniciais(){
		document.getElementById('valorPontuacaoX').innerHTML = 0
		document.getElementById('valorPontuacaoO').innerHTML = 0
	}
}

class Vencedor{
	verificarVencedor(){

		let jeitoGanharH = [[],[],[]] 
		let jeitoGanharV = [[],[],[]] 
		let vencedor = new Modal()
		let pontuacao = new Pontuacao()	
		
		for (var i = 1; i < 4; i++) {
			jeitoGanharH[0].push(document.querySelector(`#designJogo .fileira:nth-child(1) div:nth-child(${i})`).innerHTML)					
			jeitoGanharH[1].push(document.querySelector(`#designJogo .fileira:nth-child(2) div:nth-child(${i})`).innerHTML)					
			jeitoGanharH[2].push(document.querySelector(`#designJogo .fileira:nth-child(3) div:nth-child(${i})`).innerHTML)

			jeitoGanharV[0].push(document.querySelector(`#designJogo .fileira:nth-child(${i}) div:nth-child(1)`).innerHTML)					
			jeitoGanharV[1].push(document.querySelector(`#designJogo .fileira:nth-child(${i}) div:nth-child(2)`).innerHTML)					
			jeitoGanharV[2].push(document.querySelector(`#designJogo .fileira:nth-child(${i}) div:nth-child(3)`).innerHTML)
		}


		//HORIZONTAL
		for (var i = 0; i < jeitoGanharH.length; i++) {
			if(jeitoGanharH[i][0].includes('img')){
				if(jeitoGanharH[i][0] == jeitoGanharH[i][1] && jeitoGanharH[i][0] == jeitoGanharH[i][2]){	
					if (jeitoGanharH[i][0].includes('x')) {
						vencedor.mostrarVencedor(true)
						pontuacao.adicionarPonto(true)
					}else{
						vencedor.mostrarVencedor(false)
						pontuacao.adicionarPonto(false)
					}
					return false
				}
			}	
		}

		//VERTICAL
		for (var i = 0; i < jeitoGanharV.length; i++) {
			if(jeitoGanharV[i][0].includes('img')){
				if (jeitoGanharV[i][0] == jeitoGanharV[i][1] && jeitoGanharV[i][0] == jeitoGanharV[i][2]) {
					if (jeitoGanharH[i][i].includes('x')) {
						vencedor.mostrarVencedor(true)
						pontuacao.adicionarPonto(true)
					}else{
						vencedor.mostrarVencedor(false)
						pontuacao.adicionarPonto(false)
					}
					return false
				}
			}
		}

		//INCLINADA
		if ((jeitoGanharH[0][0].includes('img') && jeitoGanharH[1][1].includes('img') && jeitoGanharH[2][2].includes('img')) || (jeitoGanharH[0][2].includes('img') && jeitoGanharH[1][1].includes('img') && jeitoGanharH[2][0].includes('img'))) {
			if ((jeitoGanharH[0][0] == jeitoGanharH[1][1] && jeitoGanharH[0][0] == jeitoGanharH[2][2]) || (jeitoGanharH[0][2] == jeitoGanharH[1][1] && jeitoGanharH[2][0] == jeitoGanharH[0][2])) {
				if ((jeitoGanharH[0][0].includes('x') && jeitoGanharH[1][1].includes('x') && jeitoGanharH[2][2].includes('x')) || jeitoGanharH[0][2].includes('x') && jeitoGanharH[1][1].includes('x') && jeitoGanharH[2][0].includes('x') ) {
					vencedor.mostrarVencedor(true)
					pontuacao.adicionarPonto(true)
				}else{
					vencedor.mostrarVencedor(false)
					pontuacao.adicionarPonto(false)
				}
				return false
			}
		}

		return true
	}
}

class Robo{
	constructor(filaPlayer, valorPlayer){
		this.filaPlayer = filaPlayer
		this.valorPlayer = valorPlayer
	}
	roboJogada(){
		for (var i = 30; i >= 0; i--) {
			let randomValor = Math.ceil(Math.random() * 3)
			let randomFila = Math.ceil(Math.random() * 3)

			let jogada = document.querySelector(`#designJogo .fileira:nth-child(${randomFila}) div:nth-child(${randomValor})`).innerHTML 

			if(jogada.includes('<img')){
				// console.log('entrou aq')
				// console.log(i)
				if(i == 0){
					// console.log('velha')
					let modal = new Modal()
					modal.velha()
				}else{
					continue
				}
			}else{
				if(randomFila == this.filaPlayer && randomValor == this.valorPlayer){
					continue
				}else{
					console.log(`bot vai escolher a fila ${randomFila} e o valor ${randomValor}`)
					setTimeout(function(){
						let robo = new Robo()
						robo.roboJogar(randomFila, randomValor)
					},210)
					break
				}
			}
		}
	}
	roboJogar(filaRobo, valorRobo){
		document.querySelector(`#designJogo .fileira:nth-child(${filaRobo}) div:nth-child(${valorRobo})`).innerHTML = '<img src="img/o.png">'
		let vencedor = new Vencedor
		vencedor.verificarVencedor()
	}
}

class Modal{
	mostrarVencedor(bool){
		if(bool){
			document.getElementById('modal-title').innerHTML = 'Vencedor !!!'
			document.getElementById('modal-body').innerHTML = 'Parabéns X! Você ganhou! '
			document.getElementById('modal-title').className = 'modal-title text-success'
			document.getElementById('modal-botao').className = 'btn btn-success'

		}else{
			document.getElementById('modal-title').innerHTML = 'Perdedor !!!'
			document.getElementById('modal-body').innerHTML = 'Infelizmente você perdeu... '
			document.getElementById('modal-title').className = 'modal-title text-danger'
			document.getElementById('modal-botao').className = 'btn btn-danger'
		}

		$('#modalVencedor').modal('show')
	}

	velha(){
		document.getElementById('modal-title').innerHTML = 'Velha !!!'
		document.getElementById('modal-body').innerHTML = 'A jogada empatou...'
		document.getElementById('modal-title').className = 'modal-title text-warning'
		document.getElementById('modal-botao').className = 'btn btn-warning text-white'	

		$('#modalVencedor').modal('show')

	}
}

class Pontuacao{
	adicionarPonto(bool){
		if (bool) {
			document.getElementById('valorPontuacaoX').innerHTML = parseFloat(document.getElementById('valorPontuacaoX').innerHTML) + 1
		}else{
			document.getElementById('valorPontuacaoO').innerHTML = parseFloat(document.getElementById('valorPontuacaoO').innerHTML) + 1
		}
	}
}


let iniciar = new Iniciar()