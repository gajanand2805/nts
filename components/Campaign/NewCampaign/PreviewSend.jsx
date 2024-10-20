import React from 'react';

const PreviewSend = ({ data }) => {
    const handleSend = () => {
        // Implement send logic here
        alert('Campaign sent!');
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Preview</h2>
            <div>
                <p><strong>Campaign Name:</strong> {data.campaignName}</p>
                <p><strong>Audience:</strong> {data.audience}</p>
                <p><strong>Message:</strong> {data.message}</p>
            </div>
            <button onClick={handleSend} className="btn">Send Campaign</button>
        </div>
    );
};

export default PreviewSend;
