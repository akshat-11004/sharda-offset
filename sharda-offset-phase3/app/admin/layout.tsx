// import { requireOwner } from '@/lib/auth/require-owner';

// export default async function AdminLayout({ children }: { children: React.ReactNode }) {
//   const user = await requireOwner();
//   return (
//     <div className="min-h-screen bg-[#f6f1e9] text-[#292522]">
//       <header className="border-b border-black/10 bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
//           <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a2b]">Sharda Offset</p><p className="font-semibold">Owner Dashboard</p></div>
//           <div className="text-right text-sm"><p>{user.name || user.email}</p><form action="/api/auth/logout" method="post"><button className="text-[#7a1f2b]">Logout</button></form></div>
//         </div>
//       </header>
//       <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
//     </div>
//   );
// }
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
