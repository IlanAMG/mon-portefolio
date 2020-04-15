import React, { useState, useEffect, useRef, useContext } from 'react'
import bg from '../ASSETS/bg.jpg'
import { AiOutlineDown } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import withMemo from '../untils/withMemo';
import Context from '../untils/context';

const Home = () => {
    const { styleHOME, setTransitionFinish, setStyleWallDown, setStyleWallUp, isVisible } = useContext(Context)
    const [phrase1T, setPhrase1T] = useState('')
    const [nomT, setNomT] = useState('')
    const [phrase2T, setPhrase2T] = useState('')
    const [index, setIndex] = useState(0)
    const [firstAnimationFinish, setFirstAnimationFinish] = useState(false)
    const [newAdjectif, setNewAdjectif] = useState(0)

    const phrase1 = 'Bonjour, je m\'appelle '
    const nom = '< Ilan Amzallag />'
    const phrase2 = '"Je suis un développeur web autodidacte."'
    const phrase3 = '"Je suis un développeur web junior."'
    const phrase4 = '"Je suis un développeur web créatif."'
    const height = (window.innerHeight) + 100
    const width = (window.innerWidth) + 100
    const [styles, setStyles] = useState({})
    const menuOuvert = useRef(isVisible)
    let history = useHistory()

    const play = () => {

        if (!firstAnimationFinish) {
            if (phrase1T.length !== phrase1.length) {
                setPhrase1T(phrase1.slice(0, index))
                setIndex(index => index + 1)
                if (index === phrase1.length) {
                    return setIndex(0)
                }
            }
            if (phrase1T.length === phrase1.length && nom.length !== nomT.length) {
                setNomT(nom.slice(0, index))
                setIndex(index => index + 1)
                if (index === nom.length) {
                    return setIndex(0)
                }
            }
            if (nom.length === nomT.length && phrase1T.length === phrase1.length && phrase2T.length !== phrase2.length && newAdjectif === 0) {
                setPhrase2T(phrase2.slice(0, index))
                setIndex(index => index + 1)
            }

            if (newAdjectif === 1) {
                setPhrase2T(phrase3.slice(0, index))
                setIndex(index => index + 1)
            }
            if (newAdjectif === 2) {
                setPhrase2T(phrase4.slice(0, index))
                setIndex(index => index + 1)
            }

            if (phrase2T === '"Je suis un développeur web autodidacte."') {
                setFirstAnimationFinish(true)
            }
            if (phrase2T === '"Je suis un développeur web junior."') {
                setFirstAnimationFinish(true)
            }
            if (phrase2T === '"Je suis un développeur web créatif."') {
                setFirstAnimationFinish(true)
            }
        } else {
            if (newAdjectif < 2) {
                if (phrase2T.length >= 29) {
                    setPhrase2T(phrase2T.slice(0, index))
                    setIndex(index => index - 1)
                }
                if (phrase2T.length === 28) {
                    setNewAdjectif(adjectif => adjectif + 1)
                    setFirstAnimationFinish(false)

                }
            }
        }
    }

    const randomSpeed = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const handleRotationMove = e => {
        if (phrase2T === '"Je suis un développeur web créatif."') {
            const xVal = e.clientX
            const yVal = e.clientY
            const yRotation = 20 * ((xVal - width / 2) / width)
            const xRotation = -20 * ((yVal - height / 2) / height)
            setStyles({
                transform: `perspective(700px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
            })
        }
    }

    const handleRotationDown = () => {
        if (phrase2T === '"Je suis un développeur web créatif."') {
            setStyles({
                transform: `perspective(700px) scale(1.1) rotateX(${0}deg) rotateY(${0}deg)`
            })
        }
    }

    const handleScroll = async () => {
        if (!menuOuvert.current) {
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
                history.push('/personnels')
            }, 500)

            window.setTimeout(() => {
                setTransitionFinish(true)
            }, 1500)
        }
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

    useInterval(play, randomSpeed(20, 70))

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 50)
      }, [phrase1T])
      
    useEffect(() => {
        menuOuvert.current = isVisible
    }, [isVisible])

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }, 1200)
            // eslint-disable-next-line
    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
            // eslint-disable-next-line
    }, []);

    return (
        <div className='home' style={styleHOME}>
            <div className='filter'></div>
            <img alt='background' src={bg} />
            <div className='container-presentation' onMouseMove={handleRotationMove} onMouseOut={handleRotationDown} style={styles}>
                <div><span className={phrase1T !== phrase1 ? 'border' : null}>{phrase1T}</span><span className='nom'>{nomT}</span></div>
                {
                    phrase2T.length !== 0 ?
                        <span className='border'>{phrase2T}</span>
                        : null
                }
            </div>
            <button onClick={handleScroll} className='wrapper-btn-scroll'>
                <div className='scroll'>
                    <span>SCROLL</span>
                </div>
                <div className='fleche-scroll'>
                    <AiOutlineDown />
                </div>
            </button>
        </div>
    )
}

export default withMemo(Home, [])
