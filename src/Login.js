import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
const cookie = new Cookies();

const Login = () => {
  const [cookies, setCookie] = useCookies(["AdminJwt"]);
  const [getLoginId, setLoginId] = useState("");
  const [getPassword, setPassword] = useState("");
  const [cookiess, setCookies] = useCookies();

  const navigate = useNavigate();

  useEffect(() => {
    var uName = localStorage.getItem("AdminJwt");
    if (uName !== null) {
      navigate("/admindashboard");
    }
  });

  const btnLogin = async () => {
    if (getLoginId == "") {
      alert("Enter Login Id");
    } else if (getPassword == "") {
      alert("Enter Password");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var url = "https://bot007007.herokuapp.com/login";

      var raw = JSON.stringify({
        email: getLoginId,
        password: getPassword,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            var adminJwt = result.AdminJWT;
            localStorage.setItem("AdminJwt", adminJwt);
            // setCookie("AdminJwt", adminJwt);
            //setCookie("refreshHomepage", "0");
            window.location.reload();
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const onSubmitbtn = (e) => {
    if (e.keyCode === 13) {
      // btnLogin();
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="container authentication-form">
          <h2 className="text-center">{"Login"}</h2>
          <div className="underline"></div>

          <form
            className="login-iiner"
            name="form"
            onKeyDown={(e) => {
              onSubmitbtn(e);
            }}
          >
            <div className="col mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-2"
                value={getLoginId}
                onChange={(e) => {
                  setLoginId(e.target.value);
                }}
                placeholder=""
              />
            </div>
            <div className="col mt-4">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-2"
                value={getPassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=""
              />
            </div>

            <a
              className="btn btn-primary w-100 mt-4 btn-md"
              onClick={btnLogin.bind(this)}
            >
              Login
            </a>
           
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
