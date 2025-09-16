import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Component for the loading spinner
const GeminiLoader = () => (
    <div className="gemini-loader-container">
        <div className="gemini-loader"></div>
        <style>{`
            .gemini-loader-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100px;
            }
            .gemini-loader {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3B82F6;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);


const App = () => {
    // Refs for Chart canvases
    const philosophyChartRef = useRef<HTMLCanvasElement>(null);
    const productChartRef = useRef<HTMLCanvasElement>(null);
    const whyChooseUsChartRef = useRef<HTMLCanvasElement>(null);

    // State for Gemini API features
    const [recoProfession, setRecoProfession] = useState('');
    const [recoChallenge, setRecoChallenge] = useState('');
    const [recoResult, setRecoResult] = useState('');
    const [isRecoLoading, setIsRecoLoading] = useState(false);

    const [emailScenario, setEmailScenario] = useState('Meeting Follow-up');
    const [emailContext, setEmailContext] = useState('');
    const [emailResult, setEmailResult] = useState('');
    const [isEmailLoading, setIsEmailLoading] = useState(false);

    const [tipChallenge, setTipChallenge] = useState('Beating Procrastination');
    const [tipResult, setTipResult] = useState('');
    const [isTipLoading, setIsTipLoading] = useState(false);
    
    const [mottoProfession, setMottoProfession] = useState('');
    const [mottoResult, setMottoResult] = useState('');
    const [isMottoLoading, setIsMottoLoading] = useState(false);


    // Effect for initializing charts
    useEffect(() => {
        const chartInstances: Chart[] = [];
        const tooltipTitleCallback = {
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (tooltipItems: any) => {
                            const item = tooltipItems[0];
                            let label = item.chart.data.labels[item.dataIndex];
                            return Array.isArray(label) ? label.join(' ') : label;
                        }
                    }
                }
            }
        };

        if (philosophyChartRef.current) {
            const chart = new Chart(philosophyChartRef.current, {
                type: 'radar',
                data: {
                    labels: ['Premium Quality', 'Thoughtful Design', 'Everyday Utility', 'Accessible Price'],
                    datasets: [{
                        label: 'Focus Area',
                        data: [95, 90, 85, 88],
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: '#3B82F6',
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#3B82F6'
                    }]
                },
                options: {
                    ...tooltipTitleCallback,
                    maintainAspectRatio: false,
                    elements: { line: { borderWidth: 3 } },
                    scales: { r: { angleLines: { color: 'rgba(44, 62, 80, 0.2)' }, suggestedMin: 0, suggestedMax: 100, grid: { color: 'rgba(44, 62, 80, 0.2)' }, pointLabels: { font: { size: 14, weight: 'bold' }, color: '#2c3e50' }, ticks: { backdropColor: 'transparent', color: '#888' } } }
                }
            });
            chartInstances.push(chart);
        }

        if (productChartRef.current) {
            const chart = new Chart(productChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Elegant Tech Accessories', 'Essential Office Staples'],
                    datasets: [{
                        data: [50, 50],
                        backgroundColor: ['#3B82F6', '#60A5FA'],
                        hoverOffset: 4,
                        borderColor: '#ffffff',
                        borderWidth: 4
                    }]
                },
                options: {
                    ...tooltipTitleCallback,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: { ...tooltipTitleCallback.plugins, legend: { position: 'bottom', labels: { padding: 20, font: { size: 14 } } } },
                    cutout: '60%'
                }
            });
            chartInstances.push(chart);
        }

        if (whyChooseUsChartRef.current) {
            const chart = new Chart(whyChooseUsChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Trusted by a Global Community', 'Focus on Modern Professional Needs', 'Seamless Shopping & Reliable Support'],
                    datasets: [{
                        label: 'Customer Satisfaction Score',
                        data: [98, 95, 92],
                        backgroundColor: ['#3B82F6', '#60A5FA', '#1E40AF'],
                        borderRadius: 8
                    }]
                },
                options: {
                    ...tooltipTitleCallback,
                    indexAxis: 'y',
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: { x: { beginAtZero: true, max: 100, grid: { display: false }, ticks: { display: false } }, y: { grid: { display: false }, ticks: { font: { size: 14, weight: 500 }, color: '#2c3e50' } } },
                    plugins: { ...tooltipTitleCallback.plugins, legend: { display: false } }
                }
            });
            chartInstances.push(chart);
        }
        
        return () => {
            chartInstances.forEach(chart => chart.destroy());
        };
    }, []);

    // Generic Gemini API Call Function
    const callGemini = async (systemPrompt: string, userQuery: string) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const result = await response.json();
            const candidate = result.candidates?.[0];
            if (candidate && candidate.content?.parts?.[0]?.text) {
                return candidate.content.parts[0].text;
            }
            throw new Error("Could not parse a valid response from the API.");
        } catch (error) {
            console.error("Gemini API call failed:", error);
            return "ERROR";
        }
    };
    
    // Handlers for Gemini Features
    const handleGetRecommendations = async () => {
        if (!recoProfession || !recoChallenge) {
            setRecoResult('<p class="text-red-500 font-sans text-center">Please describe your profession and challenge.</p>');
            return;
        }
        setIsRecoLoading(true);
        setRecoResult('');
        const systemPrompt = "You are a helpful and stylish workspace consultant for the brand 'Summary Goodies'. Your goal is to offer personalized product type recommendations. Suggest 2-3 specific types of products (e.g., 'a vertical laptop stand,' 'a set of minimalist desk organizers,') that solve the user's problem. Do not mention specific brands. Format the response as a simple, bulleted list using hyphens. The tone should be helpful and consultative.";
        const userQuery = `My profession is '${recoProfession}' and my main workspace challenge is '${recoChallenge}'.`;
        const recommendations = await callGemini(systemPrompt, userQuery);
        if (recommendations !== 'ERROR') {
            const items = recommendations.split('- ').filter((item: string) => item.trim() !== '');
            const htmlList = '<ul class="list-disc list-inside text-gray-700">' + items.map((item: string) => `<li class="mb-2">${item.trim()}</li>`).join('') + '</ul>';
            setRecoResult(htmlList);
        } else {
            setRecoResult('<p class="text-red-500 font-sans text-center">Sorry, something went wrong. Please try again later.</p>');
        }
        setIsRecoLoading(false);
    };

    const handleDraftEmail = async () => {
        if (!emailContext) {
            setEmailResult('<p class="text-red-500 font-sans text-center">Please provide some key points for the email.</p>');
            return;
        }
        setIsEmailLoading(true);
        setEmailResult('');
        const systemPrompt = "You are a professional business communication assistant. Write a clear, concise, and professional email based on the provided scenario and key points. The tone should be friendly yet professional. Structure the email with appropriate greetings and sign-offs. Do not include a 'Subject:' line prefix.";
        const userQuery = `Draft an email for the following scenario: '${emailScenario}'. Here are the key points to include: ${emailContext}`;
        const emailDraft = await callGemini(systemPrompt, userQuery);
        if (emailDraft !== 'ERROR') {
            setEmailResult(emailDraft);
        } else {
            setEmailResult('<p class="text-red-500 font-sans text-center">Sorry, something went wrong. Please try again later.</p>');
        }
        setIsEmailLoading(false);
    };

    const handleGetTip = async () => {
        setIsTipLoading(true);
        setTipResult('');
        const systemPrompt = "You are a world-class productivity coach. Provide a single, actionable, and concise tip (under 30 words) for a professional facing a specific challenge. The tone should be encouraging and modern.";
        const userQuery = `Help me with: ${tipChallenge}.`;
        const tip = await callGemini(systemPrompt, userQuery);
        if (tip !== 'ERROR') {
            setTipResult(`<p class="text-xl font-medium text-gray-800">${tip}</p>`);
        } else {
            setTipResult('<p class="text-red-500">Sorry, something went wrong. Please try again later.</p>');
        }
        setIsTipLoading(false);
    };
    
    const handleGenerateMotto = async () => {
        if (!mottoProfession) {
            setMottoResult(`<p class="text-red-500">Please enter a profession or goal.</p>`);
            return;
        }
        setIsMottoLoading(true);
        setMottoResult('');
        const systemPrompt = "You are a creative branding expert specializing in motivational slogans. Generate a short, punchy, and inspiring workspace slogan (less than 12 words) for a professional. The slogan should be modern and empowering.";
        const userQuery = `The professional's role or goal is: ${mottoProfession}.`;
        const motto = await callGemini(systemPrompt, userQuery);
        if (motto !== 'ERROR') {
            setMottoResult(`<p class="text-2xl font-bold text-blue-600">"${motto.replace(/"/g, '')}"</p>`);
        } else {
            setMottoResult('<p class="text-red-500">Sorry, something went wrong. Please try again later.</p>');
        }
        setIsMottoLoading(false);
    };

    return (
        <>
            <style>{`
                /* NOTE: In a real React app, these styles and fonts would be in index.css or handled by a layout component. */
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f8f9fa;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 300px;
                    max-height: 400px;
                }
                @media (min-width: 768px) {
                    .chart-container {
                        height: 350px;
                    }
                }
                /* Headline and paragraph color for light/dark mode */
                .headline-text {
                    color: #fff;
                }
                .headline-paragraph {
                    color: #fff;
                }
                html[data-theme='dark'] .headline-text,
                html[data-theme='dark'] .headline-paragraph {
                    color: #fff;
                }
                html[data-theme='light'] .headline-text,
                html[data-theme='light'] .headline-paragraph {
                    color: #fff;
                }
            `}</style>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl text-[#2c3e50]">
                <header className="text-center my-12">
                    <h1 className="headline-text text-5xl md:text-7xl font-extrabold tracking-tight">Summary Goodies</h1>
                    <p className="headline-paragraph mt-4 text-xl md:text-2xl max-w-3xl mx-auto">We craft premium workspace essentials designed for the demands of the modern era, empowering you to simplify your day and fuel your ambitions.</p>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-2 text-center">Our Core Philosophy</h2>
                        <p className="text-gray-600 mb-4 text-center">We balance four key pillars to deliver exceptional value. Each product is a testament to our commitment to quality, functional design, everyday utility, and accessible pricing for every professional.</p>
                        <div className="chart-container"><canvas ref={philosophyChartRef}></canvas></div>
                    </div>

                    <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-2 text-center">Curated Product Collection</h2>
                        <p className="text-gray-600 mb-4 text-center">Our collection is intentionally focused, bringing together the best in tech and traditional office staples. We ensure every item seamlessly integrates into your workspace to boost efficiency.</p>
                        <div className="chart-container"><canvas ref={productChartRef}></canvas></div>
                    </div>

                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-3xl font-bold mb-2 text-center">Why Professionals Choose Us</h2>
                        <p className="text-gray-600 mb-6 text-center">Our reputation is built on trust, relevance, and unwavering support. We are dedicated to the needs of modern professionals, earning the confidence of a global community that values excellence and reliability.</p>
                        <div className="w-full max-w-4xl mx-auto h-96 relative"><canvas ref={whyChooseUsChartRef}></canvas></div>
                    </div>
                    
                    {/* Smart Desk Recommender */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">✨ Smart Desk Recommender</h2>
                        <p className="text-gray-600 mb-4">Describe your role and a workspace challenge, and get smart suggestions for products that can help.</p>
                        <div className="max-w-xl mx-auto flex flex-col gap-4">
                            <input type="text" value={recoProfession} onChange={(e) => setRecoProfession(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Profession (e.g., Graphic Designer)" />
                            <textarea value={recoChallenge} onChange={(e) => setRecoChallenge(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Your Challenge (e.g., 'My desk is cluttered with cables and chargers.')"></textarea>
                            <button onClick={handleGetRecommendations} disabled={isRecoLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-blue-300">Get Recommendations</button>
                        </div>
                        <div className="mt-6 min-h-[150px] text-left p-4 bg-gray-100 rounded-lg">
                            {isRecoLoading ? <GeminiLoader /> : recoResult ? <div dangerouslySetInnerHTML={{ __html: recoResult }} /> : <p className="text-gray-500 font-sans text-center">Your personalized recommendations will appear here...</p>}
                        </div>
                    </div>
                    
                    {/* Quick-Draft Email Assistant */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">✨ Quick-Draft Email Assistant</h2>
                        <p className="text-gray-600 mb-4">Staring at a blank page? Select a scenario, add key points, and let AI handle the first draft.</p>
                        <div className="max-w-xl mx-auto flex flex-col gap-4">
                            <select value={emailScenario} onChange={(e) => setEmailScenario(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="Meeting Follow-up">Meeting Follow-up</option>
                                <option value="Networking Outreach">Networking Outreach</option>
                                <option value="Project Update">Project Update</option>
                                <option value="Request for Information">Request for Information</option>
                            </select>
                            <textarea value={emailContext} onChange={(e) => setEmailContext(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter key points here... e.g., 'Met with Jane about the new design. We agreed on the blue color scheme.'"></textarea>
                            <button onClick={handleDraftEmail} disabled={isEmailLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-blue-300">Draft My Email</button>
                        </div>
                        <div className="mt-6 min-h-[150px] text-left p-4 bg-gray-100 rounded-lg whitespace-pre-wrap font-mono text-sm">
                            {isEmailLoading ? <GeminiLoader /> : emailResult ? (emailResult.startsWith('<p') ? <div className="font-sans text-center" dangerouslySetInnerHTML={{ __html: emailResult }}/> : emailResult) : <p className="text-gray-500 font-sans text-center">Your email draft will appear here...</p>}
                        </div>
                    </div>

                    {/* Daily Productivity Spark */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">✨ Get Your Daily Productivity Spark</h2>
                        <p className="text-gray-600 mb-4">Feeling stuck? Select a challenge and our AI will provide a quick, actionable tip to get you moving.</p>
                        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <select value={tipChallenge} onChange={(e) => setTipChallenge(e.target.value)} className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="Beating Procrastination">Beating Procrastination</option>
                                <option value="Staying Focused">Staying Focused</option>
                                <option value="Creative Thinking">Creative Thinking</option>
                                <option value="Efficient Meetings">Efficient Meetings</option>
                                <option value="Managing Emails">Managing Emails</option>
                            </select>
                            <button onClick={handleGetTip} disabled={isTipLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-blue-300">Get My Tip</button>
                        </div>
                        <div className="mt-6 min-h-[100px] flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                           {isTipLoading ? <GeminiLoader /> : tipResult ? <div dangerouslySetInnerHTML={{ __html: tipResult }} /> : <p className="text-gray-500">Your productivity tip will appear here...</p>}
                        </div>
                    </div>

                    {/* Personalized Workspace Motto */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">✨ Your Personalized Workspace Motto</h2>
                        <p className="text-gray-600 mb-4">Enter your profession or goal, and let our AI craft an inspiring motto for your workspace.</p>
                        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input type="text" value={mottoProfession} onChange={(e) => setMottoProfession(e.target.value)} className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Software Developer, Entrepreneur..." />
                            <button onClick={handleGenerateMotto} disabled={isMottoLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-blue-300">Generate My Motto</button>
                        </div>
                        <div className="mt-6 min-h-[100px] flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                            {isMottoLoading ? <GeminiLoader /> : mottoResult ? <div dangerouslySetInnerHTML={{ __html: mottoResult }} /> : <p className="text-gray-500">Your personal motto will appear here...</p>}
                        </div>
                    </div>
                    
                    <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="text-2xl font-bold mb-2">Our Origin Story</h3>
                        <p className="text-gray-600">Founded in the vibrant heart of <span className="font-semibold" style={{ color: '#3B82F6' }}>Mumbai</span>, our brand is inspired by the city's relentless drive and innovation, and is now trusted by professionals worldwide.</p>
                    </div>

                    <div className="md:col-span-1 bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
                        <h3 className="text-2xl font-bold mb-2">Our Mission is Simple</h3>
                        <p className="text-lg">To empower you with essentials that simplify your day and fuel your ambitions. Your productivity is our purpose.</p>
                    </div>
                </main>

                <footer className="text-center mt-12 py-6 border-t border-gray-200">
                    <p className="text-gray-500">&copy; 2025 Summary Goodies. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default App;
