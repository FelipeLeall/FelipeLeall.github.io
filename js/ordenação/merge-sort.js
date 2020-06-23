function juntarVetores(vetEsq, vetDir) {
   let pEsq = 0, pDir = 0, resultado = []
   while(pEsq < vetEsq.length && pDir < vetDir.length) {
      if(vetEsq[pEsq] < vetDir[pDir]) {
         resultado.push(vetEsq[pEsq])
         pEsq++
      }
      else {
         resultado.push(vetDir[pDir])
         pDir++
      }
   }
   let sobra
   if(pEsq < pDir) sobra = vetEsq.slice(pEsq)
   else sobra = vetDir.slice(pDir)
   return resultado.concat(sobra)
}

function mergeSort(vet) {
   if(vet.length > 1) {
      let meio = Math.floor(vet.length / 2)
      let vetEsq = vet.slice(0, meio)
      let vetDir = vet.slice(meio)
      vetEsq = mergeSort(vetEsq)
      vetDir = mergeSort(vetDir)
      vet = juntarVetores(vetEsq, vetDir)
   }
   return vet
}
