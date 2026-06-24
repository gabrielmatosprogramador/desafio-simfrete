# Desafio Simfrete

## Como executar:

### Pré-requisitos
- Node.js 18+
- npm

### Instalação:
```bash
npm install
```

### Parte 1 — Busca de cidade por CEP:
Coloque o arquivo de entrada em `arquivos/parte1.txt` e execute:
```bash
npm run parte1
```

### Parte 2 — Menor custo de transporte:
Coloque o arquivo de entrada em `arquivos/parte2.txt` e execute:
```bash
npm run parte2
```

## Observações:

### Parte 1
- Busca binária O(log n) sobre os intervalos de CEP ordenados por início
- Em caso de intervalos sobrepostos, o de menor range tem prioridade (mais específico vence)
- CEPs mantidos como string para preservar zeros à esquerda

### Parte 2
- CEPs da última linha são resolvidos para cidades usando a mesma lógica da Parte 1
- Algoritmo de Dijkstra para encontrar a rota de menor custo
- Grafo não-direcionado: se A→B tem custo X, então B→A também tem custo X
