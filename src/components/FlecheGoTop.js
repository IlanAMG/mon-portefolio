import React, { Component } from 'react'

export default class FlecheGoTop extends Component {
    
    handleGoTop = () => (
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    )

    render() {
        document.addEventListener('DOMContentLoaded', function() {
            window.onscroll = function(ev) {
              document.getElementById("cRetour").className = (window.pageYOffset > 100) ? "cVisible" : "cInvisible";
            };
          });
        return (
            <div>
                <div><button onClick={() => this.handleGoTop()}id="cRetour" className="cInvisible" /></div>
            </div>
        )
    }
}
