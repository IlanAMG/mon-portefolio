import React, { useContext, useEffect, useState } from 'react'
import transition from '../ASSETS/transition.jpg'
import Context from '../untils/context'

export const WallTransition = () => {
    const  { styleWallUp, styleWallDown, transitionFinish, setTransitionFinish } = useContext(Context)
    const [isLoad1, setIsLoad1] = useState(false)
    const [isLoad2, setIsLoad2] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTransitionFinish(true)
        }, 500)
    }, [setTransitionFinish])
    return (
        !transitionFinish &&
        <div className='container-wall'>
            <div className='wall-transitionUp' style={styleWallUp}><img style={isLoad1 ? {} : {display: 'none' }} onLoad={() => setIsLoad1(true)} alt='wall' src={transition} /></div>
            
            <div className='wall-transitionDown' style={styleWallDown}><img style={isLoad2 ? {} : {display: 'none' }} onLoad={() => setIsLoad2(true)} alt='wall' src={transition}/></div>
        </div>
    )
}
