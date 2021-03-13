import { useContext, useState } from "react";
import { UserContext } from "../lib/contexts";
import { UserRoles } from "../lib/enums";
import { UserModel } from "../lib/models";
// Component's children only shown to logged-in users
export default function AuthCheck({
    children,
    fallback,
    roleAccess,
    userAccess,
}: {
    children?: any;
    fallback?: any;
    roleAccess?: UserRoles[];
    userAccess?: string[];
}) {
    const {user} = useContext(UserContext);

    roleAccess =  roleAccess? roleAccess: [UserRoles.READER]
    userAccess = userAccess? userAccess: [user.uid]

    if(user && (userAccess.includes(user.uid) && roleAccess.includes(user.role))){
        return children;
    }else {
        return fallback || <></>;
    }
}
