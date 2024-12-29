import FlowSelection from '@/components/FlowSelection/FlowSelection';
import WebsiteGrid from '@/components/WebsiteGrid/WebsiteGrid';
import './page.css';

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <FlowSelection />
        <WebsiteGrid />
      </div>
    </main>
  );
}
