import React from 'react';

const CircleLoading = () => {
    return (
        <svg className="load" viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" strokeWidth="5" stroke="#D6D6D6" fill="none"></circle>
            <circle className="loading" cx="50" cy="50" r="20" fill="none" />
        </svg>
    );
}

export default CircleLoading;