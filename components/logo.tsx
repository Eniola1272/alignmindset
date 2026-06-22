import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Align Mindset home">
      <span className="logoMark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span>
        <strong>Align Mindset</strong>
        <small>Initiative</small>
      </span>
    </Link>
  );
}
