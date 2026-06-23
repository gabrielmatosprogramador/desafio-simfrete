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