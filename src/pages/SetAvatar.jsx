import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Helmet } from "react-helmet-async";

const SetAvatar = () => {
  const api = `https://api.multiavatar.com/45678945`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const token = localStorage.getItem("token"); // Get the token from local storage

      try {
        const { data } = await axios.post(
          `${setAvatarRoute}/${user._id}`,
          {
            image: avatars[selectedAvatar],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token as an authorization header
            },
          }
        );

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          navigate("/profile");
        } else {
          toast.error("Avatar not setting. Please try again.", toastOptions);
        }
      } catch (error) {
        console.error("Error setting profile picture:", error);
        toast.error("Error setting profile picture. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const data = [];
    async function fetchData() {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, [api]);

  return (
    <>
      <Helmet>
        <title>SetAvatar</title>
        <meta name="description" content="Set your profile picture/avatar." />
        <link rel='canonical' href='/setAvatar' />
      </Helmet>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your prifile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn bg-transparent border-2 border-[#4e0eff] text-[#4e0eff] hover:bg-opacity-10 hover:bg-gray-300 rounded-full" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    padding: 1rem 2rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
  }
`;
