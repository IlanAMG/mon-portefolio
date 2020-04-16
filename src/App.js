import React, { useState, useRef, useEffect } from 'react';
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
import hexagone from './ASSETS/hexagone.png'
import "animate.css/animate.min.css";

const App = () => {
  const curseurRef = useRef()
  const [rotate, setRotate] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [styles, setStyles] = useState({})
  const [styleWallUp, setStyleWallUp] = useState({})
  const [styleWallDown, setStyleWallDown] = useState({})
  const [transitionFinish, setTransitionFinish] = useState(false)
  const sizeWindow = useWindowSize();

  const mousePos = e => {
    curseurRef.current.setAttribute('style', `top:${e.pageY - 20}px; left:${e.pageX - 20}px;`)
  }

  const cursorRotate = () => {
    setRotate(rotate + 5)
  }

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  useInterval(cursorRotate, 100)

  return (
    <Context.Provider value={{ sizeWindow, isVisible, transitionFinish, setTransitionFinish, styleWallUp, setStyleWallUp, styleWallDown, setStyleWallDown }}>
      <Router>
          <div onMouseMove={mousePos} className='App'>
            <div ref={curseurRef} className="curseur-perso">
              <img src={hexagone} alt="cursor" style={{transform: 'rotate(' + rotate +'deg)'}}/>
            </div>
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
        }
      </Router>
    </Context.Provider>
  );
}

export default App;
