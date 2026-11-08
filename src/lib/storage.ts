import { createJSONStorage, type StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

function safe(getStore: () => Storage): StateStorage {
  return {
    getItem: (name) => {
      try {
        return getStore().getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      try {
        getStore().setItem(name, value);
      } catch {
        /* storage full or blocked — fail quietly */
      }
    },
    removeItem: (name) => {
      try {
        getStore().removeItem(name);
      } catch {
        /* ignore */
      }
    },
  };
}

/** localStorage-backed JSON storage that is safe on the server. */
export const localJSONStorage = createJSONStorage(() =>
  typeof window === "undefined" ? noopStorage : safe(() => window.localStorage),
);

/** sessionStorage-backed JSON storage that is safe on the server. */
export const sessionJSONStorage = createJSONStorage(() =>
  typeof window === "undefined"
    ? noopStorage
    : safe(() => window.sessionStorage),
);
