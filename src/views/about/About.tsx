import useAbout from "@hooks/useAbout";
import LoadingBar from "@components/LoadingBar";
import ContentEditor from "./components/ContentEditor";

/**
 * ABOUT PAGE
 * ----------
 * - A simple page telling YOU about ME
 * - Bio content is managed by a small local CMS
 * - HTMLs are written via a dev-only WSYIWIG and stored in Ampt
 */
export default function About() {
  const {
    methods: { handleSave, setIsEditing },
    state: {
      content,
      description,
      error,
      headline,
      isDev,
      isEditing,
      isLoading,
    },
  } = useAbout();

  return (
    <div id="About" className="page">
      <div id="AboutHero" className="hero">
        <div className="hero-content">
          <h1>About Me</h1>
        </div>
        <LoadingBar isLoading={isLoading} />
      </div>

      <div className="page-content">
        {/* CONTENT EDITOR: admin-only */}
        {isEditing && (
          <ContentEditor
            inData={{ content, description, headline }}
            setIsEditing={setIsEditing}
            onSave={handleSave}
          />
        )}

        {!isEditing && isDev && (
          <div className="edit-btn-container">
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
              📝 Edit Content
            </button>
          </div>
        )}

        {/* Load error */}
        {error && <h1>Error Loading Projects. Try again.</h1>}

        {/* Page content */}
        {!error && (
          <>
            <div
              className="cms-html"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </>
        )}
      </div>
    </div>
  );
}
