import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/PostList.css";

const styles = {
  Center: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
  },
  Card: {
    backgroundColor:'#181E24',
  },
  Text: {
      fontFamily: 'Orbitron',
      fontWeight: 'bold',
      color: 'white',
      // textShadow: '1.5px 2.5px #000000'
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
  if (!posts.length) {
    return <h3 className='renderData'style={styles.Text}>No Posts Yet</h3>;
  }

  return (
    <div className="renderData" style={styles.Text}>
      {showContent && <h3>{content}</h3>}
      {posts &&
        posts.map((posts) => (
          <div key={posts._id} className=" card mb-3">
            {/* render data */}
            <h4 className=" button-top">
              {showUsername ? (
                <Link
                  className="button-top text-light"
                  to={`/profile/${posts._id}`}
                >
                  {posts.userPost} <br />
                  <span style={{ fontSize: '1rem' }}>
                    published {createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span className="button-bg" style={{ fontSize: '1rem' }}>
                    You published this on {createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="postbg p-2">
              <h1>{posts.content}</h1>
            </div>
            <Link
              className="button-bg  btn-block btn-squared"
              to={`/posts/${posts._id}`}
            >
              {posts.userPost}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
