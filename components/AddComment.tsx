import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { compileFunction } from "vm";
import { UserContext } from "../lib/contexts";
import { UserRoles } from "../lib/enums";
import { CommentModel } from "../lib/models";

const AddComment = ({
    c,
    onAdd,
}: {
    c: CommentModel;
    onAdd: (c: CommentModel) => void;
}) => {
    const classes = useStyles();
    
    const { user } = useContext(UserContext);
    const [newComment, setNewComment] = useState(c);
    return (
        user.role !== UserRoles.ANON ?
        <div>
            <TextField
                id="commentText"
                label="Add Comment"
                variant="outlined"
                fullWidth
                multiline
                value={newComment.text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setNewComment({ ...newComment, text: event.target.value })
                }
            />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => {
                    onAdd(newComment);
                    setNewComment({ ...newComment, text: "" });
                }}>
                Add Comment
            </Button>
        </div> :
        <p>Sign in to add a comment</p>
    );
};

const useStyles = makeStyles({ button: {marginTop:'8px'} });

export default AddComment;
