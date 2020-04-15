import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';

export const Text = ({ compétences, paragraphe, numText, height}) => {

    return (
        <ScrollAnimation className='container-projets' animateIn="fadeIn" animateOnce={true} delay={200}>
                <div className='space'></div>
                <div className={numText} style={{ height: height }}>
                    <p>{paragraphe}</p>
                    <span>Compétences utilisées : {compétences}...</span>
                </div>
        </ScrollAnimation>
    )
}
