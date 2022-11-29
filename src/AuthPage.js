import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
function AuthPage(props) {
  let { token } = useParams();
  const [url, setUrl] = useState({});

  useEffect(async () => {
    let result = await axios.get("https://bot007007.herokuapp.com/start", {});
    console.log("result.data.authUrl", result);
    setUrl(result.data.authUrl);
  }, []);
  
  return (
    <>
       <div className="login-page">
       <div className="container authentication-form">
          <h4>Authorization</h4>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has b
          </p>
          <div className="auth-button">
            <button
              className="auth-btn"
              onClick={() => {
                window.location.href = url;
              }}
            >
              <FontAwesomeIcon icon={faHeart} /> Authorization
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
