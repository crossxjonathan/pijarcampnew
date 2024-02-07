import React, { useState } from "react";
import AuthForm from "./authForm";
import SignInRoute from "hoc/signInRoute"


const RegisterLogin = (props) => {
    const [formType] = useState(false);


    return(
        <SignInRoute>
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                           <>
                               <h1>Welcome</h1>
                           </>
                    </div>
                    <div className="right">
                        <h2>{'Sign in'}</h2>
                        <AuthForm
                           formType={formType}
                           {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
        </SignInRoute>
    )
}


export default RegisterLogin;