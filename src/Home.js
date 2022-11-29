import React, { useState, useEffect, useHistory, Redirect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faRotateLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import GridLayoutLoader from "./GridLayoutLoader";

import "./Homepage.css";

import { useParams, useLocation, json, Navigate } from "react-router-dom";
import axios from "axios";

function Home() {
  let JWT = "";
  const location = useLocation();
  let token = new URLSearchParams(location.search).get("token");
  let Tuser = new URLSearchParams(location.search).get("Tuser");

  if (!Tuser) {
    Tuser = localStorage.getItem("Tuser");
  } else {
    localStorage.setItem("Tuser", Tuser);
  }

  if (!token) {
    token = localStorage.getItem("JWT");
  } else {
    localStorage.setItem("JWT", token);
  }
  const [tweet, setTweet] = useState([
  ]);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [followers, setFollowers] = useState([]);

  const getTweets = async () => {
    const response = await axios.get(`https://bot007007.herokuapp.com/?Tuser=${Tuser}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
        Tuser: "bhaguramdadrwa1",
      },
    });

    console.log("response>>>>>>>>>>>>????????", response);
    if (response.status == 200) {
      setShow(true);
      setisLoading(false);
      setTweet(response.data.tweets);
    } else {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (token != null) {
      getTweets();
      setisLoading(true);
    }
  }, []);

  const removeCard = async (id) => {
    setisLoading(true);
    const response = await axios.get(
      `https://bot007007.herokuapp.com/delete/?TweetId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );
    if (response.status == 200) {
      const newList = tweet.filter((item) => item.id !== id);
      setTweet(newList);
      getTweets();
    } else {
      setisLoading(false);
    }
    console.log("response>>>>>>>>>>>>????????<<<MMMMMMMMMMM", response);
  };

  const handleChange = (e, id, index) => {
    let value = e.target.value;
   
   

    var data  = [...tweet]
    data[index].iscomment = value
    setTweet(data)
    console.log("dfgdfg",data)
    // console.log('value', value, 'e', e);
  };

  const onReply = async (e, id, tweetId, comments) => {

    console.log("comments",comments)
    if (comments == undefined) {
      alert("Please enter a comment");
    } else {
      
      setisLoading(true);
      const response = await axios.get(
        `https://bot007007.herokuapp.com/reply/?ID=${id}&TweetId=${tweetId}&reply=${comments}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      if (response.status == 200) {
        getTweets();
       window.location.reload();
       
       // const newList = tweet.filter((item) => item.id !== id);
        //setTweet(newList);
      } else {
        setisLoading(false);
      }
      console.log("response>>>>>>>>>>>>????????<<<MMMMMMMMMMM", response);
    }
  };

  const likedtweet = async (id) => {
    setisLoading(true);
    const response = await axios.get(`https://bot007007.herokuapp.com/like/?ID=${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    if (response.status == 200) {
      getTweets();
    } else {
      setisLoading(false);
    }
    console.log("response>>>>>>>>>>>>????????<<<MMMMMMMMMMM", response);
  };

  const unlikedtweet = async (id) => {
    setisLoading(true);
    const response = await axios.get(
      `https://bot007007.herokuapp.com/dislike/?ID=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );
    if (response.status == 200) {
      getTweets();
    } else {
      setisLoading(false);
    }
  };

  const removeCardtweet = async (id) => {};

  const retweet = async (id) => {
    setisLoading(true);
    const response = await axios.get(
      `https://bot007007.herokuapp.com/retweet/?ID=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );

    if (response.status == 200) {
      getTweets();
    } else {
      setisLoading(false);
    }
  };

  const unretweet = async (id) => {
    setisLoading(true);
    const response = await axios.get(
      `https://bot007007.herokuapp.com/unretweet/?ID=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );

    if (response.status == 200) {
      getTweets();
    } else {
      setisLoading(false);
    }
  };

  return (
    <>
      {token ? (
        <main>
          {isLoading && (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          )}

          <div className="section-title">
            <h2>{"tweets"}</h2>
            <div className="underline"></div>
          </div>
          <section className="followers">
            <div className="container">
              {tweet.map((item, index) => {
                return (
                  <article className="card" key={index}>
                    <div className="card-cross">
                      <a class="special" onClick={() => removeCard(item?.id)}>
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                      </a>
                    </div>
                    <div className="card-block">
                      <div className="card-header">
                        <img src={item?.user?.profile_image_url} />
                        {/* <h4>${login}</h4> */}
                      </div>
                      <div className="card-middle">
                        <p style={{ color: "#000" }}> {item?.user?.name}</p>
                        <p style={{ color: "#000" }}> {item?.full_text}</p>
                      </div>

                      <div className="card-footer">
                        <a class="special">
                          <FontAwesomeIcon icon={faComment} />
                        </a>
                        {item?.retweeted == true ? (
                          <a
                            class="special"
                            onClick={() => {
                              unretweet(item?.id_str);
                            }}
                          >
                            <FontAwesomeIcon icon={faRotateLeft} color="red" />
                          </a>
                        ) : (
                          <a
                            class="special"
                            onClick={() => {
                              retweet(item?.id_str);
                            }}
                          >
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </a>
                        )}

                        <a>
                          {item?.favorited == true ? (
                            <a
                              class="special"
                              onClick={() => {
                                unlikedtweet(item?.id_str);
                              }}
                            >
                              <FontAwesomeIcon icon={faHeart} color="red" />
                            </a>
                          ) : (
                            <a
                              class="special"
                              onClick={() => {
                                likedtweet(item?.id_str);
                              }}
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </a>
                          )}
                        </a>
                      </div>

                      <div className="comment-box mt-3">
                        <textarea
                          onChange={(e) => handleChange(e, item.id_str,index)}
                          placeholder="Comment"
                          value={item.iscomment}
                        ></textarea>
                      </div>

                      <div className="reply-btn">
                        <a
                          className="btn btn-primary btn-md mt-3"
                          onClick={(e) => {
                            onReply(e, item.id_str, item.id, item.iscomment);
                          }}
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
}

export default Home;
