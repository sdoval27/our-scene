import React from 'react';
import { Link } from 'react-router-dom';

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
      textShadow: '1.5px 2.5px #000000'
  },
}

const PostList = ({
  posts,
  content,
  _id,
  createdAt,
  userPost,
  showContent = true,
  showUsername = true,
}) => {
<<<<<<< HEAD
  if (!posts) {
    return <h3 className='renderData' style={styles.Text}>No Posts Yet</h3>;
=======
  if (!posts.length) {
    return <h3 style={styles.Text}>No Posts Yet</h3>;
>>>>>>> 5d54479dd2f08820d384e220379b4f0df2aa5cad
  }

  return (
    <div style={styles.Text}>
      {showContent && <h3>{content}</h3>}
      {posts &&
<<<<<<< HEAD
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="renderData card-header bg-primary text-light p-2 m-0">
=======
        posts.map((posts) => (
          <div key={posts._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
>>>>>>> 5d54479dd2f08820d384e220379b4f0df2aa5cad
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profile/${posts._id}`}
                >
                  {posts.userPosts} <br />
                  <span style={{ fontSize: '1rem' }}>
                    published: {createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You published this on {createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <h1>{posts.content}</h1>
              <p>{posts.userPost}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${posts._id}`}
            >
              Learn more.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
