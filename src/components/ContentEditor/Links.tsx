import { ProjectDataProps } from "@shared";

/**
 * CONTENT EDITOR | add/edit/remove project links
 */
export default function Links({ updateField, data }: ProjectDataProps) {
  return (
    <div className="col">
      <div className="row gap-1">
        <h4>Links</h4>
        <button
          className="btn sm add"
          onClick={() => {
            const newLinks = [...data.links];
            newLinks.push({ url: "", title: "" });
            updateField("links", newLinks);
          }}
        >
          +
        </button>
      </div>
      {data.links.map((link, i) => (
        <div key={`link_${i}`} className="row gap-1">
          <div className="col">
            <h6>Text</h6>
            <input
              onChange={(e) => {
                const newLinks = [...data.links];
                newLinks[i] = { ...newLinks[i], title: e.target.value };
                updateField("links", newLinks);
              }}
              type="text"
              value={link.title}
            />
          </div>
          <div className="col">
            <h6>URL</h6>
            <input
              onChange={(e) => {
                const newLinks = [...data.links];
                newLinks[i] = { ...newLinks[i], url: e.target.value };
                updateField("links", newLinks);
              }}
              type="text"
              value={link.url}
            />
          </div>
          <button
            className="btn sm"
            style={{ marginTop: "34px" }}
            onClick={() => {
              const newLinks = [...data.links];
              newLinks.splice(i, 1);
              updateField("links", newLinks);
            }}
          >
            x
          </button>
          <h4 />
        </div>
      ))}
      <h4 />
    </div>
  );
}
