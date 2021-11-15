import React , {useState} from "react";
import './LoginScreen.css'
import SignupScreen from './SignupScreen';
function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className="loginScreen">
        <div className="loginScreen__background">
                <div className="loginScreen__nav">
                <img
                    className="loginScreen__logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt=""
                />
                    <button
                    className="loginScreen__button"
                    onClick={()=> setSignIn(true)}>Sign In</button>
                </div>
                <div className="loginScreen__gradient"></div>
            </div>
            {signIn ? (
                <SignupScreen/>
            ): (
                <div className="loginScreen__body">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                <div className="loginScreen__input">
                    <form>
                        <input type="email" placeholder="Email adress" />
                        <button onClick={()=> setSignIn(true)}>
                            Get Started
                        </button>
                    </form>
                </div>
                </div>
            )}
            
      </div>
  )
 
}

export default LoginScreen;
