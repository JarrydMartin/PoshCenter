import React, { Dispatch, MutableRefObject } from 'react'
import { ArticleModel } from '../lib/models'
import EditorJS from "@editorjs/editorjs";
import { Button } from '@material-ui/core';
import NavBar from './NavBar';

const EditNavBar = ({
    editMode,
    setEditMode,
    article,
    setArticle,
    editorRef
    }:{editMode: boolean;
        setEditMode?: Dispatch<React.SetStateAction<boolean>>;
        article?: ArticleModel;
        setArticle?: Dispatch<React.SetStateAction<ArticleModel>>;
        editorRef?:MutableRefObject<EditorJS>;}) => {

            const handleEditClick = async () => {
                if(editMode){
                  const editorData = await editorRef.current.save();
                  setArticle({...article, ...editorData})
                }
                setEditMode(!editMode)
              }
            
              const EditArticleButton = () => {
                if(editorRef){
                return (
                  <Button
                    color="primary"
                    type="button"
                    onClick={handleEditClick}
                  >
                    {editMode ? "Save Article" : "Edit Article"}
                  </Button>
                );
              } else {
                return (
                  <></>
                )
              }
            };
    return (
        <NavBar>
            <EditArticleButton />
        </NavBar>
    )
}

export default EditNavBar
