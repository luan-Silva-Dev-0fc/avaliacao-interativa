import ilustracao from "../assets/illustration-thank-you.svg";

const Verificacao = ({ nota }) => {
    return (
        <section
            aria-live="polite"
            className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-linear-to-b from-slate-800 to-slate-900 p-6 text-center shadow-2xl"
        >
            <img src={ilustracao} alt="" className="h-24 w-auto" />

            <p className="mt-6 rounded-full bg-slate-700/60 px-4 py-1 text-sm text-orange-500">
                Você selecionou {nota} de 5
            </p>

            <h1 className="mt-6 text-2xl font-bold text-white">Obrigado!</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Agradecemos por dedicar um tempo para nos avaliar. Se precisar de mais
                suporte, não hesite em entrar em contato!
            </p>
        </section>
    );
};

export default Verificacao;
