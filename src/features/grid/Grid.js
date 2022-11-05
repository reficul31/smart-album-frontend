import React from 'react';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loading-icons';

import styles from './Grid.module.css';
import { selectPhotoObjects, selectStatus } from '../search/searchSlice';

export function Grid() {
    const photoObjects = useSelector(selectPhotoObjects);
    const status = useSelector(selectStatus);

    if (status === 'idle') {
        return (
            <ul className={styles.gridList}>
                {photoObjects.map((photo, i) => (
                    <li key={i} className={styles.gridListItem}>
                        <img key={i} className={styles.gridImg} src={photo['url']} alt="Search Result" />
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <div className={styles.gridLoading}>
                <ThreeDots className={styles.gridLoadingIcon} />
            </div>
        );
    }
}