import { useState } from "react";
import Avaliacao from "./components/Avaliacao";
import Verificacao from "./components/Verificacao";

const App = () => {
    const [nota, setNota] = useState(null);
    const [enviado, setEnviado] = useState(false);

    function enviar() {
        if (nota !== null) setEnviado(true);
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
            {enviado ? (
                <Verificacao nota={nota} />
            ) : (
                <Avaliacao nota={nota} setNota={setNota} aoEnviar={enviar} />
            )}
        </main>
    );
};

export default App;
