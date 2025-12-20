import Actions from "@components/ContentEditor/Actions";
import WysiWyg from "@components/ContentEditor/WysiWyg";
import FileInput from "@components/ContentEditor/FileInput";
import TextField from "@components/ContentEditor/TextField";
import useContentEditor from "@hooks/useContentEditor";
import { ContentEditorProps } from "@shared";

const ContentEditor = ({ inData, onSave, setIsEditing }: ContentEditorProps) => {
  const {
    methods: { handleImageUpload, handleSave, setCurrentEditor, updateField },
    refs: { fileInputRef, contentQuillRef },
    state: { data, isSaving, isUploading },
  } = useContentEditor({ inData, onSave });

  // Render the form
  return (
    <div id="ContentEditor">
      <div className="header">
        <h3>Edit About Content</h3>
        <Actions
          handleSave={handleSave}
          setIsEditing={setIsEditing}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      </div>
      <div className="col gap-2">
        {/* 
          BASIC TEXT EDITORS
          Assign a key and syntactic name for this project.
        */}
        <TextField data={data} name="headline" updateField={updateField} />
        <TextField data={data} name="description" updateField={updateField} />

        {/* 
          WYSIWYG EDITORS
          Write HTML for description and content.
          This may include images handled by the hidden FileInput.
        */}
        <WysiWyg
          editorRef={contentQuillRef}
          fileInputRef={fileInputRef}
          label="Content"
          name="content"
          setCurrentEditor={setCurrentEditor}
          updateField={updateField}
          value={data.content}
        />
        <FileInput
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />

        {/* <Links data={data} updateField={updateField} /> */}

        {/* 
          ACTIONS
          Save or cancel the current edit operation.
        */}
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

export default ContentEditor;
