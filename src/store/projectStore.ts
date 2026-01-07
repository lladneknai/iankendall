import { create } from "zustand";

/**
 * PROJECT STORE
 * -------------
 * Manages project filtering state
 * Filters persist while navigating within /projects/* routes
 */

export interface ProjectFilters {
  company: string;
  tech: string[];
}

interface ProjectState {
  filters: ProjectFilters;
  isWithinProjectsFlow: boolean; // Track if user is within /projects/* routes

  setCompanyFilter: (company: string) => void;
  setTechFilters: (tech: string[]) => void;
  setFilters: (filters: Partial<ProjectFilters>) => void;
  clearFilters: () => void;

  enterProjectsFlow: () => void;
  exitProjectsFlow: () => void;
}

const initialFilters: ProjectFilters = {
  company: "",
  tech: [],
};

export const useProjectStore = create<ProjectState>((set) => ({
  filters: initialFilters,
  isWithinProjectsFlow: false,

  setCompanyFilter: (company: string) =>
    set((state) => ({
      filters: { ...state.filters, company },
    })),

  setTechFilters: (tech: string[]) =>
    set((state) => ({
      filters: { ...state.filters, tech },
    })),

  setFilters: (newFilters: Partial<ProjectFilters>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: initialFilters,
    }),

  enterProjectsFlow: () =>
    set({
      isWithinProjectsFlow: true,
    }),

  exitProjectsFlow: () =>
    set({
      isWithinProjectsFlow: false,
      filters: initialFilters, // Clear filters when exiting
    }),
}));
