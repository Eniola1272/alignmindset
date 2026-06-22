import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Align Mindset home">
      <span className="logoImageWrap" aria-hidden="true">
        <img src="/brand/align-mindset-logo.png" alt="" />
      </span>
      <span>
        <strong>Initiative</strong>
        <small>Growth community</small>
      </span>
    </Link>
  );
}
