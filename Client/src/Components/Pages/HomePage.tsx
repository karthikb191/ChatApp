import { SubmitButton } from "./../InputComponents.tsx"
import {useAuthContext} from "./../../Store/authContext.tsx";
import ChatPage from "./ChatPage.tsx"

const HomePage = () =>
{
    return (
        <>
            <div className="centerAlign h-full center-stretch">
                <h1 className="text-center"> Chat page under construction.... </h1>        
                <ChatPage />
            </div>
        </>
    );
}

export default HomePage;