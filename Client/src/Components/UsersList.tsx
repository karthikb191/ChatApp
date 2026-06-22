import React, { useEffect, type ReactElement } from "react";
import {useAuthContext} from "./../Store/authContext.tsx"
import { useChatContext } from "../Store/ChatContext.tsx";
import UserItemWidget from "./UserItemWidget.tsx";
import "./CSS/UsersList.css"

const UsersList = () => 
{
    const {fetchUsers, isFetchingUsers, userModels} = useChatContext();

    useEffect(()=>{
        console.log("Fetching all users");
        fetchUsers();
      }, [fetchUsers])

    if(isFetchingUsers)
    {
        return(
            <>
            <div>
                ...
            </div>
            </>
        )
    }

    function GetUserItemWidgets()
    {
        const widgets : ReactElement[] = [];

        userModels.forEach(user => {
            widgets.push(
                (
                    <UserItemWidget userModel={user} key={user.id}/>
                )
            )
        });
        
        return widgets;
    }

    return (
    <>
        <div id="_UsersList" className="flex-col top-center">
        {
            GetUserItemWidgets()
        }
        </div>
    </>
    );
}

export default UsersList