# Explicando o código, de boa 😄

Aqui eu explico só a **lógica** do código, sem falar de estilo. Nos trechos abaixo tirei os `className` pra ficar fácil de ler.

---

## 1. `App.jsx` – o cérebro do app

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

- `import { useState }` → traz o hook que dá "memória" pro componente. Sem ele, o valor sumiria a cada redesenho da tela.
- `import Avaliacao / Verificacao` → traz as duas telas, que moram em arquivos separados.
- `const [nota, setNota] = useState(null)`
  - `nota` é o valor atual (a nota que o usuário clicou).
  - `setNota` é a função que muda esse valor.
  - `null` significa "ainda não escolheu nada".
- `const [enviado, setEnviado] = useState(false)`
  - Guarda se o usuário já mandou a avaliação. Começa `false`.
- `const enviar = () => {...}` → função chamada quando clica em "Enviar".
  - `if (nota !== null)` → só deixa enviar se tiver uma nota escolhida. É uma proteção extra.
  - `setEnviado(true)` → marca como enviado e o React redesenha a tela.
- `{enviado ? (...) : (...)}` → renderização condicional. Lê assim: "se enviou, mostra o `Verificacao`; senão, mostra o `Avaliacao`".
- `nota={nota}` → passa a nota pro componente filho. Isso se chama **prop**.
- `aoSelecionar={setNota}` → passa a função de mudar a nota, pro filho conseguir atualizar o estado que mora no pai.
- `aoEnviar={enviar}` → passa a função de enviar.
- `export default App` → deixa o `App` disponível pro `main.jsx` usar.

> O estado fica **no pai** (`App`) e desce pros filhos por props. Os filhos não guardam nada, só mostram e avisam o pai quando algo acontece.

---

## 2. `components/Avaliacao.jsx` – a tela de votação

### Imports e lista de notas

```jsx
import estrela from '../assets/icon-star.svg'

const NOTAS = [1, 2, 3, 4, 5]
```

- `import estrela from '...svg'` → importa a imagem como se fosse uma variável. O Vite cuida do caminho certo na hora de rodar.
- `NOTAS` → lista com as notas possíveis. Fica fora da função porque nunca muda. Assim eu não preciso escrever 5 botões na mão.

### A função e as props

```jsx
function Avaliacao({ nota, aoSelecionar, aoEnviar }) {
```

- Os `{ }` no parâmetro "abrem" as props que vieram do `App`: a nota atual, a função de selecionar e a função de enviar.

### A estrela e o título

```jsx
<img src={estrela} alt="" />

<h1 id="titulo-avaliacao">Como nos saímos?</h1>
```

- `src={estrela}` → usa a imagem importada lá em cima. As chaves `{ }` servem pra colocar uma variável dentro do JSX.
- `alt=""` → vazio de propósito: a estrela é só enfeite, então o leitor de tela pula ela.
- `id="titulo-avaliacao"` → o `<section>` usa `aria-labelledby="titulo-avaliacao"` pra apontar pra esse título e dizer pro leitor de tela qual é o nome da seção.

### Os botões de nota

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

- `role="radiogroup"` → a `div` em volta agrupa os botões e avisa o leitor de tela que é um grupo onde só uma opção vale.
- `NOTAS.map(...)` → pra cada número da lista cria um botão. É o "loop" do React.
- `valor` → o número da vez (1, depois 2, e assim por diante).
- `const selecionada = nota === valor` → vira `true` se esse botão é o que está escolhido. Dá pra usar isso pra mudar a aparência dele.
- `key={valor}` → o React exige um identificador único em listas, pra saber qual botão é qual.
- `type="button"` → evita comportamento de formulário sem querer.
- `role="radio"` e `aria-checked={selecionada}` → dizem pro leitor de tela que é uma opção única e se ela tá marcada.
- `onClick={() => aoSelecionar(valor)}` → ao clicar, chama o `setNota` do pai com o número do botão.
  - Precisa da setinha `() =>` porque senão a função rodaria na hora de desenhar a tela, e não no clique.
- `{valor}` → o número que aparece dentro do botão.

### O botão Enviar

```jsx
<button
  type="button"
  onClick={aoEnviar}
  disabled={nota === null}
>
  Enviar
</button>
```

- `onClick={aoEnviar}` → chama a função `enviar` do `App`. Aqui sem a setinha, porque não preciso passar nenhum argumento.
- `disabled={nota === null}` → se ainda não escolheu nota, o botão fica travado. Quando escolhe, `nota` deixa de ser `null` e ele destrava sozinho.

---

## 3. `components/Verificacao.jsx` – a tela de obrigado

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

- `import ilustracao from '...svg'` → importa a ilustração da pasta `assets`, igual na outra tela.
- `<img src={ilustracao} alt="" />` → mostra a ilustração. `alt` vazio porque é só decoração.
- `({ nota })` → só recebe a nota, porque não precisa de mais nada.
- `{nota}` → o JavaScript dentro das chaves mostra o valor que veio do `App`.
- `aria-live="polite"` → quando essa tela aparece, o leitor de tela anuncia o conteúdo novo sem interromper o que estava falando.
- Essa tela não tem estado nem funções: só recebe um dado e mostra. É um componente "burro", e isso é bom.

---

## Resumão do fluxo

1. A tela abre com `nota = null` e `enviado = false`, então mostra `Avaliacao`.
2. Clicou num número → `setNota(valor)` → o React redesenha e o botão fica marcado.
3. Com uma nota escolhida, o botão **Enviar** destrava.
4. Clicou em Enviar → `setEnviado(true)` → o `App` troca para `Verificacao`, que mostra a nota.
