type ProgramCardProps = {
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
};

export function ProgramCard({
  title,
  eyebrow,
  description,
  accent
}: ProgramCardProps) {
  return (
    <article className={`programCard accent-${accent}`}>
      <span>{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
