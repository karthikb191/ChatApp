
import { Link } from "react-router-dom";
import {useAuthContext} from "./../Store/authContext.tsx"

import "../App.css"
import "./CSS/NavBar.css"

const NavBar = () => {
    const {signout, authUser} = useAuthContext();

    return (<>

        <header className="w-full text-color flex-row">
            <div className="flex-row flex-fill center-align">
                <div className="flex-fill text-center">
                    <Link to="/">
                        <h3 className="text-color">Home</h3>
                    </Link>
                </div>

                <div className="flex-fill text-center">
                    {authUser &&
                    (                        
                        <button onClick={signout} className="text-color nobg shrink-on-click"> signout</button>
                    )
                    }
                </div>
            </div>
        </header>

    </>);
}

export default NavBar;