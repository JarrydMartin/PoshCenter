import React, { useState } from "react";
import Comment from "./Comment";
import { CommentModel } from "../lib/models";
import AddComment from "./AddComment";
import { makeStyles } from "@material-ui/core";
import { maxHeaderSize } from "node:http";

const CommentSection = ({
    cs,
    newC,
    onAdd,
}: {
    cs: CommentModel[];
    newC: CommentModel;
    onAdd: (c: CommentModel) => void;
}) => {
    const classes = useStyles();
    const comments = cs ? (
        cs.map((c) => (
            <li>
                <Comment c={c} />
            </li>
        ))
    ) : (
        <li>
            <p>No Comments</p>
        </li>
    );
    return (
        <div className={classes.root}>
            <h2>Comments</h2>
            <ol className={classes.list}>{comments}</ol>
            <AddComment c={newC} onAdd={onAdd} />
        </div>
    );
};

const useStyles = makeStyles({
    root: { maxWidth: "750px", marginRight:"40px"}, 
    list:{listStyle: "none" }
});
export default CommentSection;
