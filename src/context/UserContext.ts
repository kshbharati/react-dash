import React from "react";

export type UserContextType = {
    loggedIn: boolean,
    accessToken?: string,
    user?:User
}

type User = {
    id:string,
    name: string,
    email:string,
    createdAt:Date,
    updatedAt:Date,
}

const UserContext = React.createContext<UserContextType>({loggedIn:false});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;