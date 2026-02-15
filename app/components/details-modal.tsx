export const DetailsModal = ({
    pokemon,
    pokemonLoading,
    showModal,
    setShowModal,
}: {
    pokemon: any;
    pokemonLoading: boolean;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Pokemon Detaljer</h2>
                <p>Her kan du vise detaljer om den valgte Pokemon.</p>
                <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Luk
                </button>
            </div>
        </div>
    );
};
