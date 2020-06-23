function troca(vet, i, j) {
   let aux = vet[i]
   vet[i] = vet[j]
   vet[j] = aux
}

export function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
   if(posFim > posIni) { 
      const posPivot = posFim 
      let posDiv = posIni - 1

      for(let i = posIni; i < posFim; i++) {
         if(vet[i] < vet[posPivot]) {
            posDiv++
            troca(vet, i, posDiv)
         }
      }
      posDiv++
      troca(vet, posDiv, posPivot)

      // Subvetor à esquerda
      quickSort(vet,posIni, posDiv - 1)

      // Subvetor à direita
      quickSort(vet,posDiv + 1, posFim)
   }
}
