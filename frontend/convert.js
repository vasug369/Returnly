const fs = require('fs');

let html = fs.readFileSync('stitch_design.html', 'utf8');
const bodyMatch = html.match(/<div class="relative flex h-auto[\s\S]*<\/footer>\n<\/div>/);
if (!bodyMatch) {
    console.error("Failed to extract body content from stitch_design.html");
    process.exit(1);
}

let jsx = bodyMatch[0];
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/<!--.*?-->/g, '');
jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');

const newForm = `
<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
<input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. John Doe" type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
</div>
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
<input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. john@example.com" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
</div>
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job City</label>
<input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. San Francisco" type="text" value={formData.jobCity} onChange={(e) => setFormData({...formData, jobCity: e.target.value})} required />
</div>
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hometown</label>
<input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. Sacramento" type="text" value={formData.hometown} onChange={(e) => setFormData({...formData, hometown: e.target.value})} required />
</div>
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Travel Frequency</label>
<select className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" value={formData.travelFrequency} onChange={(e) => setFormData({...formData, travelFrequency: e.target.value})}>
<option value="Every Weekend">Every Weekend</option>
<option value="Alternate Weekends">Alternate Weekends</option>
<option value="Once a Month">Once a Month</option>
<option value="Rarely">Rarely</option>
</select>
</div>
<button className="w-full h-14 bg-primary text-white font-bold rounded-xl mt-2 shadow-lg shadow-primary/20" type="submit">
Submit Interest
</button>
{status && <p className={\`text-center font-bold \${status.includes('Thank') ? 'text-green-500' : 'text-red-500'}\`}>{status}</p>}
</form>
`;

// Replace original <form ... </form> block with our new React controlled form.
jsx = jsx.replace(/<form[\s\S]*?<\/form>/, newForm);

// Ensure there are no unclosed void elements (e.g. <br>)
jsx = jsx.replace(/<br>/g, '<br/>');

const reactComponent = `import React, { useState } from 'react';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        jobCity: '',
        hometown: '',
        travelFrequency: 'Every Weekend'
    });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');
        try {
            const response = await fetch('http://localhost:5000/api/v1/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('Thank you for joining the waitlist!');
                setFormData({ fullName: '', email: '', jobCity: '', hometown: '', travelFrequency: 'Every Weekend' });
            } else {
                setStatus(data.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('Failed to connect to the server.');
        }
    };

    return (
        ${jsx}
    );
};
export default LandingPage;
`;

fs.writeFileSync('src/pages/LandingPage.jsx', reactComponent);
console.log('Successfully written src/pages/LandingPage.jsx');
