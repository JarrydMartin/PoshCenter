import { Avatar } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { UserModel } from "../lib/models";

const UserAvatar = ({ user }: { user: UserModel }) => {
    return (
        <Link href={`/profile`}>
            <a>
                <Avatar alt={user?.name} src={user?.profileImage} />
            </a>
        </Link>
    );
};

export default UserAvatar;
