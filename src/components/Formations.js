import React, { useContext, useRef, useState, useEffect } from 'react'
import Context from '../untils/context';
import { AiOutlineDown } from 'react-icons/ai';
import { Card } from './Card';
import { Text } from './Text';
import { Footer } from './Footer';

export const Formations = () => {
    const { sizeWindow, styleFORM } = useContext(Context)
    const ancre = useRef(null)
    const [contenuRender, setContenuRender] = useState(false)
    const [footerRender, setFooterRender] = useState(false)

    const heightRef1 = useRef(null)
    const heightRef2 = useRef(null)
    const heightRef3 = useRef(null)
    const [height1, setHeight1] = useState(0)
    const [height2, setHeight2] = useState(0)
    const [height3, setHeight3] = useState(0)
    const untilForTitleH5 = '</'

    const [phrase1T, setPhrase1T] = useState('')
    const [phrase2T, setPhrase2T] = useState('')
    const [index, setIndex] = useState(0)
    const [firstAnimationFinish, setFirstAnimationFinish] = useState(false)
    const [styles, setStyles] = useState({})
    
    const height = (window.innerHeight) + 100
    const width = (window.innerWidth) + 100
    const phrase1 = 'Voici une sélection de projets faits en formations,'
    const phrase2 = "puis la liste de toutes mes formations terminées."

    const scrollToRef = (ref) => window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth'
        }) 
    
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
        if (phrase2T === "puis la liste de toutes mes formations terminées.") {
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
        if (phrase2T === "puis la liste de toutes mes formations terminées.") {
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
    
    useInterval(play, randomSpeed(20, 70))

    const resizeText = () => {
        if (heightRef1.current && heightRef2.current && heightRef3.current) {
            setHeight1(heightRef1.current.clientHeight)
            setHeight2(heightRef2.current.clientHeight)
            setHeight3(heightRef3.current.clientHeight)
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
        }, 400)
        return () => {
            setContenuRender(false)
            setFooterRender(false)
        };
      }, [])

    return (
        <div className='formations' style={styleFORM}>
            <div className='filter-formations'></div>
            <div className="container-principal">
                <h1 className='h1-form'>MES FORMATIONS</h1>
                <div className="container-presentation-perso" onMouseMove={handleRotationMove} onMouseOut={handleRotationDown} style={styles}>
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
                <>
                <div ref={ancre} className='container-contenu-perso'>
                    <div className="wrapper-container-projets">
                        <Card lien="https://twitchlike.netlify.com/" direction='right' titre='TWITCH LIKE />' height={heightRef1} urlImg='https://i.goopics.net/lgExw.png'/>
                        <Text height={height1} numText='text1' paragraphe={`Ce projet a été réalisé dans le cadre de la formation "Cloner Twitch avec React" par Enzo Ustariz sur Udemy. J'y ai appris a utiliser l'API de Twitch qui est très complète ainsi qu'à utiliser Axios.`}  compétences="React Hooks, Axios, React-router, :slug avec useParams, async await, utiliser l'api de twitch" />
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height2} numText='text2' paragraphe={`Ce projet a été réalisé dans le cadre de la formation "React Hooks et Firebase (CRUD avec Firestore + Login)" du programme HARDCODERS de Anthony Welc. J'y ai appris a maîtriser les Hooks et à utiliser Firebase Authentification ainsi que Firestore. Ainsi que pleins de petites fonctionnalités bien utiles. Copier certaines fonctionnalités de Twitter m'a énormément fait progresser.`} compétences="React Hooks, Firebase Firestore, Firebase Authentification, Hooks personnalisés, Context Api, firebase méthodes read(), write(), remove(), date-fns, sanitize.css" />
                        <Card lien="https://twitterlike.netlify.com/" direction='left' titre={untilForTitleH5 + ' TWITTER LIKE'} height={heightRef2} urlImg='https://i.goopics.net/Xbqbd.png'/>
                    </div>
                    <div className="wrapper-container-projets">
                        <Card lien="https://github.com/IlanAMG/OMDb-Movie-Search" direction='right' titre='OMDb Movie Search />' height={heightRef3} urlImg='https://i.goopics.net/brxOW.png'/>
                        <Text height={height3} numText='text3' paragraphe={`Ce projet a été réalisé dans le cadre de la formation "ReactJS Fullstack : Firebase Firestore & authentification" par Sandra L. sur Udemy. J'y ai appris a utiliser l'API OMDb Movie, gérer un système de recherche et de favoris. Ainsi que la création de compte, l'authentification, la gestion des erreurs, la vérification par mail et le système de reset de mot de passe avec Firebase. (Je n'ai pas hébergé ce projet mais le lien Github est disponible)`} compétences="React Hooks, Firestore, appel API omdb movie, Firebase Authentification, méthodes : write(), remove(), read(), signUp(), signIn(), signOut(), sendEmail(), resetPassword(), Promise, Fetch, .then .catch" />
                    </div>
                    <div className="wrapper-container-projets reverse">
                        <Text height={height2} numText='text2' paragraphe={`Ce projet a été réalisé dans le cadre de la formation "React 16+  - Le Guide Complet (+ React Router 4 && Firebase)" par Anthony Welc sur Udemy. C'est un petit réseau social qui permet de partager des recettes de cuisine. Il m'a permit de mettre un pied dans Firebase et de gérer l'authentification ainsi que différentes méthodes JS pour la mise en page des recettes en tant qu'admin. (Ce projet n'est pas herbergé mais le lien Github est disponible)`} compétences="ReactJS, class component, JSON, Firebase, Firebase Authentification facebook, async await, fetch(), react-router-dom" />
                        <Card lien="https://github.com/IlanAMG/base-recettes-app" direction='left' titre={untilForTitleH5 + ' RÉSEAU SOCIAL : BOITE À RECETTE'} height={heightRef2} urlImg='https://i.goopics.net/OOq7w.png'/>
                    </div>
                    <div className="separator"></div>
                </div>
                <div className='container-liste-formations'>
                    <h3>Toutes les formations :</h3>
                    <div className='liste-formations'>
                        <div className='wrapper-liste'>
                            <h4>UDEMY</h4>
                            <span>HTML5 & CSS3 : la formation ULTIME - <font>Louis Nicolas Leuillet</font></span>
                            <span>Javascript : Le Guide Ultime (ES6 & ES7 inclus) - <font>Antho Welc</font></span>
                            <span>React 16+ - Le Guide Complet (+ React Router 4 && Firestore) - <font>Antho Welc</font></span>
                            <span>ReactJS pour débutants (+ React Router) - <font>Axel Paris</font></span>
                            <span>Cloner Twitch avec React - <font>Enzo Ustariz</font></span>
                            <span>React de A à Z (React Hooks inclus) - <font>Enzo Ustariz</font></span>
                            <span>Développement Web Fullstack MERN - <font>Sandra L</font></span>
                            <span>Les bases indispensables de la programmation : Algorithmique - <font>Matthieu GASTON</font></span>
                            <span>Node.js - Express.js - JWT et Mongoose par la pratique - <font>Code Concept</font></span>
                            <span>Javascript par la pratique - <font>Code Concept</font></span>
                            <span>Devenir Opérationnel rapidement en React - <font>Code Concept</font></span>
                            <span>Maîtriser React de A à Z : Créer son propre NETFLIX - <font>Julien Kisoni</font></span>
                            <span>ReactJS Fullstack : Firebase Firestore et Authentification - <font>Sandra L</font></span>
                            <span>React Native pour débutants - <font>Robin Lebhar</font></span>
                        </div>
                        <div className="container-wrapper-liste">
                            <div className='wrapper-liste'>
                                <h4>CHAÎNE YOUTUBE</h4>
                                <span>codeSTACKr</span>
                                <span>Le Designer du Web - Enzo Ustariz</span>
                                <span>Dev Theory</span>
                                <span>Développeur Libre</span>
                                <span>Grafikart.fr</span>
                                <span>getCodingKnowLedge</span>
                                <span>Captain Dev</span>
                                <span>Benjamin Code</span>
                                <span>The Coding Train</span>
                                <span>Les Teachers du Net</span>
                                <span>Codeconcept</span>
                                <span>Le wagon</span>
                                <span>Javascript Mastery</span>
                                <span>Mike / Codeur Nomade</span>
                                <span>Antho Welc</span>
                                <span>Lior CHAMLA</span>
                                <span>FlexCode</span>
                            </div>
                            <div className='wrapper-liste'>
                                <h4>AUTRES</h4>
                                <span>Programme de Antho Welc : HARDCODERS (1 formation par Mois)</span>
                                <span>FreeCodeCamp</span>
                                <span>3W Academy</span>
                                <span>OpenClassRoom</span>
                                <span>MDN Web Doc</span>
                                <span>StackOverflow</span>
                                <span>Channels Discords</span>
                                <span>Application Mobile : Mimo</span>
                                <span>Application Mobile : Grasshopper</span>
                            </div>
                        </div>
                       
                    </div>
                    <h3>Compétences acquises : </h3>
                    <p className='compétences'>HTML5, CSS3, Flexbox, CSS Grid, JAVASCRIPT ES7 et +, REACT JS, REACT Hooks, REACT Context, REACT Router, JSON, Firebase / Firestore, Firebase Authentification, CRUD, Firebase Storage, Fetch, Axios, API REST, Netlify hébergeur, Ant Design, EmailJS, Font Awesome, Bootstrap, Github, Github Desktop, + les bases de NodeJS, ExpressJS & MongoDB/Mongoose ainsi que pleins de librairies diverses et variées...</p>
                </div> 
                </>
            }
            {

                footerRender &&
                <Footer />
            }
        </div>
    )
}
