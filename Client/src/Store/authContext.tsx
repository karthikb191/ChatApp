import { useEffect, useState } from "react";
import { axiosInstance } from "../Lib/axios.tsx";

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
        }
        return false;    
    }

    async TryLogin()
    {
        console.log("Trying to Login");
        return false;
    }

    async TrySignUp()
    {
        console.log("Trying to signup");
        return false;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authUser: any;
    isSigningUp : boolean;
    isLoggingIn : boolean;
    isCheckingAuth : boolean;
    

    AuthCheckUpdateCallback : (checkingAuth : boolean) => void;
    SigningUpUpdateCallback : (signingUp : boolean) => void;
    LoggingInUpdateCallback : (loggingIn : boolean) => void;
}

const authContext = new AuthContext();

function useAuthContext()
{
     const [isSigningUp, setIsSigningUp] = useState(false);
     const [isLoggingIn, setIsLoggingIn] = useState(false);
     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
     const [checkAuth] = useState(() => () => authContext.CheckAuth());

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
        
        authContext.AuthCheckUpdateCallback = AuthCheckUpdate;
        authContext.SigningUpUpdateCallback = SigningUp;
        authContext.LoggingInUpdateCallback = LoggingIn;
     }, [isCheckingAuth, isSigningUp, isLoggingIn, checkAuth]);
     
     return { isSigningUp, isLoggingIn, isCheckingAuth, checkAuth};
};

export {authContext, useAuthContext};