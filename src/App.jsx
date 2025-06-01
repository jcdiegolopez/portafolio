import { useState, useEffect } from 'react';
import PortfolioStack from './components/common/PortfolioStack';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <PortfolioStack />;
}

export default App;