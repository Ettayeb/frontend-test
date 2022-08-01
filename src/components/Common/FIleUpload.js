import React from "react";

import { Input, FormGroup, Label } from "reactstrap";

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
    const handleFileInput = (e) => {
        // handle validations

        const file = e.target.files[0];
        console.log(file);
        if (file.type !== "image/png" && file.type !== "image/jpeg")
            onFileSelectError({ error: "Please upload an image file." });
        else onFileSelectSuccess(file);
    };

    return (
        <FormGroup>
            <Label for="photo">Your photo:</Label>
            <Input type="file" onChange={handleFileInput} />
        </FormGroup>
    );
};

export default FileUploader;
