import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.config';
import { useState } from 'react';


const auth = getAuth(app)
function App() {



  const googleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const [user,setUser] = useState({})
  

 const handleGoogleLogin=()=>{
  signInWithPopup(auth, googleProvider)
   .then(result => {
    const signInUser = result.user;
    setUser(signInUser)

   })
 }

 const handleLogOut = ()=>{
  signOut(auth)
  .then(() => {
    setUser({})
  }).catch((error) => {
    
  });
 }

const handleGithubLogin =()=>{
  signInWithPopup(auth, GithubProvider)
  .then(result =>{
    const GithubUser = result.user;
    setUser(GithubUser)
  })
  .catch(err => {
    console.log(err);
  })
}

  return (
   <div>

    <h1>Login System</h1>

    {
      user.uid ? <button onClick={handleLogOut}>Sing Out</button> :<div>
         <button onClick={handleGoogleLogin}>Login With Google</button> <button onClick={handleGithubLogin}>Github Login</button>
      </div>
      
    }

     {
      user.uid && <div>
         <h4>Name: {user.displayName}</h4>
         <p>Email: {user.email}</p>
         <img src={user.photoURL} alt={user.displayName} />
      </div>
     }

   </div>
  )
}

export default App
