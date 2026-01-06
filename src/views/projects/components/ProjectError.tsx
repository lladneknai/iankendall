export default function ProjectError({ error }: any) {
  return (
    <>
      <h3>Error Loading Projects</h3>
      <p>Encountered an issue loading projects. Please try again.</p>
      <pre>{error}</pre>
    </>
  );
}
