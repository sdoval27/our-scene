import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./style/Profile.css";
import avatarImg from "../images/avatar.png";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPLOAD_PROFILE_IMAGE, UPDATE_USER_BIO } from "../utils/mutations";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMartiniGlass, faSmoking, faPills, faCannabis } from "@fortawesome/free-solid-svg-icons";

// 00FFEE
function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];
  const [drinkChecked, setDrinkChecked] = useState(false);
  const [smokeChecked, setSmokeChecked] = useState(false);
  const [candyChecked, setCandyChecked] = useState(false);
  const [weedChecked, setWeedChecked] = useState(false);
  const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE);
  const [updateUserBio] = useMutation(UPDATE_USER_BIO);

  const handleImageUpload = async (event) => {
    const file = event.target.files;
    try {
      const { data } = await uploadProfileImage({
        variables: { image: file },
      });
      const newAvatar = data.uploadProfileImage.avatar;
    } catch (err) {
      console.error(err);
    }
  };

  const handleBioChange = async (event) => {
    const bio = event.target.value;
    try {
      const { data } = await updateUserBio({
        variables: { bio: bio },
      });
      const newBio = data.updateUserBio.bio;
    } catch (err) {
      console.error(err);
    }
  };


  const handlePreferencesChange = async (event) => {

  };

  // const handleFollow = async (_id) => {
  //   try {
  //     const { data } = await followUser({
  //       variables: { user: _id },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const styles = {
    card: {
      backgroundColor: "white",
      color: "black",
    },
  };
  // if (data && data.me) {
  //   console.log(data.me);
  //   const { username, bio, preferences, events, avatar } = data.me;
  return (
    <div className="align-content-center">
      <section
        // style={{
        //   background: "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
        // }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div style={{ ...styles.card }} className="card mb-4">
                <div className="card-body text-center">
                  {/* {avatar && ( 
                <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                   )}  */}
                  {/* {!avatar && ( */}
                  <form enctype="multipart/form-data">
                    Upload Profile Photo
                    <input
                      type="file"
                      accept="image/*"
                    />
                    <button
                      onClick={handleImageUpload}
                      type="button"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#00FFEE", color: "#0C1444" }}
                    >Submit</button>
                  </form>
                  {/* )}  */}
                  {/* {username && ( */}
                  <h5 className="my-3">username</h5>
                  {/* )}  */}

                  <p className="text-muted mb-1">
                    Followers: <strong>1.2M</strong>
                  </p>
                  <p className="text-muted mb-4">Following: <strong>3.5K</strong></p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      // onClick={() => handleFollow(_id)}
                      className="btn btn-primary"
                      style={{ backgroundColor: "#00FFEE", color: "#0C1444" }}
                    >
                      Follow
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                      style={{ borderColor: "#00FFEE", color: "#00FFEE" }}
                    >
                      <Link
                        to="/inbox"
                        style={{ textDecoration: "none", color: "#00FFEE" }}
                      >
                        Message
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li
                      style={{ ...styles.card }}
                      className="list-group-item d-flex justify-content-between align-items-center p-3"
                    >
                      {/* {preferences && (
                        <ul>
                          <li>Drinks: {preferences.drink}</li>
                          <li>Smokes: {preferences.smoke}</li>
                          <li>Candy: {preferences.candy}</li>
                        </ul>
                       )}   */}
                      {/* {!preferences && (  */}
                      <form onSubmit={handlePreferencesChange}>
                        <label className="prefCheck">
                          <FontAwesomeIcon className="iconPad" icon={faMartiniGlass} style={{ color: "#FE71E0" }} />
                          <input
                            className="iconPad"
                            type="checkbox"
                            checked={drinkChecked}
                            onChange={(event) => setDrinkChecked(event.target.checked)}
                          />
                        </label>
                        <label className="prefCheck">
                          <FontAwesomeIcon className="iconPad" icon={faSmoking} style={{ color: "#FE902A", }} />
                          <input
                            type="checkbox"
                            checked={smokeChecked}
                            onChange={(event) => setSmokeChecked(event.target.checked)}
                          />
                        </label>
                        <label className="prefCheck">

                          <FontAwesomeIcon className="iconPad" icon={faPills} style={{ color: "#82FFF2 ", }} />

                          <input
                            type="checkbox"
                            checked={candyChecked}
                            onChange={(event) => setCandyChecked(event.target.checked)}
                          />
                        </label>
                        <label className="prefCheck">

                          <FontAwesomeIcon className="iconPad" icon={faCannabis} style={{ color: "#3EDA72", }} />


                          <input
                            className="iconPad"
                            type="checkbox"
                            checked={weedChecked}
                            onChange={(event) => setWeedChecked(event.target.checked)}
                          />
                        </label>


                      </form>
                      {/* )}  */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div style={{ ...styles.card }} className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      {/* {bio &&(<p className="mb-0">{bio}</p>)}  */}
                      {/* {!bio &&(  */}
                      <input
                        type="text"
                        placeholder='enter a bio'
                      />
                      {/* )} */}
                      <button
                        onClick={handleBioChange}
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#00FFEE", color: "#0C1444", margin: '10px' }}
                      >Submit</button>

                    </div>
                    <div className="col-sm-9">
                      <ul>
                        <li
                          style={{ listStyleType: "none" }}
                          className="text-muted mb-0"
                        >
                          Of The Trees
                        </li>
                        <li
                          style={{ listStyleType: "none" }}
                          className="text-muted mb-0"
                        >
                          Rezz
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* {events && (  */}
              <div className="row">
                <div className="col-md-6">
                  <div style={{ ...styles.card }} className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">events</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ ...styles.card }} className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">events</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* )}  */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// };

export default Profile;
