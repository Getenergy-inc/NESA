import { create } from "zustand";
import { UserStore } from "../types/store";

export const useStore = create<UserStore>((set) => ({ user: null }));
