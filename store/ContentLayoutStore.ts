import { create } from "zustand";

interface contextLayoutStore {
    title: string;
    setTitle: (val: string) => void;
}

const useContentLayoutStore = create<contextLayoutStore>()((set) => ({
    title: "",
    setTitle: (val) => set(() => ({ title: val })),
}));

export default useContentLayoutStore;
