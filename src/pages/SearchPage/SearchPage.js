import React from 'react';

import styles from './SearchPage.module.css';

import { Search } from '../../features/search/Search';
import { Grid } from '../../features/grid/Grid';

export function SearchPage() {
    return (
        <React.Fragment>
            <div className={styles.searchPanel}>
                <Search  />
            </div>
            <div className={styles.imagePanel}>
                <Grid />
            </div>
        </React.Fragment>
    );
}