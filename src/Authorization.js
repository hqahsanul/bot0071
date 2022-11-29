import React, { useState, useEffect, useHistory } from 'react'
import {useParams , useLocation, }  from 'react-router-dom'
function Authorization(props){
    const location = useLocation();
    const JWT = new URLSearchParams(location.search).get('token');
   
    localStorage.setItem('JWT', JWT);

   return JWT
}

export default Authorization;