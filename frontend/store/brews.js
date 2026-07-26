import { create } from "zustand";

export const useBrewStore = create((set, get) => ({
  brews: [],

  setBrews: (brews) => set({ brews }),

  fetchBrews: async () => {
    try {
      const res = await fetch("/api/brews");
      const data = await res.json();
      set({ brews: data });
    } catch (err) {
      console.error("Failed to fetch brews:", err);
    }
  },

  createBrew: async (brewData) => {
    if (!brewData.beans ||!brewData.method ||!brewData.coffeeGrams ||!brewData.waterGrams ||!brewData.rating ||!brewData.toastingNotes
    ) {
      throw new Error("All fields are required");
    }
    const res = await fetch("/api/brews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brewData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create brew");
    }
    set((state) => ({
      brews: [...state.brews, data],
    }));
    return data;
  },

  
  updateBrew: async (id, updatedData) => {
    try {
      const res = await fetch(`/api/brews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update brew");
      }
      set({
        brews: get().brews.map((brew) =>
          brew._id === id ? data : brew
        ),
      });

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },



  deleteBrew: async (id) => {
    try {
      const res = await fetch(`/api/brews/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete brew");
      }
      set({
        brews: get().brews.filter((brew) => brew._id !== id),
      });
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));