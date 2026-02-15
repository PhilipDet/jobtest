"use server";

export const getPokemon = async (url: string) => {
    try {
        const response = await fetch(url).then((res) => res.json());

        if (!response) {
            throw new Error("Pokemonen blev ikke fundet");
        }

        return {
            id: response.id,
            height: response.height / 10,
            weight: response.weight / 10,
            name: response.name,
            image: response.sprites.other["official-artwork"].front_default,
            types: response.types.map((t: { type: { name: string } }) => {
                return t.type.name;
            }),
            moves: response.moves.map(
                (m: { move: { name: string; url: string } }) => {
                    return { name: m.move.name, url: m.move.url };
                },
            ),
        };
    } catch (error) {
        throw error;
    }
};
