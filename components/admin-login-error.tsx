"use client";

import { useSearchParams } from "next/navigation";

export function AdminLoginError() {
  const searchParams = useSearchParams();

  if (!searchParams.get("error")) {
    return null;
  }

  return (
    <p className="adminMessage">
      That account could not be verified for admin access.
    </p>
  );
}
