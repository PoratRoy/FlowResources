"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navigation.css";

export function Navigation() {
  const pathname = usePathname();
  const isAddPage = pathname === "/add";

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link href="/" className="navigation-logo">
          FlowResources
        </Link>
        <div className="navigation-actions">
          {isAddPage ? (
            <Link href="/" className="list-button">
              Websites List
            </Link>
          ) : (
            <Link href="/add" className="add-button">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                fill="none"
                className="plus-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Add Website
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
