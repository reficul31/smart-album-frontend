import axios from 'axios';

const baseURL = 'https://gufizckpdd.execute-api.us-east-1.amazonaws.com/PROD';
const client = axios.create({baseURL});

const SEARCH_PATH = '/search';
const UPLOAD_PATH = '/upload';

export async function search(text) {
    const args = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            'q': text
        }
    };

    return await client.get(SEARCH_PATH, args);
}

export async function upload(headers, body) {
    const args = { headers };
    return await client.put(UPLOAD_PATH, body, args);
}