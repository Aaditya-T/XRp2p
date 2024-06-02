import HeaderMain from '@/components/main/HeaderMain';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const TradePage = ({xrpAddress}: {xrpAddress: string}) => {
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
        <>
            <HeaderMain address={xrpAddress} />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <h1 className="text-4xl font-bold mb-8">Trade Page</h1>

                <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex-1 p-6">
                        <h2 className="text-2xl font-semibold mb-4">Chat Section</h2>
                        <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 overflow-y-auto">
                            {chatMessages.map((message, index) => (
                                <p key={index} className="mb-2">{message}</p>
                            ))}
                        </div>
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Type your message" 
                                className="flex-1 border border-gray-300 p-2 rounded-lg mr-2"
                            />
                            <button 
                                onClick={() => handleSendMessage('Hello!')} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/3 bg-blue-50 p-6">
                        <h2 className="text-2xl font-semibold mb-4">Steps Section</h2>
                        <p className="text-xl mb-4">Current Step: {currentStep}</p>
                        <button 
                            onClick={handleNextStep} 
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
                        >
                            Next Step
                        </button>
                        <ul className="list-decimal list-inside">
                            <li className={`py-2 ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                                Accept trade by initiator
                            </li>
                            <li className={`py-2 ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                                Escrow funds
                            </li>
                            <li className={`py-2 ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                                User pays
                            </li>
                            <li className={`py-2 ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>
                                Escrow release
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TradePage;
