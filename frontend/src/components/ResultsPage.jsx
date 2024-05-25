import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../src/styles/ResultsPage.css';

const ResultPage = () => {
    const { hallticketNo } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/result/${hallticketNo}`);
                setResult(response.data);
                setError('');
            } catch (err) {
                setError('Result not found');
                setResult(null);
            }
        };

        fetchResult();
    }, [hallticketNo]);

    return (
        <div className="result-page-container">
            <h2>Result Details</h2>
            {error && <p>{error}</p>}
            {result && (
                <div>
                    <p><strong>Hall Ticket Number:</strong> {result.hallticketNo}</p>
                    <p><strong>Name:</strong> {result.name}</p>
                    <p><strong>Marks:</strong> {result.marks}</p>
                    <p><strong>Grade:</strong> {result.grade}</p>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
