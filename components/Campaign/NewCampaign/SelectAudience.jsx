import React, { useState } from 'react';

const SelectAudience = ({ onChange, data }) => {
    const [selectedTab, setSelectedTab] = useState('In 24hr');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        const today = new Date();
        if (tab === 'In 24hr') {
            setStartDate(today.toISOString().split('T')[0]);
            setEndDate(new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        } else if (tab === 'This Week') {
            const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
            setEndDate(today.toISOString().split('T')[0]);
        } else if (tab === 'This Month') {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            setStartDate(startOfMonth.toISOString().split('T')[0]);
            setEndDate(endOfMonth.toISOString().split('T')[0]);
        }
    };

    const handleSelect = (e) => {
        onChange({ audience: e.target.value });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="mb-4">
                <label className="block mb-2">Select Audience</label>
                <select
                    value={data.audience}
                    onChange={handleSelect}
                    className="input"
                >
                    <option value="">Select an audience</option>
                    <option value="audience1">Audience 1</option>
                    <option value="audience2">Audience 2</option>
                </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={() => handleTabChange('In 24hr')}
                    style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: selectedTab === 'In 24hr' ? '#007bff' : '#e0e0e0', color: selectedTab === 'In 24hr' ? '#fff' : '#000' }}
                >
                    In 24hr
                </button>
                <button
                    onClick={() => handleTabChange('This Week')}
                    style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: selectedTab === 'This Week' ? '#007bff' : '#e0e0e0', color: selectedTab === 'This Week' ? '#fff' : '#000' }}
                >
                    This Week
                </button>
                <button
                    onClick={() => handleTabChange('This Month')}
                    style={{ padding: '5px 10px', backgroundColor: selectedTab === 'This Month' ? '#007bff' : '#e0e0e0', color: selectedTab === 'This Month' ? '#fff' : '#000' }}
                >
                    This Month
                </button>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="From"
                    style={{ marginRight: '10px' }}
                />
                <span style={{ margin: '0 10px' }}>to</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="To"
                />
            </div>
        </div>
    );
};

export default SelectAudience;
