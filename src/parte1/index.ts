import {lerArquivo, Cidades} from '../utils/preparadorArquivos';

const { cidades, cepBuscado } = lerArquivo('parte1.txt');

const ordenaCidades = cidades.sort((a, b) => a.cepInicio - b.cepInicio);

function buscarCidade(cidades: Cidades[], cep: number ): string{
    let inicio = 0;
    let fim = cidades.length - 1;
    let resultadoCidades: Cidades[] = [];
    
    while (inicio <= fim) {
        const meio = Math.floor((inicio + fim) / 2);
        const cidade = cidades[meio];

        if (cep >= cidade.cepInicio && cep <= cidade.cepFim){
            resultadoCidades.push(cidade);

            let vizinhoE = meio -1;
            while (vizinhoE >= 0 && cep >= cidades[vizinhoE].cepInicio && cep <= cidades[vizinhoE].cepFim) {
                resultadoCidades.push(cidades[vizinhoE]);
                vizinhoE--;
            }

            let vizinhoD = meio + 1;
            while (vizinhoD < cidades.length && cep >= cidades[vizinhoD].cepInicio && cep <= cidades[vizinhoD].cepFim) {
                resultadoCidades.push(cidades[vizinhoD]);
                vizinhoD++;
            }

            break;
            
        } else if (cep < cidade.cepInicio){
            fim = meio - 1;
        } else {
            inicio = meio + 1;
        }
    }
    if (resultadoCidades.length === 0) return 'Cidade não encontrada';
    
    const maisProxima = resultadoCidades.sort((a, b) => 
        (a.cepFim - a.cepInicio) - (b.cepFim - b.cepInicio)
    )[0];
    return maisProxima.nome;
}

const resultado = buscarCidade(ordenaCidades, parseInt(cepBuscado))
console.log(`O CEP pertence a cidade: ${resultado}`);