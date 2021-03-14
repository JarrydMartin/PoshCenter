import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../lib/contexts";
import { storage, STATE_CHANGED } from "../lib/firebase";
import { UserModel } from "../lib/models";
import Loader from "./Loader";
import BackupIcon from '@material-ui/icons/Backup';

// Uploads images to Firebase Storage
export default function ImageUploader({user}:{user:UserModel}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    // Creates a Firebase Upload Task
    const uploadFile = async (e) => {
        // Get the file
        const file = Array.from(e.target.files)[0] as any;
        const fileSplit : string[] = file.name.split(".")
        const extension = fileSplit[fileSplit.length - 1];

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
                setDownloadURL(`${url}.${extension}`);
                setUploading(false);
            });
        });
    };

    return (
        <>
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {downloadURL && (
                <TextField
                    id="image-copy-paste"
                    label="Copy and Paste"
                    multiline
                    value={`${downloadURL}`}
                />
            )}

            {!uploading && (
                <>
                    <Button component="label">
                        <BackupIcon color="primary"/>
                            <input
                                type="file"
                                hidden
                                onChange={uploadFile}
                            />
                            &nbsp; Upload File
                    </Button>
                </>
            )}

           
        </>
    );
}
