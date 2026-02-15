"use client";

import Image from "next/image";
import { usePokemons } from "./hooks/usePokemons";
import { TypeIcon } from "./components/typeIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import { fromLeft, fromRight, fromTop } from "./lib/animations";

export const HomePage = () => {
    const { pokemons, loading, error, errorMessage, fetchMore, hasMore }: any =
        usePokemons("https://pokeapi.co/api/v2/pokemon?limit=20");

    return (
        <>
            <main>
                <motion.h1
                    className="text-3xl font-bold flex items-center bg-background py-2 px-4 rounded-lg"
                    variants={fromLeft}
                    initial="hidden"
                    whileInView="show"
                >
                    Pokemon Liste
                </motion.h1>

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
                                    <motion.li
                                        key={`pokemon-${pokemon.id}`}
                                        className="flex items-center justify-between gap-4 bg-card-background p-4 rounded-lg shadow-md"
                                        variants={fromTop}
                                        initial="hidden"
                                        whileInView="show"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={pokemon.image}
                                                alt={`Image of ${pokemon.name}`}
                                                width={60}
                                                height={60}
                                                loading="lazy"
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
                                        <span className="max-md:hidden">
                                            Højde: {pokemon.height}m
                                        </span>
                                        <span className="max-md:hidden">
                                            Vægt: {pokemon.weight}kg
                                        </span>
                                        <Link
                                            href={`/${pokemon.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                        >
                                            Detaljer
                                        </Link>
                                    </motion.li>
                                ),
                            )}
                        </ul>
                    </>
                ) : (
                    error && <p>Fejl: {errorMessage}</p>
                )}

                <motion.button
                    onClick={fetchMore}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    variants={fromRight}
                    initial="hidden"
                    whileInView="show"
                    disabled={loading || !hasMore}
                >
                    {loading ? "Indlæser..." : "Indlæs flere"}
                </motion.button>
            </main>
        </>
    );
};

export default HomePage;
