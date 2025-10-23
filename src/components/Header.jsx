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
    <div className="absolute top-0 left-0 w-full px-4 py-3 bg-gradient-to-b from-black z-10 flex items-center justify-between">
        <img src={LOGO_URL} alt='logo' className='w-24 md:w-36 object-contain' />
        {user && (
          <div className='flex items-center gap-2 md:gap-4'>
            { showGPTSearch &&
            <select className='p-2 bg-gray-800 text-white rounded-lg text-sm md:text-base' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang)=>(
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          }
            <button className='py-1.5 px-3 md:py-2 md:px-4 bg-purple-700 text-white rounded-lg text-sm md:text-base' onClick={handleGPTSearchClick}> {showGPTSearch ? "Home" : "GPT Search"}</button>
            <img src={user?.photoURL} alt='user-icon' className='w-8 h-8 md:w-9 md:h-9 rounded-full'></img>
            <button onClick={handleSignOut} className='text-white font-semibold text-sm md:text-base'>Sign Out</button>
            </div>
      )}
    </div>
    
  )
}

export default Header