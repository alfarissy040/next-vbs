import { useRouter } from "next/navigation";

export const usePrefetchNavigate = () => {
    const route = useRouter();
    const navigateTo = (dest: string) => {
        route.prefetch(dest);
        route.push(dest);
    };
    return navigateTo;
};

export const getValidationMessage = (error: Record<string, any>) => {
    return Object.entries(error).reduce((acc, [key, value]) => {
        if (key !== "_errors" && typeof value === "object" && "_errors" in value) {
            return {
                ...acc,
                [key]: value._errors.join(", "),
            };
        }
        return acc;
    }, {});
};

export const flatQueryParams = (params: Record<string, any>) => {
    const result = Object.entries(params)
        .flatMap(([key, value]) => (value !== "" ? `${key}=${value}` : []))
        .join("&");
    window.history.replaceState(null, "", `?${result}`);

    return result;
};
