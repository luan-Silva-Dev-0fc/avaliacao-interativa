const Grade = ({ colunas = 1, children }) => {
    return (
        <div
            style={{ gridTemplateColumns: `repeat(${colunas}, 1fr)` }}
            className="mt-6 grid justify-items-center gap-2"
        >
            {children}
        </div>
    );
};

export default Grade;
