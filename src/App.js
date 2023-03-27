import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './home/Home';
import Ranking from './ranking/Ranking'
function App() {
  return (
    <div className="App">
      <div>
        <Header></Header>
        <Routes>
          <Route exact path='/ranking' element={<RankingRoute />} ></Route>
          <Route exact path="/" element={<HomeRoute />}></Route>
        </Routes>
      </div>

    </div>
  );
}

function HomeRoute() {
  return (
    <Home></Home>
  )
}

function RankingRoute() {
  return (
    <Ranking></Ranking>
  )
}
export default App;
