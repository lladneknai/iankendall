import { ActionsProps } from "@shared";

/**
 * CONTENT EDITOR | action buttons (save or cancel)
 */
export default function Actions({
  handleSave,
  isSaving,
  isUploading,
  setIsEditing,
}: ActionsProps) {
  return (
    <div className="col gap-1">
      <div className="row gap-1">
        <button
          onClick={handleSave}
          className="btn btn-upload"
          disabled={isSaving || isUploading}
        >
          {isSaving ? <>💾 Saving...</> : <>💾 Save Content</>}
        </button>
        <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}
