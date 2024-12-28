"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Website } from "@/models/types/website";
import { useWebsitesContext } from "@/context/WebsitesContext";
import "./AddWebsiteForm.css";
import { LinkPreviewResponse } from "@/models/types/thumbnail";

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
  const { websites, setWebsites, addWebsite } = useWebsitesContext();

  const handleThumbnail = async (url: string) => {
    const response = await fetch('/api/thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await response.json() as LinkPreviewResponse;
    return data.image;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    // const thumbnailUrl = await handleThumbnail(formData.get("url") as string);
    const websiteData: Omit<Website, "id"> = {
      url: formData.get("url") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as Website["category"],
      // image: thumbnailUrl,
      image: "https://cdn.dribbble.com/assets/apple-touch-icon-precomposed-182fb6df572b99fd9f7c870e5bd4441188121518640c0fa57782b258434d1e0f.png",
    };

    try {
      const updatedWebsites = addWebsite(websites, websiteData);
      setWebsites(updatedWebsites);
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
