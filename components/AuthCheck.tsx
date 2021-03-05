import Link from "next/link";
import { access } from "node:fs";
import { useContext } from "react";
import { UserContext } from "../lib/contexts";
import { UserRoles } from "../lib/enums";
import { useUser } from "../lib/hooks";
// Component's children only shown to logged-in users
export default function AuthCheck({
    children,
    fallback,
    roleAccess,
}: {
    children?: any;
    fallback?: any;
    roleAccess?: UserRoles;
}) {
    const { user } = useUser();

    roleAccess =  roleAccess? roleAccess: UserRoles.READER;

    if (user && (user.role == UserRoles.ADMIN || roleAccess == UserRoles.READER ||user.role == roleAccess)) {
        return children;
    } else {
        return fallback || <p>You must be signed</p>;
    }
}
