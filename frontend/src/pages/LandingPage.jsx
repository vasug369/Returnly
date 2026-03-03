import React, { useState } from 'react';

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
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <nav className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 p-4 justify-between border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="text-primary flex size-8 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">shield_person</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Commuter</h2>
                </div>
                <div className="flex items-center">
                    <button className="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                </div>
            </nav>

            <div className="@container">
                <div className="p-0">
                    <div className="flex min-h-[520px] flex-col gap-6 bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 items-center justify-center p-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-2">
                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">Government Approved</span>
                        </div>
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <h1 className="text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-6xl">
                                Secure Your Weekend Commute
                            </h1>
                            <p className="text-slate-300 text-base font-normal leading-relaxed @[480px]:text-lg">
                                Safe and reliable intercity transport for weekend employees. Licensed, insured, and regulated for your peace of mind.
                            </p>
                        </div>
                        <div className="flex flex-col w-full gap-3 mt-4 sm:flex-row sm:justify-center">
                            <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
                                Join the Waitlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-12 px-4">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight mb-6 px-2">The Risks of Unregulated Travel</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-xl"><span className="material-symbols-outlined">cancel</span></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Unregulated Rides</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal">Unverified drivers operating outside of legal safety standards.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-xl"><span className="material-symbols-outlined">gpp_bad</span></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">No Insurance</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal">Zero passenger liability coverage in case of unforeseen accidents.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm">
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-xl"><span className="material-symbols-outlined">warning</span></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Safety Risks</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal">Unpredictable schedules and unsafe vehicle conditions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 px-4 bg-primary/5">
                <div className="rounded-3xl bg-slate-900 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30 uppercase">Regulated Service</span>
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                        <h2 className="text-white text-3xl font-bold leading-tight">The Regulated Solution</h2>
                        <p className="text-slate-400 text-base leading-relaxed">
                            We bridge the gap between employee needs and government safety standards. Our system ensures every ride is tracked, insured, and operated by professionals.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <span className="text-white font-semibold">Government Certified Operator</span>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10">
                        <span className="material-symbols-outlined text-[160px]">commute</span>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
                        <h4 className="text-slate-900 dark:text-white font-bold">Passenger Insurance</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Comprehensive coverage for every journey.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-primary text-3xl">person_check</span>
                        <h4 className="text-slate-900 dark:text-white font-bold">Verified Drivers</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Background-checked professional operators.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
                        <h4 className="text-slate-900 dark:text-white font-bold">Fixed Schedules</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Reliable departures every weekend.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-primary text-3xl">thumb_up</span>
                        <h4 className="text-slate-900 dark:text-white font-bold">Safe &amp; Reliable</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Punctuality and safety guaranteed.</p>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
                    <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-2">Help Us Plan</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Tell us your commute preferences to help prioritize routes.</p>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                            <input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. John Doe" type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                            <input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. john@example.com" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job City</label>
                            <input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. San Francisco" type="text" value={formData.jobCity} onChange={(e) => setFormData({ ...formData, jobCity: e.target.value })} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hometown</label>
                            <input className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" placeholder="e.g. Sacramento" type="text" value={formData.hometown} onChange={(e) => setFormData({ ...formData, hometown: e.target.value })} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Travel Frequency</label>
                            <select className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4" value={formData.travelFrequency} onChange={(e) => setFormData({ ...formData, travelFrequency: e.target.value })}>
                                <option value="Every Weekend">Every Weekend</option>
                                <option value="Alternate Weekends">Alternate Weekends</option>
                                <option value="Once a Month">Once a Month</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                        </div>
                        <button className="w-full h-14 bg-primary text-white font-bold rounded-xl mt-2 shadow-lg shadow-primary/20" type="submit">
                            Submit Interest
                        </button>
                        {status && <p className={`text-center font-bold ${status.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
                    </form>
                </div>
            </section>

            <footer className="mt-auto py-12 px-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2 grayscale opacity-60">
                        <span className="material-symbols-outlined text-3xl">account_balance</span>
                        <span className="font-bold text-sm uppercase tracking-widest">Official Transit Partner</span>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            © 2024 Commuter Transit Systems. <br />All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default LandingPage;
