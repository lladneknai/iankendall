import useSWR from "swr";
import type { ProjectsListResponse, ProjectResponse } from "@shared";
import type { ProjectFilters } from "@/store/projectStore";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("Failed to fetch");
    (error as any).status = response.status;
    throw error;
  }
  return response.json();
};

/**
 * Build query string from filters
 */
function buildQueryString(filters: ProjectFilters): string {
  const params = new URLSearchParams();

  if (filters.companies.length > 0) {
    params.append("company", filters.companies.join(","));
  }

  if (filters.tech.length > 0) {
    params.append("tech", filters.tech.join(","));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Fetch list of projects (limited fields)
 * Cached per filter combination via SWR
 */
export function useProjectsList(filters: ProjectFilters) {
  const queryString = buildQueryString(filters);
  const url = `/api/projects${queryString}`;

  const { data, error, isLoading, mutate } = useSWR<ProjectsListResponse>(
    url, // SWR key changes when filters change, triggering refetch
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    projects: data?.projects || [],
    count: data?.count || 0,
    isLoading,
    error,
    refetch: mutate,
  };
}

/**
 * Fetch single project by key (full details)
 * Cached per project key
 */
export function useProject(key: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<ProjectResponse>(
    key ? `/api/projects/${key}` : null, // null = don't fetch
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    project: data?.project || null,
    isLoading,
    error,
    refetch: mutate,
  };
}
