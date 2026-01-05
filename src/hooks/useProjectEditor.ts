import { Project } from "@shared";
import { useState, useRef, useEffect } from "react";

/**
 * USE PROJECT EDITOR | logic for ProjectEditor
 *
 * - Handles CRUD ops for the CMS
 * - WYSIWYG editors use react-quill lib to write HTML
 * - Image uploaders use hidden inputs, activated via WYSIWYG toolbar
 */

export default function useProjectEditor({
  project,
  onSave,
}: {
  project: Project;
  onSave: () => void;
}) {
  // Local state
  const [data, setData] = useState(project);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // WYSIWYG / File Upload refs
  const quillRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the hidden file inputs to upload images
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Insert image into the current Quill editor
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", data.url, "user");
        quill.setSelection(range.index + 1);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Save the project content.
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      // alert('Project saved successfully!');
      console.log("SAVED:", data.name);
      onSave();
    } catch (error) {
      console.error("Error saving project:", error);
      // alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key: keyof Project, value: Project[keyof Project]) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Re-hydrate form data when selecting a new project
  useEffect(() => {
    setData(project);
  }, [project]);

  // Return vars organized by type
  return {
    methods: { handleImageUpload, handleSave, updateField },
    refs: { quillRef, fileInputRef },
    state: { data, isSaving, isUploading },
  };
}
