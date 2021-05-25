import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { CommentModel } from "../lib/models";

const Comment = ({ c }: { c: CommentModel }) => {
    const [comment, setcomment] = useState(c);
    return (
        <div>
            <Paper elevation={0}>
                <p style={{textAlign:"start", padding:"8px"}}>{comment.text}</p>
                <p style={{textAlign:"end"}}><i>by {comment.commenter}</i></p>
            </Paper>
        </div>
    );
};



export default Comment;
