import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Wifi } from 'lucide-react';

const MESSAGES = [
    'Preparing your bookstore experience…',
    'Waking up the server, please wait…',
    'Loading your reading collection…',
    'Almost there, hang tight…',
    'Setting up something great for you…',
];

const WakeUpScreen = ({ inline = false }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const content = (
        <div
            className={`flex flex-col items-center justify-center ${inline ? 'py-16' : 'py-32'}`}
            role="status"
            aria-live="polite"
            aria-label="Server is starting up, please wait"
        >
            {/* Animated Book Icon */}
            <div className="relative mb-8">
                <div className="wakeup-glow" />
                <Motion.div
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="relative z-10"
                >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                        <BookOpen className="h-10 w-10 text-white" />
                    </div>
                </Motion.div>

                {/* Connection indicator */}
                <Motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-2 -right-2 z-20"
                >
                    <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-md">
                        <Wifi className="h-3.5 w-3.5 text-white" />
                    </div>
                </Motion.div>
            </div>

            {/* Rotating Message */}
            <div className="h-8 flex items-center justify-center mb-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <Motion.p
                        key={messageIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4 }}
                        className="text-gray-600 dark:text-gray-300 font-medium text-center text-base sm:text-lg"
                    >
                        {MESSAGES[messageIndex]}
                    </Motion.p>
                </AnimatePresence>
            </div>

            {/* Loading Dots */}
            <div className="flex gap-2 mt-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                    <Motion.div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-primary-500"
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Subtle explanation */}
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 text-center max-w-sm px-4">
                Our server is warming up after a period of inactivity. This usually takes 15–30 seconds.
            </p>
        </div>
    );

    if (inline) return content;

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {content}
        </Motion.div>
    );
};

export default WakeUpScreen;
