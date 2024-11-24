import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { VisualScorer } from '../components/VisualScorer/VisualScorer';

export function HomePage() {
  return (
    <>
      <VisualScorer />
      <ColorSchemeToggle />
    </>
  );
}
