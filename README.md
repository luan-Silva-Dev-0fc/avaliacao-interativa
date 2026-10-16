# Avaliação Interativa – Explicação do código

Este documento explica a lógica do projeto: uma tela onde o usuário escolhe uma nota de 1 a 5 e, ao enviar, vê uma mensagem de agradecimento.

Nos trechos abaixo, as classes de estilo (`className`) foram removidas para facilitar a leitura.

## Visão geral

O projeto tem três arquivos principais:

| Arquivo | Função |
| --- | --- |
| `App.jsx` | Guarda os dados (nota e envio) e decide qual tela mostrar. |
| `components/Avaliacao.jsx` | Tela onde o usuário escolhe a nota e envia. |
| `components/Verificacao.jsx` | Tela de agradecimento, exibida depois do envio. |

---

## 1. `App.jsx`

Este arquivo guarda os dados e escolhe qual tela aparece.

```jsx
import { useState } from 'react'
import Avaliacao from './components/Avaliacao'
import Verificacao from './components/Verificacao'

function App() {
  const [nota, setNota] = useState(null)
  const [enviado, setEnviado] = useState(false)

  const enviar = () => {
    if (nota !== null) setEnviado(true)
  }

  return (
    <main>
      {enviado ? (
        <Verificacao nota={nota} />
      ) : (
        <Avaliacao nota={nota} aoSelecionar={setNota} aoEnviar={enviar} />
      )}
    </main>
  )
}

export default App
```

**Explicação:**

- `useState` é um recurso do React que permite guardar um valor. Quando o valor muda, a tela é atualizada automaticamente.
- `const [nota, setNota] = useState(null)`
  - `nota`: a nota escolhida pelo usuário.
  - `setNota`: função usada para alterar a nota.
  - `null`: valor inicial, que significa que nenhuma nota foi escolhida.
- `const [enviado, setEnviado] = useState(false)`
  - `enviado`: indica se a avaliação já foi enviada.
  - `false`: valor inicial, ou seja, ainda não foi enviada.
- `enviar`: função executada quando o usuário clica em "Enviar".
  - Só muda `enviado` para `true` se existir uma nota escolhida (`nota !== null`).
- `{enviado ? <Verificacao /> : <Avaliacao />}`: renderização condicional.
  - Se `enviado` for `true`, mostra a tela de agradecimento.
  - Se for `false`, mostra a tela de votação.
- **Props:** são os dados e funções que o `App` entrega aos componentes filhos:
  - `nota={nota}`: entrega o valor da nota.
  - `aoSelecionar={setNota}`: entrega a função que altera a nota.
  - `aoEnviar={enviar}`: entrega a função que envia a avaliação.

**Ponto importante:** os dados ficam no `App` (componente pai). Os componentes filhos apenas exibem as informações e avisam o `App` quando algo acontece, como um clique.

---

## 2. `components/Avaliacao.jsx`

Esta é a tela de votação.

### Imports e lista de notas

```jsx
import estrela from '../assets/icon-star.svg'

const NOTAS = [1, 2, 3, 4, 5]
```

- `import estrela`: carrega a imagem da estrela para poder usá-la no código.
- `NOTAS`: lista com as notas possíveis. Ela fica fora da função porque nunca muda. Com ela, não é preciso escrever os 5 botões um por um.

### Recebendo os dados

```jsx
function Avaliacao({ nota, aoSelecionar, aoEnviar }) {
```

O componente recebe três props vindas do `App`:

- `nota`: a nota atualmente escolhida.
- `aoSelecionar`: função para escolher uma nota.
- `aoEnviar`: função para enviar a avaliação.

### Estrela e título

```jsx
<img src={estrela} alt="" />

<h1 id="titulo-avaliacao">Como Foi Seu Atendimento?</h1>
```

- `src={estrela}`: usa a imagem importada. As chaves `{ }` servem para colocar uma variável dentro do JSX.
- `alt=""`: a imagem é apenas decorativa, então fica sem descrição. Assim, leitores de tela a ignoram.
- `id="titulo-avaliacao"`: identifica o título. A tag `<section>` usa esse id em `aria-labelledby` para informar a leitores de tela qual é o nome da seção.

### Botões de nota

```jsx
<div role="radiogroup" aria-label="Nota de 1 a 5">
  {NOTAS.map((valor) => {
    const selecionada = nota === valor
    return (
      <button
        key={valor}
        type="button"
        role="radio"
        aria-checked={selecionada}
        onClick={() => aoSelecionar(valor)}
      >
        {valor}
      </button>
    )
  })}
</div>
```

- `NOTAS.map(...)`: percorre a lista e cria um botão para cada número.
- `valor`: o número do botão atual (1, 2, 3, 4 ou 5).
- `selecionada`: é `true` quando a nota escolhida é igual ao número do botão. É usado para destacar o botão selecionado.
- `key={valor}`: identificador único exigido pelo React em listas.
- `type="button"`: define que é um botão comum, sem comportamento de formulário.
- `onClick={() => aoSelecionar(valor)}`: ao clicar, chama a função que altera a nota, passando o número do botão.
  - A forma `() =>` é necessária para que a função só seja executada no clique, e não quando a tela é desenhada.
- `role="radiogroup"`, `role="radio"` e `aria-checked`: informam a leitores de tela que os botões formam um grupo em que apenas uma opção pode ser escolhida e qual está marcada.

### Botão Enviar

```jsx
<button
  type="button"
  onClick={aoEnviar}
  disabled={nota === null}
>
  Enviar
</button>
```

- `onClick={aoEnviar}`: ao clicar, chama a função `enviar` do `App`.
- `disabled={nota === null}`: o botão fica desativado enquanto nenhuma nota for escolhida. Assim que o usuário escolhe uma nota, ele é ativado automaticamente.

---

## 3. `components/Verificacao.jsx`

Esta é a tela de agradecimento.

```jsx
import ilustracao from '../assets/illustration-thank-you.svg'

function Verificacao({ nota }) {
  return (
    <section aria-live="polite">
      <img src={ilustracao} alt="" />
      <p>Você selecionou {nota} de 5</p>
      <h1>Obrigado!</h1>
      <p>Agradecemos por dedicar um tempo para nos avaliar...</p>
    </section>
  )
}

export default Verificacao
```

- `import ilustracao`: carrega a imagem da ilustração.
- `({ nota })`: o componente recebe apenas a nota, pois é só o que precisa mostrar.
- `{nota}`: exibe na tela o valor recebido do `App`.
- `alt=""`: a ilustração é decorativa.
- `aria-live="polite"`: quando essa tela aparece, leitores de tela leem o novo conteúdo sem interromper a leitura atual.
- Este componente não guarda dados nem tem funções próprias: apenas recebe uma informação e a exibe.

---

## Resumo do funcionamento

1. A aplicação começa com `nota = null` e `enviado = false`, e mostra a tela `Avaliacao`.
2. O usuário clica em um número. A função `setNota` guarda a nota e o botão fica marcado.
3. Com uma nota escolhida, o botão "Enviar" é ativado.
4. O usuário clica em "Enviar". A função `enviar` muda `enviado` para `true`.
5. O `App` passa a mostrar a tela `Verificacao`, com a nota escolhida.
