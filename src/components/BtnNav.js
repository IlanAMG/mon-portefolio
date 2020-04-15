import React from 'react'

export const BtnNav = ({ isVisible, setIsVisible }) => {
    const handleNav = () => {
        setIsVisible(!isVisible)
    }
    return (
        <div className={isVisible ? 'wrapper-menu wrapper-croix' : 'wrapper-menu'} onClick={handleNav}>
          <div className='ligne'></div>
        </div>
    )
}
