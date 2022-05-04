/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

type SubmittedStoreType = {
  submitted: boolean;
  setSubmitted: (value) => void;
  value: {
    name: string;
    cg: string;
    text: string;
  } | null;
};

export const useSubmitted = create<SubmittedStoreType>(
  persist(
    (set, get) => ({
      submitted: false,
      value: null,
      setSubmitted: (value: SubmittedStoreType['value']) => set({ submitted: true, value: value }),
    }),
    { name: 'yw-mothers-day' }
  )
);
