import React, { useEffect } from 'react';

const CampaignName = ({ onChange, data }) => {
    useEffect(() => {
        if (!data.messageType) {
            onChange({ messageType: 'Pre-approved template message' });
        }
    }, [data.messageType, onChange]);

    const handleCampaignNameChange = (e) => {
        onChange({ campaignName: e.target.value });
    };

    const handleMessageTypeChange = (e) => {
        onChange({ messageType: e.target.value });
    };

    return (
        <div>
            {/* Campaign Name Section */}
            <label className="block mb-2 font-semibold text-lg">Campaign Name</label>
            <p className="text-gray-600 mb-4">Pick something that describes your audience & goals.</p>
            <input
                type="text"
                value={data.campaignName}
                onChange={handleCampaignNameChange}
                className="input mb-6 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter campaign name"
            />

            {/* Message Type Section */}
            <label className="block mb-2 font-semibold text-lg">Message Type</label>
            <p className="text-gray-600 mb-4">
                Send a template message from one of your pre-approved templates. Or you can also opt to send a regular message to active users.
            </p>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="Pre-approved template message"
                        checked={data.messageType === 'Pre-approved template message'}
                        onChange={handleMessageTypeChange}
                        className="form-radio"
                    />
                    <span className="ml-2">Pre-approved template message</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="Regular Message"
                        checked={data.messageType === 'Regular Message'}
                        onChange={handleMessageTypeChange}
                        className="form-radio"
                    />
                    <span className="ml-2">Regular Message</span>
                </label>
            </div>
        </div>
    );
};

export default CampaignName;
