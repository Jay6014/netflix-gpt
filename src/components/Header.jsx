import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGPTSearch } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGPTSearch = useSelector(store => store.GPT.showSearchGpt)
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
  }

   useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                //const uid = user.uid;
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        // unsubscribing onAuthStateChanged. unsubscribe when compoent unmounts
        return ()=> unsubscribe();
    },[])

  const handleGPTSearchClick = ()=>{
    dispatch(toggleGPTSearch());
  }

  const handleLanguageChange  = (e)=>{
    console.log(e.target.value)
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className=' absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between'>
        <img src={LOGO_URL} alt='logo' className='w-44 mx-auto md:mx-0' />
        {user && (
          <div className='flex p-2 m-2'>
            { showGPTSearch &&
            <select className='p-2 m-2 bg-gray-800 text-white' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang)=>(
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          }
            <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGPTSearchClick}> {showGPTSearch ? "Home" : "GPT Search"}</button>
            <img src={user?.photoURL} alt='user-icon' className='w-10 h-9 mt-2'></img>
            <button onClick={handleSignOut} className='m-2 text-white font-bold'>Sign Out</button>
        </div>
      )}
    </div>
    
  )
}

export default Header