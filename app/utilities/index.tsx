"use client"

import { useRouter } from "next/navigation";

/**
 * Custom hook to navigate to a destination with prefetching.
 *
 * @returns {Function} - A function that takes a destination string and navigates to it.
 */
export const usePrefetchNavigate = () => {
    
    // Get the Next.js Router instance.
    const route = useRouter();

    /**
     * Navigate to a destination.
     *
     * @param {string} dest - The destination URL to navigate to.
     */
    const navigateTo = (dest: string) => {
        // Prefetch the destination.
        route.prefetch(dest);
        // Navigate to the destination.
        route.push(dest);
    };

    // Return the navigateTo function.
    return navigateTo;
};

/**
 * Flattens the query parameters object into a string and replaces the browser's
 * current URL with the flattened parameters.
 *
 * @param {Record<string, any>} params - The query parameters to flatten.
 * @return {string} The flattened query parameters.
 */
export const flatQueryParams = (params: Record<string, any>) => {
    // Flatten the query parameters object into a string.
    const result = Object.entries(params)
        // For each key-value pair in the params object,
        // if the value is not an empty string,
        // map it to the string representation of the key and value joined with '='.
        // Otherwise, map to an empty array.
        .flatMap(([key, value]) => (value !== "" ? `${key}=${value}` : []))
        // Join all the flattened key-value pairs with '&'.
        .join("&");

    // Replace the browser's current URL with the flattened parameters.
    window.history.replaceState(null, "", `?${result}`);

    // Return the flattened query parameters.
    return result;
};