import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useState } from "react";

const HeartButton = ({
    userLiked,
    likes,
    onLiked,
    onUnliked,
}: {
    userLiked: boolean
    likes: number;
    onLiked: () => void;
    onUnliked: () => void;
}) => {
    const [liked, setLiked] = useState(userLiked);

    const toggleLiked = () => {
        liked ?  onUnliked() : onLiked();

        setLiked(!liked);
    };
    return (
            <div style={{fontSize:"20px"}}>
                <IconButton aria-label="Favorite" onClick={toggleLiked}>
                    {liked ? (
                        <FavoriteIcon color="primary"/>
                    ) : (
                        <FavoriteBorderIcon color="primary" />
                    )}
                    
                </IconButton>
                +{likes}
            </div>
            
      
    );
};

export default HeartButton;
