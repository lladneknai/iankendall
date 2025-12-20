import { FileInputProps } from "@shared";

/**
 * CONTENT EDITOR | hidden input that accepts images uploaded through Quill WYSIWYG editors.
 */
export default function FileInput({
  fileInputRef,
  handleImageUpload,
}: FileInputProps) {
  return (
    <input
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageUpload}
      style={{ display: "none" }}
      type="file"
    />
  );
}
