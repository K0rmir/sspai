import CreateGame from '@/components/CreateGame/CreateGame';
import { Header } from '@/components/Header/Header';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { VisualScorer } from '../components/VisualScorer/VisualScorer';

export function HomePage() {
  return (
    <>
      <Header/>
      <CreateGame />
      {/* <VisualScorer /> */}
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
