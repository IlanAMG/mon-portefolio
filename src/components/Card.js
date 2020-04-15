import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import spinner from '../ASSETS/spinner.svg'

export const Card = ({ lien, titre, height, urlImg, direction }) => {

    const [pageIsTop, setPageIsTop] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPageIsTop(true)
        }, 700)
    }, [])

    return (
        pageIsTop &&
        <ScrollAnimation className={`container-projets-card-${direction}`} animateOnce={true} delay={0} duration={0.8} animateIn={direction === 'left' ? 'bounceInRight' : 'bounceInLeft'}>
            <div className={`space title-projets-${direction}`}>
                <h5>{titre}</h5>
            </div>

            <a rel="noopener noreferrer" target="_blank" href={lien} ref={height} className="projet-card">
                { isLoad ? null : (
                    <img src={spinner} className='spinner' alt='loading'/>
                    )
                }
                <img style={isLoad ? {} : {display: 'none' }} onLoad={() => setIsLoad(true)} alt='card' src={urlImg} />
            </a>
        </ScrollAnimation>
    )
}
