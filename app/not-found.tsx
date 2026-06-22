import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pageHero">
      <div className="shell notFound">
        <h1>Page not found</h1>
        <p>This page may have moved, or it has not been published yet.</p>
        <Link className="primaryButton" href="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
