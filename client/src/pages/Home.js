import React from 'react';
import PostList from '../components/PostList';
import 'react-bootstrap';
import './style/Home.css';


function Home() {
    return(
        <div className ='.align-content-center'>
           Render concerts here
           <PostList/>

        </div>
    )

}


export default Home;
