import React from 'react';

const TestCampaign = ({ onChange, data }) => {
  const handleTest = () => {
    // Implement test logic here
    onChange({ testResult: 'Test successful!' });
  };

  return (
    <div>
      <button onClick={handleTest} className="btn">Test Campaign</button>
      {data.testResult && <p>{data.testResult}</p>}
    </div>
  );
};

export default TestCampaign;
