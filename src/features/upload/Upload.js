import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ThreeDots } from 'react-loading-icons';

import logo from './upload.png'
import styles from './Upload.module.css';
import { setStatus, queryAsync, selectStatus } from './uploadSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Upload() {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');

    useEffect(() => {
        setFile(null);
        setLabel('');
        dispatch(setStatus('idle'));
    }, [dispatch]);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length === 0) {
            return;
        }

        setFile(acceptedFiles[0]);
        dispatch(setStatus('uploading'));
    }, [dispatch]);
    
    const {getRootProps, getInputProps } = useDropzone({onDrop, multiple: false, accept: {
        'image/*': ['.jpeg', '.png', '.jpg']
    }});

    const handleSubmit = (event) => {
        event.preventDefault();
        const customLabels = label.split(",").map(l => l.trim());
        dispatch(queryAsync({file, customLabels}));
    };

    if (status === 'idle') {
        return (
            <div className={styles.upload} {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={logo} alt="Upload Icon" />
                <div className={styles.uploadText}>
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <p style={{fontSize: 'small'}}>Accepted filetypes: PNG, JPG, JPEG</p>
                </div>
            </div>
        );
    } else if (status === 'loading') {
        return (
            <div className={styles.uploadLoading}>
                <ThreeDots className={styles.uploadLoadingIcon} />
            </div>
        );
    } else if (status === 'uploading' && file !== null) {
        return (
            <div className={styles.preview}>
                <img className={styles.uploadPreview} src={URL.createObjectURL(file)} alt="Uploaded" />
                <form className={styles.uploadForm} onSubmit={handleSubmit}>
                    <input className={styles.uploadInput} type="text" value={label} onChange={e => dispatch(setLabel(e.target.value))} />
                    <input className={styles.uploadButton} type="submit" value="UPLOAD" />
                </form>
            </div>
        );
    }
}