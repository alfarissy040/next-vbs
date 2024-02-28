export const baseFormVariant = (navDirection: TNavDirection) => (
    {
        initial: navDirection === "initial" ?
            { translateY: 1000, opacity: 0, zIndex: 0 } :
            navDirection === "in" ?
                { translateX: 1000, opacity: 0, zIndex: 0 } :
                { translateX: -1000, opacity: 0, zIndex: 0 },
        show: navDirection === "initial" ?
            { translateY: 0, opacity: 100, zIndex: 1 } :
            { translateX: 0, opacity: 100, zIndex: 1 },
        hide: navDirection === "in" ?
            { translateX: -1000, opacity: 0, zIndex: 0 } :
            { translateX: 1000, opacity: 0, zIndex: 0 }
    }
)