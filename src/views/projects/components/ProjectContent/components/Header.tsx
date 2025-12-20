import { ProjectHeaderProps } from "@shared";

export default function Header({
  isEditing,
  name,
  setIsEditing,
}: ProjectHeaderProps) {
  // Only show edit button in dev environment
  const isDev = import.meta.env.MODE === "development";

  return (
    <div className="header">
      <h3>{name}</h3>
      {!isEditing && isDev && (
        <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
          📝 Edit Project
        </button>
      )}
    </div>
  );
}
