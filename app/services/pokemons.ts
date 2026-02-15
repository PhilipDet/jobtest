"use server";

import { getPokemon } from "./pokemon";

export const getPokemons = async (url: string) => {
    try {
        const response = await fetch(url).then((res) => res.json());

        const pokemons = await Promise.all(
            response.results.map(async (pokemon: { url: string }) => {
                const data = await getPokemon(pokemon.url);
                return { ...pokemon, data };
            }),
        );

        console.log(pokemons[0].data.types);

        return {
            next: response.next,
            pokemons: pokemons.map(
                (pokemon: {
                    id: number;
                    name: string;
                    data: {
                        id: number;
                        image: string;
                        types: string[];
                        height: number;
                        weight: number;
                    };
                }) => ({
                    id: pokemon.data.id,
                    name: pokemon.name,
                    image: pokemon.data.image,
                    types: pokemon.data.types,
                    height: pokemon.data.height,
                    weight: pokemon.data.weight,
                }),
            ),
        };
    } catch (error) {
        throw error;
    }
};
