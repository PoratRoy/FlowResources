"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./FlowSelection.css";

interface FlowSelectionProps {
  options: string[];
  width?: string;
}

const FlowSelection: React.FC<FlowSelectionProps> = ({ options, width = "1200px" }) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        {options.map((option) => (
          <Link
            key={option}
            href={`/?category=${option.toLowerCase()}`}
            className={`selection-link ${
              currentCategory === option.toLowerCase() ? "active" : ""
            }`}
          >
            {option}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FlowSelection;