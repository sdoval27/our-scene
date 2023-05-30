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
      textShadow: '2px 2px #000000'
  },
}

const PostList = ({
  posts,
  content,
  createdAt,
  event,
  userLocation,
  user,
  showContent = true,
  showUsername = true,
}) => {
  if (!posts) {
    return <h3 className='Text'>No Posts Yet</h3>;
  }

  return (
    <div className='Text'>
      {showContent && <h3>{content}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profile/${posts.user._id}`}
                >
                  {posts.user.username} <br />
                  <span style={{ fontSize: '1rem' }}>
                    published: {posts.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You published this on {posts.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.content}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${post._id}`}
            >
              Learn more.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
