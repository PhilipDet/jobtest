import { getPokemons } from "../services/pokemons";
import { useEffect, useState } from "react";

export const usePokemons = (url: string) => {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState<string | null>(url);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchPokemons = async () => {
        if (!nextUrl) return;

        setLoading(true);
        try {
            const response = await getPokemons(nextUrl);

            if (!response) {
                throw new Error("Ingen pokemons fundet");
            }

            setPokemons((prev) => [...prev, ...response.pokemons]);
            setNextUrl(response.next);
        } catch (error) {
            setError(true);
            setErrorMessage((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return {
        pokemons,
        loading,
        error,
        errorMessage,
        fetchMore: fetchPokemons,
        hasMore: nextUrl !== null,
    };
};
