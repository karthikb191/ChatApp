import { useEffect, useState } from "react";
import { axiosInstance } from "../Lib/axios.tsx";
import type { AxiosError } from "axios";

type SignupFormParams =
{
    username : string,
    email : string,
    password : string
};

class AuthContext
{
    constructor()
    {
        this.authUser = null;
        this.isCheckingAuth = true;
        this.isSigningUp = false;
        this.isLoggingIn = false;

        this.LoggingInUpdateCallback = () => {}
        this.SigningUpUpdateCallback = () => {}
        this.AuthCheckUpdateCallback = () => {}
        this.AuthUserUpdatedCallback = () => {}
    }

    GetAuthenticatedUser()
    {
        return this.authUser;
    }
    IsCheckingAuth() { return this.isCheckingAuth; }
    IsSigningUp() { return this.isSigningUp; }
    IsLoggingIn() { return this.isLoggingIn; }

    async CheckAuth()
    {
        console.log("Checking authentication");
        try
        {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));

            const res = await axiosInstance.get("/auth/check");
            console.log("Successfully fetchhed auth user: " + this.authUser);
            this.authUser = res;
        }
        catch(error)
        {
            this.authUser = null;
            console.log("Error when checking authentication ", error);
        }
        finally
        {
            console.log("Finished Auth Check");
            this.isCheckingAuth = false;

            this.AuthCheckUpdateCallback(this.isCheckingAuth);
            this.AuthUserUpdatedCallback(this.authUser);
        }
        return false;    
    }

    async TryLogin()
    {
        console.log("Trying to Login");
        return false;
    }

    async TrySignUp(data : SignupFormParams)
    {
        console.log("Trying to signup");
        
        try
        {
            this.isSigningUp = true;
            this.SigningUpUpdateCallback(this.isSigningUp);
            const res = await axiosInstance.post("/auth/signup", data);
            this.authUser = res.data;
            this.AuthUserUpdatedCallback(this.authUser);
        }
        catch(error)
        {
            const err = error as AxiosError
            console.log("Exception when signing up", err.response?.data);
        }
        finally
        {
            this.isSigningUp = false;
            this.SigningUpUpdateCallback(this.isSigningUp);
            console.log("Sign up complete")
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authUser: any;
    isSigningUp : boolean;
    isLoggingIn : boolean;
    isCheckingAuth : boolean;
    

    AuthCheckUpdateCallback : (checkingAuth : boolean) => void;
    SigningUpUpdateCallback : (signingUp : boolean) => void;
    LoggingInUpdateCallback : (loggingIn : boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AuthUserUpdatedCallback : (authUser : any) => void;
}

const authContext = new AuthContext();

function useAuthContext()
{
     const [isSigningUp, setIsSigningUp] = useState(false);
     const [isLoggingIn, setIsLoggingIn] = useState(false);
     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
     const [authUser, setAuthUser] = useState();
     const [checkAuth] = useState(() => () => authContext.CheckAuth());
     const [signup] = useState(() => (data : SignupFormParams) => authContext.TrySignUp(data))

     useEffect(()=>{
        console.log("Auth context use effect running");
        
        function AuthCheckUpdate(checkingAuth: boolean)
        {
            if(isCheckingAuth != checkingAuth)
            {
                setIsCheckingAuth(checkingAuth);
            }
        }
        function SigningUp(signingUp : boolean)
        {
            if(isSigningUp != signingUp)
            {
                setIsSigningUp(signingUp);
            }
        }
        function LoggingIn(loggingIn: boolean)
        {
            if(isLoggingIn != loggingIn)
            {
                setIsLoggingIn(loggingIn);
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function SetAuthUser(authUser : any)
        {
            setAuthUser(authUser);
        }
        
        authContext.AuthCheckUpdateCallback = AuthCheckUpdate;
        authContext.SigningUpUpdateCallback = SigningUp;
        authContext.LoggingInUpdateCallback = LoggingIn;
        authContext.AuthUserUpdatedCallback = SetAuthUser;
     }, [isCheckingAuth, isSigningUp, isLoggingIn, checkAuth, authUser]);
     
     return { isSigningUp, isLoggingIn, isCheckingAuth, checkAuth, authUser, signup};
};

export {authContext, useAuthContext};
export type {SignupFormParams};