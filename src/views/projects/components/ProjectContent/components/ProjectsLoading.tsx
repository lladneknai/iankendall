import LoadingBar from "@/components/LoadingBar";
import Tech from "../../shared/Tech";

export default function ProjectsLoading({ isLoadingList }: any) {
  const FakeProject = () => (
    <div className="project-group--content skeleton">
      <div className="project-card">
        <h3 className="skeleton-text" style={{ width: "60%" }} />
        <p className="skeleton-text" style={{ width: "90%" }} />
        <Tech skipHeader tech={["react", "mui", "js", "ts", "redis", "sql"]} />
      </div>
    </div>
  );

  return (
    <div id="ProjectList" className="content--main loading">
      {isLoadingList ? (
        <>
          <div className="project-group--timeline" />
          <div className="project-group">
            <div
              className="project-group--label skeleton"
              style={{ width: "25%" }}
            >
              <div className="project-group--text">
                <p>&nbsp;</p>
              </div>
            </div>
            <FakeProject />
            <FakeProject />
            <FakeProject />
          </div>
        </>
      ) : (
        //
        <>
          <h3>Loading project info...</h3>
          <LoadingBar isLoading />
        </>
      )}
    </div>
  );
}
