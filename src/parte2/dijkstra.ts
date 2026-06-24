import { CustoTransporte } from "../utils/preparadorArquivos";

export interface ResultadoRota {
    rota: string[];
    custoTotal: number;
}

export function verificaRota(ligacoes: CustoTransporte[], cepOrigem: string, cepDestino: string): ResultadoRota {
    const mapaLigacoes: Map<string, {vizinho: string; custo: number}[]> = new Map();
    for (const ligacao of ligacoes) {
        if (!mapaLigacoes.has(ligacao.cepOrigem)) mapaLigacoes.set(ligacao.cepOrigem, []);
        if (!mapaLigacoes.has(ligacao.cepDestino)) mapaLigacoes.set(ligacao.cepDestino, []);
        
        mapaLigacoes.get(ligacao.cepOrigem)!.push({ vizinho: ligacao.cepDestino, custo: ligacao.custo });
        mapaLigacoes.get(ligacao.cepDestino)!.push({ vizinho: ligacao.cepOrigem, custo: ligacao.custo });
    }

    const custos: Map<string, number> = new Map();
    const anteriores: Map<string, string | null> = new Map();
    const cidadesPassadas: Set<string> = new Set();

    for (const cep of mapaLigacoes.keys()){
        custos.set(cep, Infinity);
        anteriores.set(cep, null);
    }
    custos.set(cepOrigem, 0);

    while(true){
        let cepAtual: string | null = null;
        let custoMenor: number = Infinity;

        for (const [cep, custo] of custos){
            if (!cidadesPassadas.has(cep) && custo < custoMenor){
                cepAtual = cep;
                custoMenor = custo;
            }
        }
        if (cepAtual === null || cepAtual === cepDestino) break;

        cidadesPassadas.add(cepAtual);

        for (const { vizinho, custo } of mapaLigacoes.get(cepAtual) || []){
            const novoCusto = custoMenor + custo;
            if (novoCusto < (custos.get(vizinho) ?? Infinity)){
                custos.set(vizinho, novoCusto);
                anteriores.set(vizinho, cepAtual);
            }
        }
    }

    const rota: string[] = [];
    let passo: string | null = cepDestino;

    while (passo !== null){
        rota.unshift(passo);
        passo = anteriores.get(passo) ?? null;

    }

    return {
        rota,
        custoTotal: custos.get(cepDestino) ?? Infinity
    }
}