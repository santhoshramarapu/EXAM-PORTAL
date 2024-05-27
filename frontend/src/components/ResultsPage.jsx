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
                const response = await axios.get(`http://localhost:3001/student/ResultsPage`);
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
                    <p><strong>Name:</strong> {result.stdname}</p>
                    <p><strong>English Marks:</strong> {result.english}</p>
                    <p><strong>Java Marks:</strong> {result.java}</p>
                    <p><strong>Python Marks:</strong> {result.python}</p>
                    <p><strong>C++ Marks:</strong> {result.cpp}</p>
                    <p><strong>Total Marks:</strong> {result.totalMarks}</p>
                    <p><strong>Grade:</strong> {result.result}</p>
                </div>
            )}
        </div>
    );
    
};

export default ResultPage;
