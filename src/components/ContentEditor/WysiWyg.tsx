import { WysiWygProps } from "@shared";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Register custom divider blot (renders as <div class="divider">)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlockEmbed = Quill.import("blots/block/embed") as any;
class DividerBlot extends BlockEmbed {
  static blotName = "divider";
  static tagName = "div";
  static className = "divider";
}
Quill.register(DividerBlot, true);

/**
 * CONTENT EDITOR | WYSIWYG content editor | write HTML as text
 *
 * - If this is your first time seeing this acronym, congratulations!
 * - It stands for: "What You See Is What You Get", meaning you're writing HTML.
 * - I used CMS tools like this all the time at FoxFuel Creative, and have loved them ever since.
 */
export default function WysiWyg({
  editorRef,
  fileInputRef,
  label,
  name,
  setCurrentEditor,
  updateField,
  value,
}: WysiWygProps) {
  return (
    <div className="col">
      <h4>{label}</h4>
      <div className="editor-container">
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={(val) => updateField(name, val)}
          onFocus={() => setCurrentEditor(name)}
          modules={{
            toolbar: {
              container: [
                [{ header: [3, 4, 5, 6, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image", "divider"],
                // ["clean"], // wot u do
              ],
              handlers: {
                image: () => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                },
                divider: function (this: { quill: ReturnType<ReactQuill["getEditor"]> }) {
                  const quill = this.quill;
                  if (!quill) return;
                  const range = quill.getSelection(true);
                  quill.insertEmbed(range.index, "divider", true, "user");
                  quill.setSelection(range.index + 1);
                },
              },
            },
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "align",
            "link",
            "image",
            "divider",
          ]}
        />
      </div>
    </div>
  );
}
