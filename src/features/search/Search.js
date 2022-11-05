import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMicFill, BsMicMute } from 'react-icons/bs';

import { queryAsync, selectSearchText, setSearchText } from './searchSlice';
import styles from './Search.module.css';

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

export function Search() {
    let recognition = null;
    const searchText = useSelector(selectSearchText);

    const dispatch = useDispatch();
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        async function checkMicrophonePermission() {
            const permission = await navigator.permissions.query({ name: 'microphone' });
            setIsBlocked(permission.state === 'denied');
            permission.onchange = () => setIsBlocked(this.state === 'denied');
        }
        
        checkMicrophonePermission();
        if (window.webkitSpeechRecognition !== undefined) {
            recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const predictedText = Array.from(event.results)
                                            .map(result => result[0])
                                            .map(result => result.transcript)
                                            .join('');
                dispatch(setSearchText(predictedText));
            }
        } else {
            setIsBlocked(true);
        }
    });

    const startStopRecording = (event) => {
        event.preventDefault();
        if (isBlocked || recognition === undefined) {
            return;
        }

        if (!isRecording) {
            setIsRecording(true);
            recognition.start();
        } else {
            setIsRecording(false);
            recognition.stop();
            dispatch(queryAsync(searchText));
        }
    }

    const onSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(queryAsync(searchText));
    }
    
    return (
        <React.Fragment>
            <form className={styles.searchForm} onSubmit={onSearchSubmit} autoComplete="off">
                <input type="text" name="searchText" value={searchText} onChange={e => dispatch(setSearchText(e.target.value))} />
                <input type="submit" hidden={true} />
            </form>
            <div className={styles.searchMicButtonContainer}>
                <button onClick={startStopRecording} disabled={isBlocked} className={styles.searchMicButton}>
                    {
                        !isRecording ? <BsMicFill color='white' /> : <BsMicMute color='white' />
                    }
                </button>
            </div>
        </React.Fragment>
    );
}