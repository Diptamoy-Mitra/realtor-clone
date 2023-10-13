import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
  const location = useLocation()
  // console.log(location.pathname);
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign In");
  const auth = getAuth();
  //const [] 




  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setPageState("Profile");

      }
      else{
        setPageState("Sign In")
      }
    })
  }, [auth])

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }



  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50 '>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className='h-5 cursor-pointer' onClick={() => navigate("/")} />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li onClick={() => navigate("/")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500"}`}>Home</li>
            <li onClick={() => navigate("/offers")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-transparent border-b-[3px] ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`}>Offers</li>
            <li  onClick={() => navigate("/profile")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-transparent border-b-[3px] ${(pathMatchRoute("/sign-in") || pathMatchRoute('/profile')) &&  "text-black border-b-red-500"}`}> {pageState}</li>
          </ul>
        </div>
      </header>
    </div>

  )
}

export default Header