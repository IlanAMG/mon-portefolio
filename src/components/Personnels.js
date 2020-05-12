import React, { useContext, useRef, useState, useEffect } from 'react'
import Context from '../untils/context';
import { AiOutlineDown } from 'react-icons/ai';
import { Card } from './Card';
import { Text } from './Text';
import { Footer } from './Footer';

export const Personnels = () => {
    const { sizeWindow, stylePERS } = useContext(Context)
    const ancre = useRef(null)
    const [contenuRender, setContenuRender] = useState(false)
    const [footerRender, setFooterRender] = useState(false)

    const heightRef1 = useRef(null)
    const heightRef2 = useRef(null)
    const heightRef3 = useRef(null)
    const heightRef4 = useRef(null)
    const heightRef5 = useRef(null)
    const heightRef6 = useRef(null)
    const heightRef7 = useRef(null)
    const heightRef8 = useRef(null)
    const heightRef9 = useRef(null)
    const heightRef10 = useRef(null)
    const [height1, setHeight1] = useState(0)
    const [height2, setHeight2] = useState(0)
    const [height3, setHeight3] = useState(0)
    const [height4, setHeight4] = useState(0)
    const [height5, setHeight5] = useState(0)
    const [height6, setHeight6] = useState(0)
    const [height7, setHeight7] = useState(0)
    const [height8, setHeight8] = useState(0)
    const [height9, setHeight9] = useState(0)
    const [height10, setHeight10] = useState(0)
    const untilForTitleH5 = '</'

    const [phrase1T, setPhrase1T] = useState('')
    const [phrase2T, setPhrase2T] = useState('')
    const [index, setIndex] = useState(0)
    const [firstAnimationFinish, setFirstAnimationFinish] = useState(false)

    const height = (window.innerHeight) + 100
    const width = (window.innerWidth) + 100
    const [styles, setStyles] = useState({})

    const phrase1 = 'Voici une sélection de mes projets personnels.'
    const phrase2 = "Chaque projet m'apporte une nouvelle compétence."
    const play = () => {

        if (!firstAnimationFinish) {
            if (phrase1T.length !== phrase1.length) {
                setPhrase1T(phrase1.slice(0, index))
                setIndex(index => index + 1)
                if (index === phrase1.length) {
                    return setIndex(0)
                }
            }

            if (phrase1T.length === phrase1.length && phrase2T.length !== phrase2.length) {
                setPhrase2T(phrase2.slice(0, index))
                setIndex(index => index + 1)
            }

            if (phrase2T === "Chaque projet m'apporte une nouvelle compétence.") {
                setFirstAnimationFinish(true)
            }
        } 
    }

    const handleRotationMove = e => {
        if (phrase2T === "Chaque projet m'apporte une nouvelle compétence.") {
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
        if (phrase2T === "Chaque projet m'apporte une nouvelle compétence.") {
            setStyles({
                transform: `perspective(700px) scale(1.1) rotateX(${0}deg) rotateY(${0}deg)`
            })
        }
    }

    const randomSpeed = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
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
    
    useInterval(play, randomSpeed(20, 40))
    
    const scrollToRef = (ref) => window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
    })   

    const resizeText = () => {
        if (heightRef1.current && heightRef2.current && heightRef3.current && heightRef4.current && heightRef5.current && heightRef6.current && heightRef7.current && heightRef8.current && heightRef9.current && heightRef10.current) {
            setHeight1(heightRef1.current.clientHeight)
            setHeight2(heightRef2.current.clientHeight)
            setHeight3(heightRef3.current.clientHeight)
            setHeight4(heightRef4.current.clientHeight)
            setHeight5(heightRef5.current.clientHeight)
            setHeight6(heightRef6.current.clientHeight)
            setHeight7(heightRef7.current.clientHeight)
            setHeight8(heightRef8.current.clientHeight)
            setHeight9(heightRef9.current.clientHeight)
            setHeight10(heightRef10.current.clientHeight)
        } 
    }
    useEffect(() => {
        resizeText() 
    }, [sizeWindow])

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('scroll', resizeText, { passive: true });
        }, 100)
    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', resizeText);
        };
    }, []);

      useEffect(() => {
        setTimeout(() => {
            setContenuRender(true)
            setFooterRender(true)
        }, 300)
        return () => {
            setContenuRender(false)
            setFooterRender(false)
        };
      }, [])

    return (
        <div className='personnels' style={stylePERS}>
            <div className='filter-personnels'></div>
            <div className="container-principal">
                <h1 className='h1-pers'>MES PROJETS</h1>
                <div className="container-presentation-perso"  onMouseMove={handleRotationMove} onMouseOut={handleRotationDown} style={styles}>
                    <span className={phrase1T !== phrase1 ? 'border' : null}>{phrase1T}</span>
                    {
                        phrase2T.length !== 0 ?
                            <span className='border'>{phrase2T}</span>
                            : null
                    }
                </div>
                <button onClick={() => scrollToRef(ancre)} className='wrapper-btn-scroll-perso'>
                    <div className='scroll'>
                        <span>SCROLL</span>
                    </div>
                    <div className='fleche-scroll'>
                        <AiOutlineDown />
                    </div>
                </button>
            </div>
            {
                contenuRender &&
            <div ref={ancre} className='container-contenu-perso'>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height1} numText='text1' paragraphe="Ce blog, qui n'est pas encore alimenté à ce jour, a été réalisé avec GatsbyJS + Netlify CMS. Cela m'a permit de mettre en pratique de nombreuses connaissances, tels que les requêtes GraphQl, newsletters, formulaire de contacts, thème clair/foncé, système de recherche, ainsi que plusieurs plugins Gatsby. J'ai apprécié utiliser ce générateur de site statique, en revanche j'utiliserai un autre Cms pour la deuxième version de ce blog." compétences="React, Gatsby.js, GraphQL, NetlifyCMS, Styled-Component, Antd Design, Mailchimp, netlify form, Zapier, markdown, Algolia, gatsby-plugin-catch-links, gatsby-remark-external-links, gatsby-remark-images, @raae/gatsby-remark-oembed, rehype-react"/>
                        <Card lien="https://www.devtrotter.com/" direction='left' titre={untilForTitleH5 + ' BLOG DEVTROTTER'} height={heightRef1} urlImg='https://i.goopics.net/Z7LPd.png'/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien="https://game-pacman.netlify.com/" direction='right' titre='MINI JEU : PAC-MAN />' height={heightRef1} urlImg='https://i.goopics.net/L2Z1L.png'/>
                        <Text height={height1} numText='text1' paragraphe="J'ai essayé de rester fidèle à l'authentique jeu d'arcade Pac-man Namco en réalisant ce jeu. J'ai recrée la map, le déplacement du pac-man ainsi que toutes les IA des fantômes. Chaque fantôme a sa propre personnalité et se déplacent tous différemments dans le labyrinthe. Le meilleur record est persisté dans une base de donnée, vous pouvez donc allez essayer de le battre !" compétences="React Hooks, Firebase write(), remove(), read(), méthodes .map(), async await, Math.sqrt, setTimeout, setInterval, affichage conditionnel, optimisation à l'aide de React.memo" />
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height2} numText='text2' paragraphe="Ce projet est un pokédex qui répertorie tous les pokémons existants. Il se base sur Pokeapi.co qui est une API spécialisée en pokemon, cela m'a permis d'expérimenter l'utilisation d'une API et la gestion des promesses avec la methode fetch() de javascript. On peut aussi les trier par types et ils s'affichent page par page." compétences="React Hooks, React-router, Promise, Fetch, async await, style inline component"/>
                        <Card lien="https://app-pokemon.netlify.com/" direction='left' titre={untilForTitleH5 + ' POKEDEX'} height={heightRef2} urlImg='https://i.goopics.net/740oJ.png'/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien ="https://calculatrice-devtrotter.netlify.com/" direction='right' titre='CALCULATRICE />' height={heightRef3} urlImg='https://i.goopics.net/n39V1.png'/>
                        <Text height={height3} numText='text3' paragraphe="Ceci est un projet que j'ai realisé avec mon ami Sebastien Chapuy, développeur web étudiant. C'était un petit challenge de réaliser un calculatrice car cela demande pas mal de logique et de maîtrise de javascript pour qu'elle soit fonctionnelle et qu'il n'y ai aucun bug." compétences="React Hooks, .push(), .pop(), isNaN(), .parseFloat(), regex, méthodes String : .join(), .replace(), mathjs" />
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height4} numText='text4' paragraphe="Ce site est une application web responsive de jeux à gratter, il est en cours de développement mais la base est terminée. Cela m'a entrainé a utiliser une base de donnée et un système de compte utilisateur. De plus, les gains sont générer aléatoirement et j'ai utilisé un canvas pour pouvoir gratter les jeux." compétences="React Hooks, React-router, Firestore méthodes : Write(), Remove(), Read(), Firebase Authentifaction avec Facebook, persistance en bdd firestore, gestion d'utilisateur, html canvas, Context, .then() .catch(), " />
                        <Card lien="https://jeuxagratter.netlify.com/" direction='left' titre={untilForTitleH5 + ' SITE DE JEUX À GRATTER'} height={heightRef4} urlImg='https://i.goopics.net/A3Aya.png'/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien="https://www.pdfdevisfactures.com/" direction='right' titre='PDF GENERATOR />' height={heightRef5} urlImg='https://i.goopics.net/Eeqjp.png'/>
                        <Text height={height5} numText='text5' paragraphe="Nous avions un besoin dans notre entreprise de commerce, générer des factures et des devis facilement pour nos clients. J'ai donc décidé de développer un site web pour générer des pdf facilement, on peut personnaliser le logo, mettre les coordonnées, ajouter / retirer des produits et la TVA se calcule automatiquement." compétences="React Hooks, bootstrap, firebase storage, react-pdf, style inline component" />
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height6} numText='text6' paragraphe="Voici le portefolio de mon ami Yami Quinton, spécialisé en réalisation vidéo. C'est mon premier projet personnel fait avec React, je ne connaissais pas encore React Hooks c'est pourquoi j'ai utilisé des class components et les méthodes de cycles de vies des composants classiques." compétences="ReactJS, React-router, animation keyframes CSS, responsive design" />
                        <Card lien="https://www.yamiquinton.com/" direction='left' titre={untilForTitleH5 + ' PORTEFOLIO - YAMI QUINTON'} height={heightRef6} urlImg='https://i.goopics.net/ddYvO.png'/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien="https://jeudusnake.netlify.com/" direction='right' titre='MINI JEU : LE SNAKE />' height={heightRef7} urlImg='https://i.goopics.net/K49GY.png'/>
                        <Text height={height7} numText='text7' paragraphe="Voici mon petit jeu du snake, j'ai mis en application ce que je connaissais sur le déplacement du snake en fonction de sa direction, la collision avec son corps et avec les bords de l'écran. De plus, de la nourriture apparait aléatoirement sur l'écran du jeu, lorsque le snake en mange, il grandit. Le score est incrémenté et sa vitesse augmente" compétences="React Hooks, méthodes sur array : .push() .shif() .pop() .map()"/>
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height8} numText='text8' paragraphe="J'ai programmé ce jeu du morpion non pas pour sa complexité ou pour son style mais pour comprendre la création d'une IA basique. Il y a un mode solo (sans IA) et un mode contre l'IA que vous pouvez essayé de battre à votre guise." compétences="React Hooks, méthode .map(), affichage conditionnel, useEffect(), diverses méthodes sur array"/>
                        <Card lien="https://jeudumorpion.netlify.com/" direction='left' titre={untilForTitleH5 + ' MINI JEU : LE MORPION'} height={heightRef8} urlImg="https://i.goopics.net/GE4ma.png"/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien="https://memory-blue.netlify.com/" direction='right' titre='MINI JEU : MEMORY />' height={heightRef9} urlImg='https://i.goopics.net/4Qb4v.png'/>
                        <Text height={height9} numText='text9' paragraphe="Vous connaissez tous le jeu du memory, j'ai essayé d'en créer un avec les compétences que j'ai acquises en ReactJS et Javascript, de plus j'ai implanté un petit compteur de tours ainsi qu'un chronomètre." compétences='ReactJS, React Hooks, Méthodes JS : Math.floor(), Math.random(), setTimeout, setInterval, méthode .push(), boucle For'/>
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height10} numText='text10' paragraphe="Voici le portefolio de ma soeur, Alexia Amzallag, spécialisée en maquillage artistique. J'ai hésité à mettre ce projet dans mon portefolio. Finalement, j'ai décidé de vous le présenter malgré ses imperfections car c'est le premier projet web que j'ai réalisé par moi même. Il m'a permis d'appliquer ce que j'avais appris théoriquement dans des formations HTML et CSS." compétences='HTML5, CSS3, CSS Grid, herbergé avec OVH' />
                        <Card lien='https://alexiamzallag.com/' direction='left' titre={untilForTitleH5 + ' PORTEFOLIO - ALEXIA AMZALLAG'} height={heightRef10} urlImg="https://i.goopics.net/YrqYA.png"/>
                    </div>
                <div className="separator"></div>
            </div>
            }
            {
                footerRender &&
                <Footer />
            }
        </div>
    )
}

