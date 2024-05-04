import { useCallback } from "react";

/**
 * A custom hook that provides functions for getting the name and color of a
 * Nasabah type based on its type number.
 *
 * @returns An object with two functions: `getTypeName` and `getBadgeColor`.
 */
export const useNasabahType = () => {
    /**
     * Returns the name of a Nasabah type based on its type number.
     *
     * @param {number} tipe - The type number of the Nasabah type.
     * @returns {string | undefined} The name of the Nasabah type if the type number is valid, otherwise undefined.
     */
    const getTypeName = useCallback((tipe: number) => {
        // Define a mapping of type numbers to type names
        const tipeNasabah: Record<number, string> = {
            1: "Perorangan",
            2: "Perusahaan",
            3: "Instansi Pemerintah",
            4: "Lembaga non-profit",
        };
        return tipeNasabah[tipe];
    }, []);

    /**
     * Returns the color of a Nasabah type badge based on its type number.
     *
     * @param {number} tipe - The type number of the Nasabah type.
     * @returns {string | undefined} The color of the Nasabah type badge if the type number is valid, otherwise undefined.
     */
    const getBadgeColor = useCallback((tipe: number) => {
        // Define a mapping of type numbers to color names
        const colors: Record<number, string> = {
            1: "bg-rose-600",
            2: "bg-yellow-600",
            3: "bg-blue-600",
            4: "bg-green-600",
        };
        return colors[tipe];
    }, []);

    // Return the two functions as an object
    return { getTypeName, getBadgeColor };
};

/**
 * Generates a unique noNas based on the type number, creation time, and count.
 *
 * @param {number} tipeNas - The type number of the Nasabah.
 * @param {number} createdAtKantor - The creation time of the Nasabah at the office in Unix timestamp.
 * @param {number} count - The count of the Nasabah.
 * @return {string} The generated noNas.
 */
export const generateNoNas = (tipeNas: number, createdAtKantor: number, count: number): string => {
    // Pad the type number with leading zeros if necessary
    const paddedTipeNas = tipeNas.toString().padStart(2, "0");

    // Pad the creation time at the office with leading zeros if necessary
    const paddedCreatedAtKantor = createdAtKantor.toString().padStart(3, "0");

    // Pad the count with leading zeros if necessary
    const paddedCount = count.toString().padStart(5, "0");

    // Concatenate the padded values to form the noNas
    return `${paddedTipeNas}${paddedCreatedAtKantor}${paddedCount}`;
};
