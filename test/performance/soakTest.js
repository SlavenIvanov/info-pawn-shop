import http from 'k6/http';

export const options = {
    stages: [
        { duration: '5s', target: 1000 },
        { duration: '1h', target: 1000 },
        { duration: '5s', target: 100 }, // scale down. Recovery stage.
    ],
};

export default function () {
    const res = http.get('http://localhost:3210/api/v1/customers');
}