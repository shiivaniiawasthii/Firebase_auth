import { useContext, useState } from 'react';
import axios from "axios"
import classes from './AuthForm.module.css';
import AuthContext from '../../Context_store/authContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
 const authCtx =useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault()
  
    let returnSecureToken=true
    let obj={email,password,returnSecureToken}
    console.log(obj)
    let url;
    if(isLogin) url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJTHfMCiU-JMBVIyx_tnS0SdzBqM4PlR0"
     else url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJTHfMCiU-JMBVIyx_tnS0SdzBqM4PlR0"

 axios.post(url, 
  obj,{
    headers: {
        'Content-Type': 'application/json',
       }
  })
.then((res) => {
  
  // console.log(res.data.idToken,"ressss")
  if(isLogin){
    alert("successfully signed in")
    authCtx.login(res.data.idToken)
    console.log(AuthContext,37)
    // console.log(authCtx.login())
  }
  else alert("successfully signed up")
  return res.data

})
.catch((err) => {
  alert(err.response.data.error.message)
  console.log("AXIOS ERROR: ", err.response.data.error.message);
})
  
}

  
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
