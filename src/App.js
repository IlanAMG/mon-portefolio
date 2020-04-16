import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Formations } from './components/Formations';
import { Personnels } from './components/Personnels';
import { Apropos } from './components/Apropos';
import { WallTransition } from './components/WallTransition'
import { BtnNav } from './components/BtnNav';
import { MenuNav } from './components/MenuNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Context from './untils/context';
import useWindowSize from './untils/useWindowSize'
import FlecheGoTop from './components/FlecheGoTop';
import spinner from './ASSETS/spinner.svg'
import "animate.css/animate.min.css";

const App = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [styles, setStyles] = useState({})
  const [styleWallUp, setStyleWallUp] = useState({})
  const [styleWallDown, setStyleWallDown] = useState({})
  const [transitionFinish, setTransitionFinish] = useState(false)
  const sizeWindow = useWindowSize();

  return (
    <Context.Provider value={{ sizeWindow, isVisible, transitionFinish, setTransitionFinish, styleWallUp, setStyleWallUp, styleWallDown, setStyleWallDown }}>
      <Router>
      {
        isLoad ? null : (
                    <WallTransition styleWallUp={{top: 0}} styleWallDown={{bottom: 0}}/>
                    )
      }
        <div style={isLoad ? {} : {display: 'none' }} onLoad={() => setIsLoad(true)} className='App'>
          <WallTransition />
          <MenuNav  setIsVisible={setIsVisible} isVisible={isVisible} setStyles={setStyles} styles={styles} />
          <BtnNav isVisible={isVisible} setIsVisible={setIsVisible} />
          <div className='lang'>
            <span>FR</span>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/personnels" component={Personnels} />
            <Route exact path="/formations" component={Formations} />
            <Route exact path="/àpropos" component={Apropos} />
          </Switch>
          <FlecheGoTop />
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
