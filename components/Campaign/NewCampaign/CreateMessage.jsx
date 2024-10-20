import React, { useState } from 'react';

// Sample templates
const templates = {
    daac_enquiries: {
        name: 'DAAC Enquiry',
        content: `Dear {{1}}\n\nThanx for Enquiring about {{2}}\n\nWith Regards\nDAAC\nwww.daac.in`,
        parameters: ['{{1}}', '{{2}}', '{{3}}']
    }
};

const CreateMessage = ({ onChange, data }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('daac_enquiries');
    const [inputs, setInputs] = useState({ '{{1}}': '', '{{2}}': '' });

    const handleTemplateChange = (e) => {
        const templateName = e.target.value;
        setSelectedTemplate(templateName);
        const template = templates[templateName];
        const newInputs = {};
        template.parameters.forEach(param => {
            newInputs[param] = '';
        });
        setInputs(newInputs);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
        const template = templates[selectedTemplate];
        const message = template.content.replace(/{{\d+}}/g, (match) => inputs[match] || match);
        onChange({ message });
    };

    const getTemplatePreview = () => {
        const template = templates[selectedTemplate];
        return template.content.replace(/{{(\d+)}}/g, (match, p1) => inputs[`{{${p1}}}`] || match);
    };

    return (
        <div>
            <label className="block mb-2">Select Template</label>
            <select onChange={handleTemplateChange} value={selectedTemplate} className="input mb-4">
                {Object.keys(templates).map(key => (
                    <option key={key} value={key}>{templates[key].name}</option>
                ))}
            </select>

            <label className="block mb-2">Template Preview</label>
            <pre className="border p-2 mb-4">{getTemplatePreview()}</pre>

            {templates[selectedTemplate]?.parameters.map(param => (
                <div key={param} className="mb-4">
                    <label className="block mb-2">{`Input for ${param}`}</label>
                    <input
                        type="text"
                        name={param}
                        value={inputs[param] || ''}
                        onChange={handleInputChange}
                        className="input"
                        placeholder={`Enter value for ${param}`}
                    />
                </div>
            ))}

            <label className="block mb-2">Message</label>
            <textarea
                value={data.message}
                onChange={(e) => onChange({ message: e.target.value })}
                className="input"
                placeholder="Enter your message"
            />
        </div>
    );
};

export default CreateMessage;
