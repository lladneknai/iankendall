import { useMemo } from "react";
import { ProjectEditorProps } from "@shared";
import useProjectEditor from "@hooks/useProjectEditor";
import LoadingBar from "@components/LoadingBar";
import Tech from "@components/ContentEditor/Tech";
import Links from "@components/ContentEditor/Links";
import Actions from "@components/ContentEditor/Actions";
import Company from "@components/ContentEditor/Company";
import WysiWyg from "@components/ContentEditor/WysiWyg";
import Checkbox from "@components/ContentEditor/Checkbox";
import FileInput from "@components/ContentEditor/FileInput";
import TextField from "@components/ContentEditor/TextField";

/**
 * PROJECT EDITOR
 * --------------
 * - Admin-only feature to edit projects within the app
 * - Allows for quick, hassle-free maintenance of page content
 * - Only shown when actively editing
 * - Uses AMPT NOSQL storage for project records and iamges
 */
const ProjectEditor = ({
  onSave,
  project,
  setIsEditing,
}: ProjectEditorProps) => {
  const {
    methods: { handleImageUpload, handleSave, updateField },
    refs: { fileInputRef, quillRef },
    state: { data, isSaving, isUploading },
  } = useProjectEditor({ project, onSave });

  // Preserve the original name so it doesn't update in real time.
  const staticName = useMemo(() => data.name, []);

  // Render the form
  return (
    <div id="ContentEditor">
      <div className="header">
        <h3>Edit {staticName}</h3>
        <Actions
          handleSave={handleSave}
          setIsEditing={setIsEditing}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      </div>
      <LoadingBar isLoading={isUploading || isSaving} />
      <div className="body">
        {/* 
          BASIC TEXT EDITORS
          Assign a key and syntactic name for this project.
        */}
        <Checkbox data={data} name="active" updateField={updateField} />
        <TextField data={data} name="name" updateField={updateField} />
        <TextField data={data} name="key" updateField={updateField} />
        {/* 
          WYSIWYG EDITOR
          Write HTML for project content.
          This may include images handled by the hidden FileInput.
        */}
        <WysiWyg
          editorRef={quillRef}
          fileInputRef={fileInputRef}
          label="Content"
          name="content"
          updateField={updateField}
          value={data.content}
        />
        <FileInput
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />
        {/* 
          SPECIAL FORMAT EDITORS
          Set the company, tech, and links fields for this Project.
          These have hardcoded attributes, so there are guardrails on the values.
        */}
        <Company data={data} updateField={updateField} />
        <Tech data={data} updateField={updateField} />
        <Links data={data} updateField={updateField} />
        <Actions
          handleSave={handleSave}
          setIsEditing={setIsEditing}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
};

export default ProjectEditor;
