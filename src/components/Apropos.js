import React, { useState, useContext, useRef, useEffect } from 'react'
import Context from '../untils/context';
import hexagone from '../ASSETS/hexagone.png'
import hexagone2 from '../ASSETS/hexagone2.png'
import { Footer } from './Footer';
import { AiOutlineDown } from 'react-icons/ai';

export const Apropos = () => {
    const  { stylePROPOS } = useContext(Context)
    const ancre = useRef(null)
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

      const scrollToRef = (ref) => window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
    }) 
      useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 50)
      }, [])

    return (
        <div className='apropos' style={stylePROPOS}>
            <div className='filter-apropos'></div>
            <img className='hexagone' alt='hexagone' src={hexagone} style={{left: element1.x, top: element1.y, transform: 'rotate(' + element1.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone} style={{left: element2.x, top: element2.y, transform: 'rotate(' + element2.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone2} style={{left: element3.x, top: element3.y, transform: 'rotate(' + element3.rotate +'deg)'}}/>
            <img className='hexagone' alt='hexagone' src={hexagone2} style={{left: element4.x, top: element4.y, transform: 'rotate(' + element4.rotate +'deg)'}}/>
            <div className="container-principal">
                <h1 className='h1-form'>À PROPOS</h1>
                <div className="container-presentation-perso">
                    <div className="container-text-propos">
                      <p>Je suis un jeune développeur front-end français de 23 ans en reconversion professionnelle.<br/><br/> Suite à des études dans le génie-climatique et dans le commerce, puis après avoir travaillé 3 ans dans l'entreprise familiale, j'ai découvert le monde de l'informatique et du développement web qui m'a tout de suite passionné. <br/><br/> Aujourd'hui je passe tout mon temps libre à créer des sites, des minis-jeux ou à suivre des formations sur différentes plateformes. Je suis un grand autodidacte, constamment entrain d'apprendre et de pratiquer, j'aspire à devenir développeur fullstack prochainement.<br/><br/>Je suis ouvert à toutes vos propositions, en espérant que mon portefolio vous a plu ! À bientôt.</p>
                    </div>
                    <span className='span-propos'>Vous pouvez me trouver ici</span>
                    <div className="container-liens-propos">
                      <p>
                      <a rel="noopener noreferrer" target="_blank" href="https://github.com/IlanAMG">GITHUB</a><font> - </font>
                      <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/ilan-amzallag-b4a259101">LINKEDIN</a><font> - </font>
                      <a rel="noopener noreferrer" target="_blank" href="mailto:ilanamzallag.dev@gmail.com">EMAIL</a><font> - </font>
                      <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UCHuGcYX0jsbCA0lzFj1DmbA">YOUTUBE</a></p>
                    </div>
                </div>
                <button onClick={() => scrollToRef(ancre)} className='wrapper-btn-scroll-perso'>
                    <div className='scroll scroll-propos'>
                        <span>ME CONTACTER</span>
                    </div>
                    <div className='fleche-scroll'>
                        <AiOutlineDown />
                    </div>
                </button>
            </div>
            <div className='ancre' ref={ancre}>
              <Footer />
            </div>
        </div>
    )
}
