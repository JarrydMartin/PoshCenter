import { Button } from "@material-ui/core";
import React, { useState } from "react";

const EditSaveButton = ({
    onEdit,
    onSave,
    name,
}: {
    onEdit?: () => void;
    onSave?: () => void;
    name: string
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            {isEdit ? (
                <Button
                    color="secondary"
                    type="button"
                    onClick={() => {
                        setIsEdit(!isEdit);
                        onSave();
                    }}>
                    Save {name}
                </Button>
            ) : (
                <Button
                color="secondary"
                    type="button"
                    onClick={() => {
                        setIsEdit(!isEdit);
                        onEdit();
                    }}>
                    Edit {name}
                </Button>
            )}
        </>
    );
};

export default EditSaveButton;
