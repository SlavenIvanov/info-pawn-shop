import http from 'k6/http';

export const options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 }
    ]
};

export default function () {
    const res = http.get('http://localhost:3210/api/v1/customers');
}