var nomenTabela = ["1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","6s","4f","5d","6p","7s","5f","6d","7p",]
var expoTabela = [2,2,6,2,6,2,10,6,2,10,6,2,14,10,6,2,14,10,6]

var resultado = []
function fazerMagica(){
    var prosseguir = verificarValor()
    if(!prosseguir){return}

    //Limpa o array de resultado para uso
    resultado = []

    // declara o valor digitado no input
    var numAtom = parseInt(document.getElementById("numAtom").value)


    for (let i = 0; i < nomenTabela.length; i++) {
        // Gera o array com o resultado
        if(numAtom - expoTabela[i] >=1){
            resultado[i] = expoTabela[i]
            numAtom -= expoTabela[i]

        // Sai do "for loop" se o número chegar a 0
        } else if(numAtom == 0){
            break
        }
        // Sai do "for loop" fazendo sua última iteração
         else if(numAtom - expoTabela[i] < 1){
            resultado[i] = numAtom
            break
        }
    }

    var element = document.createElement('h2')
    element.innerHTML = ""
    element.id = "resultadoLinus"
    for (let index = 0; index < resultado.length; index++) {

        var sup = document.createElement("sup")
        sup.textContent = resultado[index]
        element.innerHTML += nomenTabela[index]
        element.appendChild(sup)
        if(index != resultado.length - 1){

            element.innerHTML += ", "
        }
    }

    document.getElementById("divResultadoLinus").appendChild(element)

    pegarElemento()
}
function verificarValor(){
    if(document.getElementById("resultadoLinus") != null){
        document.getElementById("resultadoLinus").remove()
    }

    var numAtom = document.getElementById("numAtom").value
    if(numAtom == "" || numAtom == null){
        document.getElementById("element").innerHTML = "ELEMENTO INVÁLIDO"
        return false
    }
    numAtom = parseInt(numAtom)
    if(numAtom < 1 || numAtom > 118){
        document.getElementById("element").innerHTML = "ELEMENTO INVÁLIDO"
        alert("SOMENTE VALORES DE 1 A 118")
        return false
    } else{
        return true
    }
}


function pegarElemento(){
    if(document.getElementById("numAtom").value == ""){
        return
    }

    document.getElementById("element").innerHTML = "buscando..."

    fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/refs/heads/master/PeriodicTableJSON.json").then(response => {
        if(!response.ok){
            throw new Error("ERRO")
        }
        return response.json()
        }).then(dados =>{
        dados.elements.forEach(e => {
            if(e.number == document.getElementById("numAtom").value){
                document.getElementById("element").innerHTML = e.name
            }
        });
    }).catch(erro =>{
        alert("Falha ao conectar com a API")
        console.log(erro)
    })
}