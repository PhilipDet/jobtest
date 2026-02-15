import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokemon";

export const usePokemon = (url: string) => {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errormessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);

            try {
                const response = await getPokemon(url);

                if (!response) {
                    throw new Error("Pokemonen blev ikke fundet");
                }

                setPokemon(response);
            } catch (error) {
                setError(true);
                setErrorMessage((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    return { pokemon, loading, error, errormessage };
};
