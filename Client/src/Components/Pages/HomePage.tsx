import { SubmitButton } from '../InputComponents'
import {useAuthContext} from './../../Store/authContext';

const HomePage = () =>
{
    const {signout} = useAuthContext();

    function OnSignoutClicked(event : React.MouseEvent<HTMLButtonElement>)
    {
        event.preventDefault();
        console.log("Signout Button clicked");
        signout();
    }

    return (
        <>
            <div className="centerAlign">
                <h1> This is Home page </h1>
                <SubmitButton name="signOut" text="Sign Out" onClick={OnSignoutClicked}></SubmitButton>                
            </div>
        </>
    );
}

export default HomePage;