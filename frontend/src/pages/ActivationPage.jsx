import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div className={'text-center content-center items-center' }>
          <p className={'pl-1'}>Your account has been created suceessfully!</p>
          <div className={'items-center pl-20 pt-4'}>
            <Link to='/login' >
              <div className={`${styles.button} text-[#fff] `}>
                Sign In
              </div>
            </Link>
          </div>
          
        </div>
        
      
       )} 
    </div>
  );
};

export default ActivationPage;
