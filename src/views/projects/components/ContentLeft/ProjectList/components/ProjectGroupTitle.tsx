export default function ProjectGroupTitle({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <div className="col">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}
