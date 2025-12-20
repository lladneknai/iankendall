import CodeBrowser from "@components/CodeBrowser";

/**
 * CODE ROUTE
 * ----------
 * - Fullpage viewer for source code
 * - Alternative to the CodeWindow component
 */
export default function Code() {
  return (
    <div id="Code" className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Code</h1>
          <h6>Browse the source code that powers this site.</h6>
        </div>
      </div>

      <div className={`page-content`}>
        <CodeBrowser isWindow={false} />
      </div>
    </div>
  );
}
