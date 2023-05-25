import React from 'react';
import 'react-bootstrap';
// import './style/Concert.css';

import diskJockey from '../images/onesandtwos.jpg'

const styles = {
    Center: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        fontFamily: 'Orbitron',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px #000000'
    },
}

function Concerts() {
    return(
        <div style={styles.Center}>                  
            <div className="row">
                <h1 style={styles.Text}>Concerts</h1>
            </div>
            <div className="row">
                <img src={diskJockey} alt="dj" />
            </div>
            <div>
                <div className="row"></div>
            </div>
        </div>        
    )

}

export default Concerts;