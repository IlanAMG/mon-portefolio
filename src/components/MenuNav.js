import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Context from '../untils/context';
import hexagone from '../ASSETS/hexagone.png'
import hexagone2 from '../ASSETS/hexagone2.png'

export const MenuNav = ({ isVisible, setStyles, styles, setIsVisible}) => {
    const [styleHover1, setStyleHover1] = useState({})
    const [styleHover2, setStyleHover2] = useState({})
    const [styleHover3, setStyleHover3] = useState({})
    const [styleHover4, setStyleHover4] = useState({})
    const [styleLiens, setStyleLiens] = useState({})

    const  { setStyleWallUp, setStyleWallDown, setTransitionFinish } = useContext(Context)

    let history = useHistory()
    let location = useLocation()
    const [element1, setElement1] = useState({
        x: 100,
        y: 0,
        rotate: 0
    })
    const [element2, setElement2] = useState({
        x: window.innerWidth - 139,
        y: window.innerHeight - 123,
        rotate: 0
    })

    const [element3, setElement3] = useState({
        x: (window.innerWidth - (window.innerWidth * 70/100)),
        y: window.innerHeight - 123,
        rotate: 0
    })
    const [element4, setElement4] = useState({
        x: (window.innerWidth - (window.innerWidth * 30/100)),
        y: 0,
        rotate: 0
    })
    const [direction1, setDirection1] = useState('RIGHT')
    const [direction2, setDirection2] = useState('RIGHT')
    const [direction3, setDirection3] = useState('UP')
    const [direction4, setDirection4] = useState('DOWN')

    const moveElement = (element, direction) => {
        const copyElement = {...element}
        copyElement.rotate += 1
        if (direction === 'RIGHT') {
          copyElement.x += 4
          copyElement.y += 4
        }

        if (direction === 'LEFT') {
          copyElement.x -= 4
          copyElement.y -= 4
        }
        if (direction === 'UP') {
          copyElement.x += 4
          copyElement.y -= 4
        }
        if (direction === 'DOWN') {
          copyElement.x -= 4
          copyElement.y += 4
        }
        if (element === element1) {
          setElement1(copyElement)
        }
        if (element === element2) {
          setElement2(copyElement)
        }
        if (element === element3) {
          setElement3(copyElement)
        }
        if (element === element4) {
          setElement4(copyElement)
        }
    }

    const checkIfOut = (copyElement, setDirection, direction) => {
        const width = window.innerWidth
        const height = window.innerHeight
        if (copyElement.x <= 0) {
          if (direction === 'LEFT') {
            return setDirection('UP')
          }
          if (direction === 'DOWN') {
            return setDirection('RIGHT')
          }
        }
        if (copyElement.x >= width - 139) {
          if (direction === 'RIGHT') {
            return setDirection('DOWN')
          }
          if (direction === 'UP') {
            return setDirection('LEFT')
          }
        }
        if (copyElement.y <= 0) {
          if (direction === 'UP') {
            return setDirection('RIGHT')
          }
          if (direction === 'LEFT') {
            return setDirection('DOWN')
          }
        }
        if (copyElement.y >= height - 123) {
          if (direction === 'RIGHT') {
            return setDirection('UP')
          }
          if (direction === 'DOWN') {
            return setDirection('LEFT')
          }
        }
      }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
          checkIfOut(element1, setDirection1, direction1)
          checkIfOut(element2, setDirection2, direction2)
          checkIfOut(element3, setDirection3, direction3)
          checkIfOut(element4, setDirection4, direction4)
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
      
      useInterval(() => moveElement(element1, direction1), 10)
      useInterval(() => moveElement(element2, direction2), 10)
      useInterval(() => moveElement(element3, direction3), 10)
      useInterval(() => moveElement(element4, direction4), 10)

    const handleHover = (e) => {
        const target1 = e.target.getAttribute('data-tag')
        const target2 = e.target.textContent
        if (target1 === 1 || target2 === 'ACCUEIL' || target2 === 'ACCUEILAu commencement' || target2 === 'Au commencement') {
            setStyleHover1({
                animationName: 'hover',
                animationDuration: '500ms',
                height: '40%'
            })
        }
        if (target1 === 2 || target2 === 'FORMATIONS' || target2 === 'FORMATIONSProjets en formations' || target2 === 'Projets en formations') {
            setStyleHover2({
                animationName: 'hover',
                animationDuration: '500ms',
                height: '40%'
            })
        }
        if (target1 === 3 || target2 === 'PERSONNELS' || target2 === 'PERSONNELSProjets personnels' || target2 === 'Projets personnels') {
            setStyleHover3({
                animationName: 'hover',
                animationDuration: '500ms',
                height: '40%'
            })
        }
        if (target1 === 4 || target2 === 'À PROPOS' || target2 === 'À PROPOSQui suis-je ?' || target2 === 'Qui suis-je ?') {
            setStyleHover4({
                animationName: 'hover',
                animationDuration: '500ms',
                height: '40%'
            })
        }
    }

    const handleOut = () => {
        setStyleHover1({
            height: '0%'
        })
        setStyleHover2({
            height: '0%'
        })
        setStyleHover3({
            height: '0%'
        })
        setStyleHover4({
            height: '0%'
        })
    }

    const handleRedirection = async (e) => {
        e.preventDefault()
        const path = e.currentTarget.getAttribute('value')
        await setIsVisible(false)

        if (path !== location.pathname) {
            await setTransitionFinish(false)
                setStyleWallUp({
                    animationDuration: '0.5s',
                    animationName: 'closeUp',
                    top: '0%'
                })
                setStyleWallDown({
                    animationDuration: '0.6s',
                    animationName: 'closeDown',
                    bottom: '0%'
                })

            window.setTimeout(() => {
                setStyleWallUp({
                    animationDuration: '0.5s',
                    animationName: 'openUp',
                    top: '-50%'
                })
                setStyleWallDown({
                    animationDuration: '0.6s',
                    animationName: 'openDown',
                    bottom: '-50%'
                })
            }, 900)

            window.setTimeout(() => {
                history.push(path)
            }, 500)
            
            window.setTimeout(() => {
                setTransitionFinish(true)
            }, 1500)

        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }


    useEffect(() => {
        if (isVisible) {
            setStyleLiens({
                animationName: 'openMenu',
                animationDuration: '600ms'
            })
            setStyles({
                visibility: 'visible',
                height: '100vh',
                opacity: '1'
            })
        }
        if (!isVisible) {
            setStyleLiens({
                animationName: '',
                animationDuration: ''
            })
            setStyles({
                visibility: 'hidden',
                height: '0px',
                opacity: '0'
            })
        }

    }, [isVisible, setStyles])
    return (
        <div className='menu-nav' style={styles}>
            <img className='hexagone' alt='hexagone' src={hexagone} style={{left: element1.x, top: element1.y, transform: 'rotate(' + element1.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone} style={{left: element2.x, top: element2.y, transform: 'rotate(' + element2.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone2} style={{left: element3.x, top: element3.y, transform: 'rotate(' + element3.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone2} style={{left: element4.x, top: element4.y, transform: 'rotate(' + element4.rotate +'deg)'}}/>
            <div data-tag={1} className='container-liens' onMouseOver={handleHover} onMouseOut={handleOut}>
                <Link to={'/'} value={'/'} onClick={handleRedirection} style={styleLiens} className='liens'>ACCUEIL</Link>
                <div className='hover' style={styleHover1}></div>
                <span>Au commencement</span>
            </div>
            <div data-tag={3} className='container-liens' onMouseOver={handleHover} onMouseOut={handleOut}>
                <Link to={'/personnels'} value={'/personnels'} onClick={handleRedirection} style={styleLiens} className='liens'>PERSONNELS</Link>
                <div className='hover' style={styleHover3}></div>
                <span>Projets personnels</span>
            </div>
            <div data-tag={2} className='container-liens' onMouseOver={handleHover} onMouseOut={handleOut}>
                <Link to={'/formations'} value={'/formations'} onClick={handleRedirection} style={styleLiens} className='liens'>FORMATIONS</Link>
                <div className='hover' style={styleHover2}></div>
                <span>Projets en formations</span>
            </div>
            <div data-tag={4} className='container-liens' onMouseOver={handleHover} onMouseOut={handleOut}>
                <Link to={'/àpropos'} value={'/àpropos'} onClick={handleRedirection} style={styleLiens} className='liens'>À PROPOS</Link>
                <div className='hover' style={styleHover4}></div>
                <span>Qui suis-je ?</span>
            </div>
        </div>
    )
}
