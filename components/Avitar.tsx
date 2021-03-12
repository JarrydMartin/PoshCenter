import { Avatar } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../lib/contexts";


const UserAvatar = () => {
    const {user} = useContext(UserContext)
    return (
        <Link href={`/profile`}>
            <a>
                <Avatar variant="rounded" alt={user.name} src={user.profileImage}  />
            </a>
        </Link>
    );
};

export default UserAvatar;
