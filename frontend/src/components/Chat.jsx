import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [currQue, setQue] = useState('');
    const [msg, setmsg] = useState([]);

    async function sendQue(question) {
        if (!question.trim()) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/youtube/response`,
                { question },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const llm_response = response.data;

                setmsg(prev => [
                    ...prev,
                    { role: 'human', text: llm_response.Human },
                    { role: 'ai', text: llm_response.AI }
                ]);

                setQue('');
            }
        } catch (error) {
            console.log(error.response?.data || error);
        }
    }

    return (
        <div className="Chat relative flex flex-col h-[500px] px-5 py-7">

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto mb-20 space-y-4">
                {msg.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.role === 'human'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap break-words ${
                                message.role === 'ai'
                                    ? 'bg-[#FF0033] text-white'
                                    : 'bg-white text-black border border-gray-200'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat input */}
            <form
                className="absolute bottom-4 left-5 right-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendQue(currQue);
                }}
            >
                <div className="box bg-[#FF0033] rounded-2xl flex gap-3 px-4 py-3">
                    <input
                        value={currQue}
                        size="80"
                        onChange={(e) => setQue(e.target.value)}
                        className="flex-1 min-w-0 font-medium text-white py-1.5 px-3 outline-none bg-transparent placeholder:text-white/70"
                        type="text"
                        placeholder="Ask about this video..."
                    />

                    <button
                        className="bg-gray-50 text-black py-1 px-3 rounded-lg active:scale-95 cursor-pointer"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Chat;
