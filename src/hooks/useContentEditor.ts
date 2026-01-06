import { useState, useRef } from "react";
import { About, UseContentEditorProps } from "@shared";
import ReactQuill from "react-quill-new";

/**
 * USE CONTENT EDITOR | logic for AboutContentEditor
 *
 * TODO: currently dead code - see @useProjectEditor instead
 *
 * - Handles CRUD ops for the CMS
 * - WYSIWYG editors use react-quill lib to write HTML
 * - Image uploaders use hidden inputs, activated via WYSIWYG toolbar
 */
export default function useContentEditor({
  inData,
  onSave,
}: UseContentEditorProps) {
  const [data, setData] = useState<About>(inData);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const quillRef = useRef<ReactQuill>(null);
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
      const response = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      // alert('Project saved successfully!');
      console.log("SAVED ABOUT CONTENT.");
      onSave();
    } catch (error) {
      console.error("Error saving project:", error);
      // alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key: keyof About, value: About[keyof About]) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Return vars organized by type
  return {
    methods: { handleImageUpload, handleSave, updateField },
    refs: { quillRef, fileInputRef },
    state: { data, isSaving, isUploading },
  };
}
