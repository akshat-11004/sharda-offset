import type { ReactNode } from "react";
import { requireOwner } from "@/lib/auth/require-owner";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireOwner();

  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}