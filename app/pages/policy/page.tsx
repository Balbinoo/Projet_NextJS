import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const PolicyPage: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <NavBar />

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center py-12 px-6">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
                    {/* Header */}
                    <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Privacy Policy</h1>

                    {/* Content */}
                    <div className="space-y-8 text-gray-700">
                        {/* Section 1: Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.
                            </p>
                        </section>

                        {/* Section 2: Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Information:</strong> When you sign up, we may collect your email address and authentication credentials through Firebase.</li>
                                <li><strong>Usage Data:</strong> Information about how you interact with the platform, including IP address, browser type, pages visited, and device information.</li>
                                <li><strong>Game Data:</strong> We may retrieve public gaming data from the Free-to-Play Games API to display content.</li>
                            </ul>
                        </section>

                        {/* Section 3: How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Authentication & Security:</strong> Ensuring secure user access through Firebase.</li>
                                <li><strong>Service Improvement:</strong> Analyzing user behavior to enhance the platform’s experience.</li>
                                <li><strong>Communication:</strong> Sending essential updates regarding your account or platform changes.</li>
                                <li><strong>Compliance:</strong> Adhering to legal obligations and preventing unauthorized access.</li>
                            </ul>
                        </section>

                        {/* Section 4: Data Storage & Security */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Storage & Security</h2>
                            <p className="leading-relaxed">
                                We store user data securely on <strong>MongoDB Atlas</strong> and use <strong>Firebase Authentication</strong> to protect login credentials. While we strive to use commercially acceptable security measures, no method of transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        {/* Section 5: Third-Party Services */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Third-Party Services</h2>
                            <p className="leading-relaxed">We may share necessary data with trusted third-party services:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Firebase Authentication</strong> for login and sign-up services.</li>
                                <li><strong>MongoDB Atlas</strong> for database storage.</li>
                                <li><strong>Free-to-Play Games API</strong> for game-related content.</li>
                                <li><strong>Vercel</strong> for application deployment and hosting.</li>
                            </ul>
                            <p className="leading-relaxed mt-4">These services have their own privacy policies, and we encourage users to review them.</p>
                        </section>

                        {/* Section 6: Cookies & Tracking Technologies */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies & Tracking Technologies</h2>
                            <p className="leading-relaxed">
                                We may use cookies and similar tracking technologies to enhance user experience, analyze trends, and track interactions with the platform.
                            </p>
                        </section>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PolicyPage;
