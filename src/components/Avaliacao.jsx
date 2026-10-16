import estrela from "../assets/icon-star.svg";
import Grade from "./Grade";

const Avaliacao = ({ nota, setNota, aoEnviar }) => {
    const estiloNota = (valor) =>
        `h-11 w-11 cursor-pointer rounded-full text-sm font-bold transition-colors ${
            nota === valor
                ? "bg-orange-500 text-slate-950"
                : "bg-slate-700/60 text-slate-400 hover:bg-orange-100 hover:text-slate-950"
        }`;

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

            <Grade colunas={5}>
                <button onClick={() => setNota(1)} className={estiloNota(1)}>1</button>
                <button onClick={() => setNota(2)} className={estiloNota(2)}>2</button>
                <button onClick={() => setNota(3)} className={estiloNota(3)}>3</button>
                <button onClick={() => setNota(4)} className={estiloNota(4)}>4</button>
                <button onClick={() => setNota(5)} className={estiloNota(5)}>5</button>
            </Grade>

            <button
                type="button"
                onClick={aoEnviar}
                disabled={nota === null}
                className="mt-6 w-full cursor-pointer rounded-full bg-orange-500 py-3 text-sm font-bold uppercase tracking-widest text-slate-950 transition-colors hover:bg-white disabled:opacity-50 disabled:hover:bg-orange-500"
            >
                Enviar
            </button>
        </section>
    );
};

export default Avaliacao;
