import React from 'react';
import 'react-bootstrap';


//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';


function Profile() {
    return(
        <div className ='.align-content-center'>
            <FontAwesomeIcon icon={faComments} style={{color: "#ffae00",}} />
           Render profile here
        </div>
    )

}

export default Profile;