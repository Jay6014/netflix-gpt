import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {auth} from '../utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import  profileIcon from '../assets/profile.jpg'
import { BG_IMG } from '../utils/constants'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessages, setErrMessages] = useState([]);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const fnameRef = useRef(null);
  const confirmPwdRef = useRef(null);

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
    setErrMessages([]);
    if (emailRef.current) 
      emailRef.current.value = "";
    if (pwdRef.current) 
      pwdRef.current.value = "";
    if (fnameRef.current) 
      fnameRef.current.value = "";
    if (confirmPwdRef.current) 
      confirmPwdRef.current.value = "";
  }

  const handleButtonClick = ()=>{
    //console.log(emailRef); // In emailRef.current.value, we will be having email value
    const formFields = isSignInForm? {email : emailRef.current.value, password: pwdRef.current.value} : {fullname: fnameRef.current.value, email: emailRef.current.value, password: pwdRef.current.value, confirmpwd:confirmPwdRef.current.value}
    const errorMessages = checkValidData(formFields);
    setErrMessages(errorMessages);

    if(errorMessages.length > 0)
      return;

    if(isSignInForm){
      signInWithEmailAndPassword(auth, emailRef.current.value,pwdRef.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrMessages([errorCode + "-" + errorMessage]);
       });
    }else{
        createUserWithEmailAndPassword(auth,emailRef.current.value,pwdRef.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          //console.log(user);
          updateProfile(user, {
          displayName: fnameRef.current.value, photoURL: {profileIcon}
        }).then(() => {
          // Profile updated!
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        }).catch((error) => {
          setErrMessages([error.message]);
          
        });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessages([errorCode + "-" + errorMessage]);
        });
      }
  }
  return (
    <div className="relative h-screen w-screen">
      <Header />
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src= {BG_IMG}
          alt="bg-img"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>  {/*A semi-transparent black layer on top of the image for a darkened effect (so text stands out). */}
      </div>

      {/* Form */}
      <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       bg-black/70 w-[400px] p-12 rounded-md text-white" onSubmit={(e)=> e.preventDefault()}>
        <h1 className="text-3xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up" }</h1>

        {/* Full Name */}
        {!isSignInForm && <input
          type="text"
          placeholder="Full Name" ref={fnameRef}
          className="w-full p-3 mb-4 rounded bg-[#333] text-white p
          laceholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />}

        {/* Email */}
        <input
          type="text"
          placeholder="Email or mobile number" ref={emailRef}
          className="w-full p-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password" ref={pwdRef}
          className="w-full p-3 mb-6 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Confirm Password */}
        {!isSignInForm && <input
          type="password"
          placeholder="Confirm Password" ref={confirmPwdRef}
          className="w-full p-3 mb-6 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />}

        {/* Display error message*/}
        <ul className='m-3 list-disc'>
          {errMessages && errMessages.length > 0 && errMessages.map((err,index)=><li key={index} className='text-red-600 text-sm'>{err}</li>)}
        </ul>

        {/* Sign in button */}
        <button className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Sign in with code 
        <button className="w-full bg-gray-700 py-3 rounded font-semibold hover:bg-gray-600 transition">
          Use a sign-in code
        </button> 
        */}

        {/* Forgot password 
        <div className="text-right mt-4">
          <a href="#" className="text-sm text-gray-300 hover:underline">
            Forgot password?
          </a>
        </div>
        */}

        {/* new user */}
          <p className='text-center'>
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <button className="text-white hover:underline cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm ? "Sign up now" : "Sign In now"}
            </button>
          </p>
      </form>
    </div>
  );
};

export default Login;



