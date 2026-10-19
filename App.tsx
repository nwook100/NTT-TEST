import React, { useEffect, useState } from 'react';
import ClanHome from './ClanHome';
import DkpApp from './dkp/DkpApp';

const readRoute = () => (window.location.hash.startsWith('#/ledger') ? 'ledger' : 'home');

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'ledger'>(readRoute);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route === 'ledger' ? <DkpApp /> : <ClanHome />;
};

export default App;
