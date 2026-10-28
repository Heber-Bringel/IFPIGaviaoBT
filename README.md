# IFPI Gavião — MVVM Sofisticado

Cardápio digital da disciplina de Programação para Dispositivos Móveis do IFPI, desenvolvido com Expo SDK 57, React Native e TypeScript. A aplicação evolui do MVVM Simplificado para o MVVM Sofisticado, com casos de uso, inversão de dependências e infraestrutura isolada.

## Executar

Use Node.js 22.13 ou superior e instale as dependências:

```bash
npm install
npm start
```

No Expo, use `a` para Android, `i` para iOS (macOS) ou `w` para web.

## Arquitetura

```text
src/
├── app/                 Rotas finas do Expo Router
├── view/                Telas, navegação e estilos
├── viewmodel/           Estado e ações de apresentação
├── usecase/             IMenuUseCases e regras de negócio
├── model/
│   ├── entities/        Tipos de domínio sem dependência de React Native
│   ├── datasources/     ICategoryDataSource e IProductDataSource
│   └── errors.ts        DomainError, ValidationError e DataSourceError
├── infra/datasources/   Dados locais e simulação assíncrona de 600 ms
├── di/container.ts      Composição das dependências
└── utils/               Formatação de preço
```

As Views consomem as ViewModels, que recebem `IMenuUseCases` por parâmetro, com a instância do container como padrão. `MenuUseCases` recebe exclusivamente os contratos das fontes de dados. O container é o único ponto que instancia implementações concretas e conecta as camadas.

Os casos de uso validam identificadores, tratam produtos e categorias inexistentes e controlam a quantidade (inteiro positivo, mínimo 1). As consultas de categoria e produtos acontecem em paralelo, preservando o tempo de carregamento anterior. A infraestrutura converte falhas técnicas em `DataSourceError` e devolve cópias dos registros para evitar alterações acidentais na base local.

Os hooks apresentam mensagens de `DomainError`, usam uma mensagem genérica para falhas inesperadas e ignoram respostas de consultas antigas após mudança de identificador ou desmontagem. Os parâmetros de rota ficam na apresentação, sem acoplar as ViewModels ao Expo Router.

As imagens, preços, descrições, estilos e rotas do cardápio foram mantidos.

## Verificação

```bash
npm run typecheck
```

O comando verifica os tipos TypeScript sem gerar arquivos. O projeto não possui uma suíte de testes automatizados no momento.

Para verificar a interface, percorra Categorias → Comidas/Bebidas → Detalhes, confira o carregamento, aumente e diminua a quantidade e volte ao cardápio. URLs com identificadores inexistentes devem exibir uma mensagem de erro.

## Entrega

Branch da atividade: `feature/refactor-mvvm-sofisticado`.

Após revisar e criar o commit, envie a branch e submeta o link público do repositório no Google Classroom, conforme o enunciado.

Referência de compatibilidade: [documentação do Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/).
