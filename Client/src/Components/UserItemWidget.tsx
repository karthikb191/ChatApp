import React from "react";

type UserModel = 
{
    name : string,
    id : string
};

type UserItemPropsType =
{
    userModel : UserModel,
    onClick? : (arg0 : UserModel) => void
};

const UserItemWidget = ({userModel, onClick} : UserItemPropsType) => 
{
    function HandleUserItemClick(e : React.MouseEvent<HTMLButtonElement>)
    {
        console.log("Model Button Clicked: ", userModel.name);
        onClick?.(userModel);
    }

    return (<>
        <div className="flex-row text-center text-color h-0_5 w-9 margin-t-b-5">
            <button type="button" className="flex-fill nobg-alt shrink-on-click" 
                onClick={HandleUserItemClick}> {userModel.name} </button>
        </div>
    </>);
}

export default UserItemWidget;
export type {UserModel, UserItemPropsType};