"use client";

import Image from "next/image";
import { usePokemons } from "./hooks/usePokemons";
import { TypeIcon } from "./components/typeIcon";
import Link from "next/link";

export const HomePage = () => {
    const { pokemons, loading, error, errorMessage, fetchMore, hasMore }: any =
        usePokemons("https://pokeapi.co/api/v2/pokemon?limit=20");

    return (
        <>
            <main>
                <h1 className="text-4xl font-bold">Pokemon Liste</h1>

                {!error ? (
                    <>
                        <ul className="flex flex-col gap-8">
                            {pokemons.map(
                                (pokemon: {
                                    id: number;
                                    name: string;
                                    image: string;
                                    types: string[];
                                    height: number;
                                    weight: number;
                                }) => (
                                    <li
                                        key={pokemon.id}
                                        className="flex items-center justify-between gap-4 bg-card-background p-4 rounded-lg shadow-md"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={pokemon.image}
                                                alt={`Image of ${pokemon.name}`}
                                                width={60}
                                                height={60}
                                            />
                                            <h2 className="text-lg font-semibold capitalize">
                                                {pokemon.name}
                                            </h2>
                                        </div>
                                        <span>ID: {pokemon.id}</span>
                                        <span>
                                            Type:{" "}
                                            {pokemon.types.map(
                                                (type: string) => (
                                                    <TypeIcon
                                                        key={type}
                                                        type={type}
                                                    />
                                                ),
                                            )}
                                        </span>
                                        <span>Højde: {pokemon.height}m</span>
                                        <span>Vægt: {pokemon.weight}kg</span>
                                        <Link
                                            href={`/pokemon/${pokemon.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer-cursor"
                                        >
                                            Detaljer
                                        </Link>
                                    </li>
                                ),
                            )}
                        </ul>
                    </>
                ) : (
                    error && <p>Fejl: {errorMessage}</p>
                )}

                {loading ? (
                    <p className="text-center text-lg">Henter Pokemons...</p>
                ) : (
                    hasMore && (
                        <button
                            onClick={fetchMore}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Indlæs flere
                        </button>
                    )
                )}
            </main>
        </>
    );
};

export default HomePage;
