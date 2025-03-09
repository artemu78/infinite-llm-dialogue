import React, { useState, useEffect } from "react";
import { aiRequest, type ChatMessage } from "@/lib/utils";
import { getUserName } from "@/lib/userUtils";
import { userAtom } from "@/lib/atoms";
import { useAtom } from 'jotai';
import { isDebugMode } from "@/lib/utils";

const userName = getUserName();

interface ChatInputProps {
    inputMessage: string;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputMessage,
    setInputMessage,
    setMessages,
}) => {
    const [buttonLabel, setButtonLabel] = useState("Send");
    const [sendIsDisabled, setSendIsDisabled] = useState(false);
    const [user] = useAtom(userAtom);
    const [countdown, setCountdown] = useState<number | null>(null);
    isDebugMode() && console.log({ user });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown !== null) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev !== null && prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setSendIsDisabled(false);
                        setButtonLabel("Send");
                        return null;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        setSendIsDisabled(true);

        const userMessage: ChatMessage = {
            content: inputMessage,
            sender: userName,
            timestamp: new Date().getTime(),
        };

        const loadingMessage: ChatMessage = {
            id: new Date().getTime(),
            content: "Thinking...",
            sender: "System",
            timestamp: new Date().getTime(),
            isLoading: true,
        };

        setMessages((prev) => [...prev, userMessage, loadingMessage]);

        try {
            const aiResponses = await aiRequest(inputMessage, userName, user);
            setMessages((prev) => {
                // Remove the loading message and add all AI responses
                const withoutLoading = prev.filter(
                    (msg) => msg.id !== loadingMessage.id
                );
                return [...withoutLoading, ...aiResponses];
            });
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
        } finally {
            setInputMessage("");
            setCountdown(60); // Start the 1-minute countdown
            setButtonLabel("Send (60s)");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (countdown !== null) {
            setButtonLabel(`Send (${countdown}s)`);
        }
    }, [countdown]);

    return (
        <div className="flex items-center space-x-3">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder="Type your message..."
                disabled={!user || sendIsDisabled}
            />
            <button
                onClick={handleSendMessage}
                className="w-32 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!inputMessage.trim() || !user || sendIsDisabled}
            >
                {buttonLabel}
            </button>
        </div>
    );
};
