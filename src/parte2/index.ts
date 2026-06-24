import { lerArquivo2, Cidades } from '../utils/preparadorArquivos';
import { verificaRota } from './dijkstra';

const { cidades, ligacoes, cepOrigem, cepDestino } = lerArquivo2('parte2.txt')

function encontrarCidade(cidades: Cidades[], cep: number): string {
    const encontradas = cidades.filter(c => cep >= c.cepInicio && cep <= c.cepFim);
    if (encontradas.length === 0 ) return 'Não foi possível encontrar a cidade com o CEP informado.';
    return encontradas.sort((a, b) => 
    (a.cepFim - a.cepInicio) - (b.cepFim - b.cepInicio))[0].nome;
}

const cidadeOrigem = encontrarCidade(cidades, parseInt(cepOrigem));
const cidadeDestino = encontrarCidade(cidades, parseInt(cepDestino));

console.log(`CEP de origem: ${cepOrigem} corresponde a cidade: ${cidadeOrigem}`);
console.log(`CEP de destino: ${cepDestino} corresponde a cidade: ${cidadeDestino}`);

const resultado = verificaRota(ligacoes, cidadeOrigem, cidadeDestino);

console.log(`\nRota com custo mais baixo: ${resultado.rota.join(' ->')}`);
console.log(`Custo total da rota: ${resultado.custoTotal.toFixed(2)}`);