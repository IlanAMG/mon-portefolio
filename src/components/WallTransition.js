import React, { useContext, useEffect } from 'react'
import transition from '../ASSETS/transition.jpg'
import Context from '../untils/context'

export const WallTransition = () => {
    const  { styleWallUp, styleWallDown, transitionFinish, setTransitionFinish } = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
            setTransitionFinish(true)
        }, 500)
    }, [setTransitionFinish])
    return (
        !transitionFinish &&
        <div className='container-wall'>
            <div className='wall-transitionUp' style={styleWallUp}><img alt='wall' src={transition} /></div>
            
            <div className='wall-transitionDown' style={styleWallDown}><img alt='wall' src={transition}/></div>
        </div>
    )
}
