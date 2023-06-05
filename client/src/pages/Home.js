import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import 'react-bootstrap';
import './style/Home.css';

import diskJockey from '../images/onesandtwos.jpg'

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
}


function Home() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);
    return(
        <div className ='app .align-content-center' style={styles.Center}>                  
            <div className="row">
                <h1 style={styles.Text}>Concerts</h1>
            </div>
            <div className="row hideImg">
                <img src={diskJockey} alt="dj" style={styles.Disk} />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
            <PostList posts={posts}/>
            )}
            <div>
                <div className="row"></div>
            </div>
        </div>        
    )

}


export default Home;
