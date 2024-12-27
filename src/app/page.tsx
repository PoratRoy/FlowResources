import FlowSelection from '@/components/FlowSelection/FlowSelection';
import WebsiteGrid from '@/components/WebsiteGrid/WebsiteGrid';
import './page.css';

const categories = ['All', 'Development', 'Design', 'Marketing', 'Productivity', 'Learning'];

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <FlowSelection options={categories} />
        <WebsiteGrid />
      </div>
    </main>
  );
}
