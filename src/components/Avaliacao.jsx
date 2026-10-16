import estrela from '../assets/icon-star.svg'

const NOTAS = [1, 2, 3, 4, 5]

function Avaliacao({ nota, aoSelecionar, aoEnviar }) {
  return (
    <section
      aria-labelledby="titulo-avaliacao"
      className="w-full max-w-sm rounded-3xl bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-2xl"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700/60 text-orange-500">
        <img src={estrela} alt="" className="h-4 w-4" />
      </div>

      <h1 id="titulo-avaliacao" className="mt-6 text-2xl font-bold text-white">
        Como Foi Seu Atendimento?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        Conte para nós como foi seu atendimento. Todo feedback é bem-vindo para
        nos ajudar a melhorar nosso serviço!
      </p>

      <div role="radiogroup" aria-label="Nota de 1 a 5" className="mt-6 flex justify-between">
        {NOTAS.map((valor) => {
          const selecionada = nota === valor
          return (
            <button
              key={valor}
              type="button"
              role="radio"
              aria-checked={selecionada}
              onClick={() => aoSelecionar(valor)}
              className={`h-11 w-11 cursor-pointer rounded-full text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                selecionada
                  ? 'bg-orange-500 text-slate-950'
                  : 'bg-slate-700/60 text-slate-400 hover:bg-orange-100 hover:text-slate-950'
              }`}
            >
              {valor}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={aoEnviar}
        disabled={nota === null}
        className="mt-6 w-full cursor-pointer rounded-full bg-orange-500 py-3 text-sm font-bold uppercase tracking-widest text-slate-950 transition-colors hover:bg-white disabled:opacity-50 disabled:hover:bg-orange-500"
      >
        Enviar
      </button>
    </section>
  )
}

export default Avaliacao
