import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-between mb-6">
            {steps.map((step, index) => (
                <div key={index} className="flex-1 text-center">
                    <div
                        className={`p-2 rounded-full w-8 h-8 mx-auto mb-2 ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                            }`}
                    >
                        {index + 1}
                    </div>
                    <p className={`text-sm ${index <= currentStep ? 'font-bold' : ''}`}>{step}</p>
                    {/* Adjusting the line for all steps except the last one */}
                    {index < steps.length - 1 && (
                        <div className={`border-t-2 mt-2 mx-auto ${index < currentStep ? 'border-blue-500' : 'border-gray-300'}`} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;
