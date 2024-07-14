import create from 'zustand';

interface FormState {
  fullName: string;
  email: string;
  yearsOfExperience: number;
  skills: string[];
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setYearsOfExperience: (years: number) => void;
  setSkills: (skills: string[]) => void;
}

export const useFormStore = create<FormState>((set) => ({
  fullName: '',
  email: '',
  yearsOfExperience: 0,
  skills: [],
  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setYearsOfExperience: (yearsOfExperience) => set({ yearsOfExperience }),
  setSkills: (skills) => set({ skills }),
}));
