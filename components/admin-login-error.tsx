"use client";

import { useSearchParams } from "next/navigation";

export function AdminLoginError() {
  const searchParams = useSearchParams();

  if (searchParams.get("loggedOut")) {
    return (
      <p className="adminMessage success">
        You have been signed out of the admin dashboard.
      </p>
    );
  }

  if (searchParams.get("error")) {
    return (
      <p className="adminMessage">
        That account could not be verified for admin access.
      </p>
    );
  }

  return null;
}
