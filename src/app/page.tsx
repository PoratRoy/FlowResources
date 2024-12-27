import WebsiteGrid from "@/components/WebsiteGrid/WebsiteGrid";
import { Navigation } from "@/components/Navigation/Navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <h1 className="page-title">Discover Resources</h1>
          <WebsiteGrid />
        </div>
      </main>
    </>
  );
}
