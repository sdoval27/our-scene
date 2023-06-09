import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './style/Home.css';

import rave from '../images/rave.jpg'

//queries
import { QUERY_POSTS } from '../utils/queries';

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
    // Rave: {
    //     width:'90%',
    //     justifyContent: 'center',
    // }
}


function Home() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);
    return(
        <div className ='app .align-content-center' style={styles.Center}>                  
            <div className="concertTitle row">
                <h1 style={styles.Text}>Concerts</h1>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
            <PostList className='renderData' posts={posts}/>
            )}
            {/* <div className="row hideImg">
                <img src={rave} alt="audience hands" style={styles.Disk} />
            </div> */}
            <div>
                <div className="row"></div>
            </div>
        </div>        
    )

}


export default Home;
