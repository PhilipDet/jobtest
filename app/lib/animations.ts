export const fromTop = {
    hidden: {
        opacity: 0,
        y: -24,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export const fromLeft = {
    hidden: {
        opacity: 0,
        x: -24,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export const fromRight = {
    hidden: {
        opacity: 0,
        x: 24,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};
