"use client";

import { TypeIcon } from "@/app/components/typeIcon";
import { usePokemon } from "@/app/hooks/usePokemon";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const PokemonPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { pokemon, loading, error, errormessage }: any = usePokemon(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    console.log(pokemon);

    return (
        <main>
            <Link
                href="/"
                className="flex items-center bg-background py-2 px-4 rounded-lg"
            >
                <ArrowLeft /> Tilbage
            </Link>

            {!loading && !error ? (
                <>
                    <section className="w-full bg-card-background rounded-lg grid grid-cols-2 items-center justify-center gap-4">
                        <Image
                            src={pokemon.image}
                            alt={`Image of ${pokemon.name}`}
                            width={600}
                            height={600}
                            className="w-full"
                        />

                        <article className="flex justify-center">
                            <div className="flex flex-col gap-2 max-w-75 w-full text-lg">
                                <h1 className="capitalize text-4xl font-bold text-center">
                                    {pokemon.name}
                                </h1>
                                <ul className="flex flex-col gap-2 list-disc pl-4">
                                    <li>ID: {pokemon.id}</li>
                                    <li>Højde: {pokemon.height}</li>
                                    <li>Vægt: {pokemon.weight}</li>
                                    <li>Typer:</li>
                                    <ul>
                                        {pokemon.types.map((type: string) => (
                                            <li
                                                key={type}
                                                className="capitalize pl-4"
                                            >
                                                <TypeIcon type={type} /> -{" "}
                                                {type}
                                            </li>
                                        ))}
                                    </ul>
                                </ul>
                            </div>
                        </article>
                    </section>
                    <div className="w-full flex flex-col gap-2 bg-card-background p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl">Angrab</h2>

                        <ul className="flex flex-wrap gap-2">
                            {pokemon.moves.map((move: any) => (
                                <li key={move.name}>
                                    <Link
                                        href={move.url}
                                        target="_blank"
                                        className="inline-block capitalize p-2 bg-muted-background rounded-md hover:bg-muted-hover cursor-pointer"
                                    >
                                        {move.name.replace(/-/g, " ")}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : error ? (
                <p className="text-red-500">Fejl: {errormessage}</p>
            ) : (
                <p>Indlæser...</p>
            )}
        </main>
    );
};

export default PokemonPage;
