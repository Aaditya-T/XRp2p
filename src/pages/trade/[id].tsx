import { useRouter } from 'next/router';
import React, { useState } from 'react';

const TradePage = () => {
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const router = useRouter();

    const id = router.query.id;

    const handleSendMessage = (message: string) => {
        setChatMessages([...chatMessages, message]);
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (
        <div>
            <h1>Trade Page</h1>

            <div>
                <h2>Chat Section</h2>
                <div>
                    {chatMessages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
                <input type="text" placeholder="Type your message" />
                <button onClick={() => handleSendMessage('Hello!')}>Send</button>
            </div>

            <div>
                <h2>Steps Section</h2>
                <p>Current Step: {currentStep}</p>
                <button onClick={handleNextStep}>Next Step</button>
            </div>
        </div>
    );
};

export default TradePage;