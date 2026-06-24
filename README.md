# Desafio Simfrete

## Como executar

### Pré-requisitos
- Node.js 18+
- npm

### Instalação
npm install

### Parte 1 — Busca de cidade por CEP
Coloque o arquivo de entrada em `arquivos/parte1.txt` e execute:
npm run parte1

### Parte 2 — Menor custo de transporte
Coloque o arquivo de entrada em `arquivos/parte2.txt` e execute:
npm run parte2

## Decisões técnicas

### Parte 1
- Busca binária O(log n) para localizar o intervalo de CEP
- Em caso de intervalos sobrepostos, o intervalo mais específico
  (menor range) tem prioridade
- CEPs são mantidos como string para preservar zeros à esquerda

### Parte 2
- Algoritmo de Dijkstra para encontrar o menor custo entre cidades
- Grafo não-direcionado (A→B implica B→A com mesmo custo)
