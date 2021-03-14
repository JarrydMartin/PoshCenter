import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useState } from "react";
import AuthButton from "./AuthButton";

const HeartButton = ({
    userLiked,
    likes,
    onLiked,
    onUnliked,
    readOnly
}: {
    userLiked: boolean
    likes: number;
    onLiked: () => void;
    onUnliked: () => void;
    readOnly: boolean;
}) => {
    const [liked, setLiked] = useState(userLiked);
    const [showSignIn, setShowSignIn] = useState(false)

    const toggleLiked = () => {
        if(!readOnly){
            liked ?  onUnliked() : onLiked();
            setLiked(!liked);
        } else{
            setShowSignIn(true)
        }
    };
    return (
            <div style={{fontSize:"20px"}} >
                
                <IconButton aria-label="Favorite" onClick={toggleLiked}>
                    {liked ? (
                        <FavoriteIcon color="primary"/>
                    ) : (
                        <FavoriteBorderIcon color="primary" />
                    )}
                    <span> +{likes} </span>
                </IconButton>
                
                {showSignIn && <p>signin to like</p>}
                
            </div>
            
      
    );
};

export default HeartButton;
