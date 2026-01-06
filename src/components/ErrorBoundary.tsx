import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

/**
 * ERROR BOUNDARY
 * --------------
 * - Renders instead of crashing the app
 * - TODO: make the 404 a bit more fun, eh?
 */
export default function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorData = {
    status: "Error",
    statusText: "Unknown error",
    data: "",
  };
  if (isRouteErrorResponse(error)) {
    errorData = {
      status: error.status.toString(),
      statusText: error.statusText,
      data: error.data,
    };
  } else if (error instanceof Error) {
    errorData.statusText = error.message;
    errorData.data = error.stack || "unknown";
  }

  const goHome = () => {
    navigate("/");
  };

  return (
    <div id="Code" className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>{errorData.status}</h1>
          <h6>In other words, that's an error.</h6>
        </div>
      </div>
      <div className="content">
        <pre style={{ padding: "2rem", color: "papayawhip" }}>
          {errorData.data}
        </pre>
        <button className="btn" onClick={goHome}>
          Go Home
        </button>
      </div>
    </div>
  );
}
