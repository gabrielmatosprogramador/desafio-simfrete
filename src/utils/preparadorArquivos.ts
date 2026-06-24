import * as fs from 'fs';
import * as path from 'path';

export interface Cidades {
    nome: string;
    cepInicio: number;
    cepFim: number;
}

export interface Entrada1 {
    cidades: Cidades[];
    cepBuscado: string;
}

export function lerArquivo(nomeArquivo: string): Entrada1 {
    const caminhoArquivo = path.resolve('arquivos', nomeArquivo);
    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');

    const linhas = conteudoArquivo.trim().split('\n').map(l => l.trim());

    const separador = linhas.indexOf('--');

    const linhasCidades = linhas.slice(0, separador);
    const cepBuscado = linhas[separador + 1] ?? '';

    const cidades: Cidades[] = linhasCidades.map(linha => {
        const [nome, cepInicio, cepFim] = linha.split(',');
        return {
            nome,
            cepInicio: parseInt(cepInicio),
            cepFim: parseInt(cepFim)
        };
    });
    return {cidades, cepBuscado};
}

//Lógica da parte 2

export interface CustoTransporte {
    cepOrigem: string;
    cepDestino: string;
    custo: number;
}

export interface Entrada2 {
    cidades: Cidades[];
    ligacoes: CustoTransporte[];
    cepOrigem: string;
    cepDestino: string;
}

export function lerArquivo2(nomeArquivo: string): Entrada2{
    const caminhoArquivo = path.resolve('arquivos', nomeArquivo);
    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');

    const linhas = conteudoArquivo.trim().split('\n').map(l => l.trim());

    const primSeparador = linhas.indexOf('--');
    const segSeparador = linhas.indexOf('--', primSeparador + 1);

    const cidades: Cidades[] = linhas.slice(0, primSeparador).map(linha => {
        const [nome, cepInicio, cepFim] = linha.split(',');
        return {
            nome,
            cepInicio: parseInt(cepInicio),
            cepFim: parseInt(cepFim)
        };
    });

    const ligacoes: CustoTransporte[] = linhas.slice(primSeparador + 1, segSeparador).map(linha => {
        const [cepOrigem, cepDestino, custo] = linha.split(',');
        return {
            cepOrigem,
            cepDestino,
            custo: parseFloat(custo)
        };
    });

    const ultimaLinha = linhas[segSeparador + 1];
    const [cepOrigem, cepDestino] = ultimaLinha.split(',');

    return {cidades, ligacoes, cepOrigem, cepDestino}

}