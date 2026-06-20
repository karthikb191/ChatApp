import { useEffect, useState } from "react";
import { axiosInstance } from "../Lib/axios.tsx";
import type { AxiosError } from "axios";
import { create } from "zustand";

type SignupFormParams =
{
    username : string,
    email : string,
    password : string
};

type SigninFormParams = 
{
    email : string,
    password : string
}

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

    async TrySignin(data: SigninFormParams)
    {
        console.log("Trying to Login");
        try
        {
            this.isLoggingIn = true;
            this.LoggingInUpdateCallback(this.isLoggingIn);
            const res = await axiosInstance.post("/auth/api/signin", data);
            console.log("Received Response: ", res.data);
        }
        catch(error)
        {
            const err = error as AxiosError;
            console.log("Exception when logging in: ", err.response?.data)
        }
        finally
        {
            this.isLoggingIn = false;
            this.LoggingInUpdateCallback(this.isLoggingIn)
        }
    }

    async TrySignUp(data : SignupFormParams)
    {
        console.log("Trying to signup");
        
        try
        {
            this.isSigningUp = true;
            this.SigningUpUpdateCallback(this.isSigningUp);
            const res = await axiosInstance.post("/auth/signup", data);
            console.log("Received response: ", res.data);
            this.authUser = res.data;
            this.AuthUserUpdatedCallback(this.authUser);
        }
        catch(error)
        {
            const err = error as AxiosError;
            console.log("Exception when signing up", err.response?.data);
        }
        finally
        {
            this.isSigningUp = false;
            this.SigningUpUpdateCallback(this.isSigningUp);
            console.log("Sign up complete")
        }
    }

    async Signout()
    {
        console.log("Signing Out");
        try
        {
            const res = await axiosInstance.get("/auth/signout");
            console.log("Received response: ", res.data);
        }
        catch(error)
        {
            const err = error as AxiosError;
            console.log("Exception when signing out: ",  err.response?.data);
        }
        finally
        {
            console.log("Signout successful");
            this.authUser = null;
            this.AuthUserUpdatedCallback(this.authUser);
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

// const authContext = new AuthContext();


// function useAuthContextManual()
// {
//      const [isSigningUp, setIsSigningUp] = useState(false);
//      const [isLoggingIn, setIsLoggingIn] = useState(false);
//      const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//      const [authUser, setAuthUser] = useState();
//      const [checkAuth] = useState(() => () => authContext.CheckAuth());
//      const [signup] = useState(() => (data : SignupFormParams) => authContext.TrySignUp(data));
//      const [signin] = useState(() => (data : SigninFormParams) => authContext.TrySignin(data));
//      const [signout] = useState(() => () => authContext.Signout());

//      useEffect(()=>{
//         console.log("Auth context use effect running");
        
//         function AuthCheckUpdate(checkingAuth: boolean)
//         {
//             if(isCheckingAuth != checkingAuth)
//             {
//                 setIsCheckingAuth(checkingAuth);
//             }
//         }
//         function SigningUp(signingUp : boolean)
//         {
//             if(isSigningUp != signingUp)
//             {
//                 setIsSigningUp(signingUp);
//             }
//         }
//         function LoggingIn(loggingIn: boolean)
//         {
//             if(isLoggingIn != loggingIn)
//             {
//                 setIsLoggingIn(loggingIn);
//             }
//         }

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         function SetAuthUser(authUser : any)
//         {
//             console.log("Setting auth user in context!!!!!!!!!!!");
//             setAuthUser(authUser);
//         }
        
//         authContext.AuthCheckUpdateCallback = AuthCheckUpdate;
//         authContext.SigningUpUpdateCallback = SigningUp;
//         authContext.LoggingInUpdateCallback = LoggingIn;
//         authContext.AuthUserUpdatedCallback = SetAuthUser;
//      }, [isCheckingAuth, isSigningUp, isLoggingIn, checkAuth, authUser]);
     
//      return { isSigningUp, isLoggingIn, isCheckingAuth, checkAuth, authUser, signup, signin, signout};
// };

interface AuthContextParams {
    authUser: null,
    isSigningIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    checkAuth: ()=>void;
    signup: (arg0: SignupFormParams)=>void;
    signin: (arg0: SigninFormParams)=>void;
    signout: ()=>void;
}


export const useAuthContext = create<AuthContextParams>(
    (set)=>
    (
        {
            authUser: null,
            isSigningIn: false,
            isSigningUp: false,
            isCheckingAuth: true,

            checkAuth: async () =>
            {
                console.log("Checking authentication");
                try
                {
                    await new Promise(resolve => setTimeout(resolve, 5 * 1000));

                    const res = await axiosInstance.get("/auth/check");
                    console.log("Successfully fetchhed auth user: ", res.data);
                    set({authUser: res.data});
                }
                catch(error)
                {
                    set({authUser: null});
                    console.log("Error when checking authentication ", error);
                }
                finally
                {
                    console.log("Finished Auth Check");
                    set(() => ({isCheckingAuth: false}));
                }
            },

            signin: async (data: SigninFormParams) =>
            {
                console.log("Trying to Login");
                try
                {
                    set({isSigningIn: true});
                    const res = await axiosInstance.post("/auth/signin", data);
                    set({authUser: res.data});
                    console.log("Received Response: ", res.data);
                }
                catch(error)
                {
                    const err = error as AxiosError;
                    console.log("Exception when logging in: ", err.response?.data)
                }
                finally
                {
                    set({isSigningIn: false});
                }
            },

            signup: async(data : SignupFormParams) =>
            {
                console.log("Trying to signup");
                
                try
                {
                    set({isSigningUp: true});
                    const res = await axiosInstance.post("/auth/signup", data);
                    console.log("Received response: ", res.data);
                    set({authUser:res.data});
                }
                catch(error)
                {
                    const err = error as AxiosError;
                    console.log("Exception when signing up", err.response?.data);
                }
                finally
                {
                    set({isSigningUp: false})
                    console.log("Sign up complete")
                }
            },

            signout: async() =>
            {
                console.log("Signing Out");
                try
                {
                    const res = await axiosInstance.get("/auth/signout");
                    console.log("Received response: ", res.data);
                }
                catch(error)
                {
                    const err = error as AxiosError;
                    console.log("Exception when signing out: ",  err.response?.data);
                }
                finally
                {
                    console.log("Signout successful");
                    set({authUser: null});
                }
            }

        }
    )
);

export type {SignupFormParams, SigninFormParams};