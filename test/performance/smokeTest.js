import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const res = http.get('http://localhost:3210/api/v1/customers');
}