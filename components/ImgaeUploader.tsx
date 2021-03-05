import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../lib/contexts";
import { storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";

// Uploads images to Firebase Storage
export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const user = useContext(UserContext);

    // Creates a Firebase Upload Task
    const uploadFile = async (e) => {
        // Get the file
        const file = Array.from(e.target.files)[0] as any;
        const extension = file.type.split("/")[1];

        // Makes reference to the storage bucket location
        const ref = storage.ref(
            `uploads/${user.uid}/${Date.now()}.${extension}`
        );
        setUploading(true);

        // Starts the upload
        const task = ref.put(file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
            ).toFixed(0) as unknown) as number;
            setProgress(pct);

            // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
            task.then((d) => ref.getDownloadURL()).then((url) => {
                setDownloadURL(url);
                setUploading(false);
            });
        });
    };

    return (
        <>
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                    <Button component="label">
                        📸 Upload Img
                        <input
                            type="file"
                            hidden
                            onChange={uploadFile}
                            accept="image/x-png,image/gif,image/jpeg"
                        />
                    </Button>
                </>
            )}

            {downloadURL && (
                <TextField
                    id="image-copy-paste"
                    label="Copy and Paste"
                    multiline
                    value={`${downloadURL}.png`}
                />
            )}
        </>
    );
}
