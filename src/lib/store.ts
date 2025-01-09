import { create } from "zustand";

interface State {
  mode: "mdx" | "rte";
}

interface Actions {
  setMode: (mode: State["mode"]) => void;
}

const ClientorStore = create<State & Actions>()((set) => ({
  mode: "rte",
  setMode(mode) {
    set((state) => ({ ...state, mode }));
  },
}));

export default ClientorStore;
