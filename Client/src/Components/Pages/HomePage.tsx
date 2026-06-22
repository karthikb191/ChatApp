import { SubmitButton } from "./../InputComponents.tsx"
import {useAuthContext} from "./../../Store/authContext.tsx";
import ChatPage from "./ChatPage.tsx"
import UsersList from "../UsersList.tsx";

const HomePage = () =>
{
    return (
        <>
            <div className="flex-col h-full center-stretch">
                <div className="flex-row">
                    <UsersList />        
                    <ChatPage />
                </div>
            </div>
        </>
    );
}

export default HomePage;