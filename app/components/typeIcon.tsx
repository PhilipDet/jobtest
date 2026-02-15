const types = {
    normal: "⚪",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌱",
    ice: "❄️",
    fighting: "👊",
    poison: "☠️",
    ground: "🌍",
    flying: "🦅",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    fairy: "🧚",
};

export const TypeIcon = ({ type }: { type: string }) => {
    const icon = types[type as keyof typeof types] || "⚪";

    return <span>{icon}</span>;
};
