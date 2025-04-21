import CreateGame from '@/components/CreateGame/CreateGame';
import { Header } from '@/components/Header/Header';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function HomePage() {
  return (
    <>
      <Header/>
      <CreateGame />
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
