import { BrowserRouter,Route,Routes } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import Home from './home/Home';
import Tiutorial from './home/Tiutorial';
import OnlinePlay from './components/OnlinePlay';

const App = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/game'} element={<GameBoard />} />
      <Route path={'/game-online'} element={<OnlinePlay />} />
      <Route path={'/game-tutorial'} element={<Tiutorial />} />
    </Routes>
  );
};

export default App;
