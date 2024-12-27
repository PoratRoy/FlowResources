"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./AddWebsiteForm.css";

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Productivity",
  "Learning",
];

export function AddWebsiteForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const websiteData = {
      url: formData.get("url"),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
    };

    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error adding website:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-card">
      <form onSubmit={onSubmit} className="website-form">
        <div className="form-group">
          <label htmlFor="url" className="form-label">
            Website URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Website Title"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a brief description of the website..."
            required
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="form-select"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Website"}
        </button>
      </form>
    </div>
  );
}
