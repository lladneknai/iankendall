import type { About } from "@shared";
import { useEffect, useState } from "react";

export default function useAbout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Fetch the single About record
  const fetchAbout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/about");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: About = await response.json();
      setContent(data.content || "<h1>No content yet</h1>");
      setDescription(data.description || "");
      setHeadline(data.headline || "About Me");

      setError(null);
    } catch (err) {
      console.error("Error fetching about:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch data after save
  const handleSave = async () => {
    await fetchAbout();
    setIsEditing(false);
  };

  // Only show ContentEditor (and Edit button) in dev
  const isDev = import.meta.env.MODE === "development";

  useEffect(() => {
    fetchAbout();
  }, []);

  return {
    methods: {
      handleSave,
      setIsEditing,
    },
    state: {
      content,
      description,
      error,
      headline,
      isDev,
      isEditing,
      isLoading,
    },
  };
}
