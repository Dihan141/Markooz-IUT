import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ForgotPassActivationPage = () =>{
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/changepassword`,
        { activation_token, newPassword, confirmPassword }
      )
      .then((response) => {
        toast.success(response.data.message);
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  
    // useEffect(() => {
    //   if (activation_token) {
    //     const sendRequest = async () => {
    //       await axios
    //         .post(`${server}/user/activation`, {
    //           activation_token,
    //         })
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           setError(true);
    //         });
    //     };
    //     sendRequest();
    //   }
    // }, []);

  useEffect(()=>{
    checkTokenValidity()
  })

  const checkTokenValidity = async() => {
    await axios.post(`${server}/user/token`, {activation_token}).then(
      (response) =>{
        if(response.data.success === true){
          setError(false)
        }else{
          setError(true)
        }
      }
    ).catch((error)=>{console.log(error)})
  }
return(
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
        <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
        
      
       )} 

</div>
    );
};

export default ForgotPassActivationPage;
