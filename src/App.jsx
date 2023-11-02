import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './home/Home';
import Tiutorial from './home/Tiutorial';
import OnlineGame from './components/OnlineGame';
import OTG from './components/OTG';
import Game from './components/Game';

const App = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/game'} element={<Game />} />
      <Route path={'/gameOnline'} element={<OnlineGame />} />
      <Route path={'/gameOnlineT'} element={<OTG />} />
      <Route path={'/game-tutorial'} element={<Tiutorial />} />
    </Routes>
  );
};

export default App;
