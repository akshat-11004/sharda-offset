"use client";

import Link from "next/link";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

type NavbarProps = {
  businessName: string;
  logoUrl?: string | null;
  whatsapp: string;
  whatsappMessage: string;
  phonePrimary: string;
};

export default function Navbar({
  businessName,
  logoUrl,
  whatsapp,
  whatsappMessage,
  phonePrimary,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsapp.replace(
    /\D/g,
    "",
  )}?text=${encodeURIComponent(whatsappMessage)}`;

  const phoneUrl = `tel:${phonePrimary.replace(/\s/g, "")}`;

  const links = [
    ["Home", "/"],
    ["Services", "/#services"],
    ["Samples", "/samples"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(247,243,236,.94)] backdrop-blur">
      <div className="container-shell flex min-h-18 items-center justify-between gap-5">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-lg"
          aria-label={`${businessName} home`}
          onClick={() => setOpen(false)}
        >
          {logoUrl ? (
            <div className="relative h-12 w-36 shrink-0">
              <Image
                src={logoUrl}
                alt={`${businessName} logo`}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--maroon)] text-sm font-bold text-white">
              SO
            </span>
          )}
          {/* "for rectangular logo" */}
          {/* <div className="relative h-12 w-36 shrink-0">
            <Image
              src="/images/logo.png"
              alt={`${businessName} logo`}
              fill
              className="object-contain object-left"
              priority
            />
          </div> */}

          <span>
            <span className="block font-semibold tracking-tight">
              {businessName}
            </span>

            <span className="block text-xs text-[var(--muted)]">
              Print • Design • Create
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              className="focus-ring rounded-md text-[var(--muted)] transition hover:text-[var(--foreground)]"
              href={href}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/admin/login"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Owner Login
          </Link>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            onClick={() =>
              trackEvent({
                event: "phone_click",
                metadata: { location: "navbar" },
              })
            }
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm"
            href={phoneUrl}
          >
            <Phone size={16} />
            Call
          </a>

          <a
            onClick={() =>
              trackEvent({
                event: "whatsapp_click",
                metadata: { location: "navbar" },
              })
            }
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] px-4 py-2 text-sm font-medium text-white"
            href={whatsappUrl}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        <button
          className="focus-ring rounded-lg p-2 md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden">
          <nav
            className="container-shell flex flex-col gap-1 py-4"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium hover:bg-[var(--background)]"
              >
                {label}
              </Link>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                onClick={() =>
                  trackEvent({
                    event: "phone_click",
                    metadata: { location: "navbar_mobile" },
                  })
                }
                href={phoneUrl}
                className="rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold"
              >
                Call
              </a>

              <a
                onClick={() =>
                  trackEvent({
                    event: "whatsapp_click",
                    metadata: { location: "navbar_mobile" },
                  })
                }
                href={whatsappUrl}
                className="rounded-xl bg-[var(--maroon)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
