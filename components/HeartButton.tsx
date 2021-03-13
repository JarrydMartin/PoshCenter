import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useState } from "react";

const HeartButton = ({
    value,
    onLiked,
    onUnliked,
}: {
    value: number;
    onLiked?: () => void;
    onUnliked?: () => void;
}) => {
    const [liked, setLiked] = useState(false);

    const toggleLiked = () => {
        liked
            ? onUnliked
                ? onUnliked()
                : () => {}
            : onLiked
            ? onLiked()
            : () => {};

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
                +{value}
            </div>
            
      
    );
};

export default HeartButton;
