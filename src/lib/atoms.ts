import { atom } from 'jotai';
import type { IUser, IAppState } from "@/lib/types";

export const userAtom = atom<IUser | null>(null);
export const appStateAtom = atom<IAppState | null>(null);