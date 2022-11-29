import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showform, setshowform] = useState(false);
  const [setuser, setusername] = useState("");
  const [tokenuser, settokenuser] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    var uName = localStorage.getItem("AdminJwt");
    settokenuser(uName);
    if (uName == null) {
      navigate("/adminlogin");
    } else {
      getList(uName);
    }
  });

  const getList = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://bot007007.herokuapp.com/UserNames", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          setTasks(result.UserNames);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const btnsave = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", tokenuser);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: setuser,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://bot007007.herokuapp.com/AddUserName", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          getList(tokenuser);
          setshowform(!showform);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const btnDelete = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", tokenuser);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ID: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://bot007007.herokuapp.com/DeleteUserName", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          getList(tokenuser);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="section-title p-5">
        <div className="w-50 mx-auto ">
          <div className="pt-5 pb-5 d-flex align-items-center justify-content-between">
            <div>
              <h2 className="text-center mb-0">{"Dashboard"}</h2>
              <div className="underline mt-2"></div>
            </div>

            <a
              className="btn btn-primary btn-md"
              onClick={() => {
                setshowform(!showform);
              }}
            >
              Add
            </a>
          </div>

          {showform && (
            <>
              <div className="col">
                <label>username</label>
                <input
                  type="text"
                  className="form-control  mt-2"
                  value={setuser}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  placeholder=""
                />
              </div>

              <a
                className="btn btn-primary w-50 mt-4 btn-md"
                onClick={btnsave.bind(this)}
              >
                Save
              </a>
            </>
          )}
          <div className="mt-4"></div>

          {tasks.map((task, index) => (
            <div className="pb-2 mb-2 border-bottom d-flex align-items-center justify-content-between">
              <span className={"todo-text"}>{task.username}</span>

              <a
                className="btn btn-danger btn-sm special color-red"
                onClick={btnDelete.bind(this, task._id)}
              >
                Delete
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
