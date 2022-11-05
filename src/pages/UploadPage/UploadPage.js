import React from 'react'

import { Upload } from '../../features/upload/Upload';

import styles from './UploadPage.module.css';

export function UploadPage() {
  return (
    <div className={styles.uploadPanel}>
        <Upload />
    </div>
  );
}