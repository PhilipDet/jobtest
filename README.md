# JobTest "Improving" fra Philip

<hr>

## How to run

**Køre:**

```
npm install
```

**Den installer alle node_modules.**

<br>

**Derefter kan du køre:**

```
npm run dev
```

**For at starte en dev server lokalt.**

<hr>

## Valg af teknologi

Jeg har valgt at bruge NextJs som framework skrevet i TypeScript, fordi jeg føler mig komfortabel i det. Men det har også det gode ved sig at man kan kalde API'en i serveren så det ikke belaster brugerens system.

Til styling er jeg gået med Tailwind, fordi det simplet, nemt og hurtigt at skrive. Og helt klart mit først valg, når jeg starter et nyt projekt.

<hr>

## Forbedringer

**Jeg har brugt ca 3 timer på opgaven, med en lille pause.**

Hvis jeg havde mere tid vil jeg ligge det i bonus opgaverne. Så som at kigge på sorteringsmuligheder fx sortering efter type Pokemon. Måske også lynhurtigt lave en theme switch knap (Den kører efter dit systems theme lige nu). Det vil også være spændende og ligge noget tid i at lave en favoritter funktion og liste der til.

<hr>

## Udfordringer

Den største udfordring har været da jeg skulle hente alle pokemons og lave et kald for hver pokemon, så jeg kunne få mere data med, som billede, type højde og vægt. Fordi jeg gerne ville genbrug min getPokemon() funktion.

```
/* app/services/pokemons.ts */

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
```
