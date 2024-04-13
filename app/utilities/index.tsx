import { useRouter } from "next/navigation";

export const usePrefetchNavigate = () => {
    const route = useRouter();
    const navigateTo = (dest: string) => {
        route.prefetch(dest);
        route.push(dest);
    };
    return navigateTo;
};
