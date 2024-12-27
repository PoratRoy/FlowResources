import { AddWebsiteForm } from "@/components/AddWebsiteForm/AddWebsiteForm";
import { Navigation } from "@/components/Navigation/Navigation";

export default function AddPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <h1 className="page-title">Add New Website</h1>
          <AddWebsiteForm />
        </div>
      </main>
    </>
  );
}
