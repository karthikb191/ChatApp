
import { axiosInstance } from "../Lib/axios.tsx";
import type { AxiosError } from "axios";
import { create } from "zustand";
import { type UserModel } from "../Components/UserItemWidget.tsx";

interface MessageContextParams {
    isFetchingUsers : boolean,
    userModels : UserModel[],
    fetchUsers : () => void,
};

interface UserPayload
{
    email : string,
    username : string,
    _id : string,
};

export const useChatContext = create<MessageContextParams>(
    (set) => (
    {
        isFetchingUsers : false,
        userModels : [],

        fetchUsers : async () =>
        {
            console.log("Fetching users");
            try
            {
                set({isFetchingUsers: true});
                const res = await axiosInstance.get("/messages/users");
                
                const users = res.data as UserPayload[];

                users.forEach(rawUser => {
                    const user =
                    {
                        name: rawUser.username,
                        id: rawUser._id
                    }
                    
                    console.log("Fetched user: ", {user})

                    set((state) =>
                    {
                        if(state.userModels.find(x => x.id == user.id))
                        {
                            //Duplicate entry. Don't update the list
                            return ({});
                        }

                        return ({
                            userModels: [...state.userModels, user]
                        });
                    });

                });
            }
            catch(error)
            {
                const axiosErr = error as AxiosError;
                console.log("ERROR: ", axiosErr.message);
            }
            finally
            {
                console.log("Finished fetching users");
                set({isFetchingUsers: false});
            }
        }   
    }
    )
);