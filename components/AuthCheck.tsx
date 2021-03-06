import { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { UserRoles } from "../lib/enums";
// Component's children only shown to logged-in users
export default function AuthCheck({
    children,
    fallback,
    roleAccess
}: {
    children?: any;
    fallback?: any;
    roleAccess?: UserRoles;
}) {
    const {user} = useContext(UserContext);
    roleAccess =  roleAccess? roleAccess: UserRoles.READER;

    if (user && (user.role == UserRoles.ADMIN || roleAccess == UserRoles.READER ||user.role == roleAccess)) {
        return children;
    } else {
        return fallback || <p>You must be signed</p>;
    }
}
