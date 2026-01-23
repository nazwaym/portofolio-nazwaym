import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

// --- DEVBOT COMPONENT ---
const DevBot = ({ mousePos }) => {
    // Eye movement logic
    const calculateEyePos = (axis) => {
        if (!mousePos) return 0;
        const limit = 6;
        const windowSize = axis === 'x' ? window.innerWidth : window.innerHeight;
        const current = axis === 'x' ? mousePos.x : mousePos.y;
        const percentage = (current / windowSize) * 2 - 1; // -1 to 1
        return percentage * limit;
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
        >
            {/* Float Animation Wrapper */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full"
            >
                {/* --- BODY GLOW --- */}
                <div className="absolute inset-0 bg-[#A78BFA] opacity-20 blur-[60px] rounded-full animate-pulse" />

                {/* --- ROBOT SVG --- */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    {/* Antennas */}
                    <motion.line x1="60" y1="60" x2="40" y2="30" stroke="#A78BFA" strokeWidth="4" />
                    <motion.circle cx="40" cy="30" r="6" fill="#F472B6"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <motion.line x1="140" y1="60" x2="160" y2="30" stroke="#A78BFA" strokeWidth="4" />
                    <motion.circle cx="160" cy="30" r="6" fill="#F472B6"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />

                    {/* Head */}
                    <rect x="40" y="60" width="120" height="100" rx="30" fill="#1F2937" stroke="#A78BFA" strokeWidth="4" />

                    {/* Face/Screen */}
                    <rect x="55" y="80" width="90" height="60" rx="15" fill="#0F172A" />

                    {/* EYES CONTAINER */}
                    <g transform="translate(75, 100)">
                        {/* Left Eye */}
                        <rect x="0" y="0" width="20" height="25" rx="5" fill="#A78BFA" opacity="0.3" />
                        <motion.rect
                            animate={{ x: calculateEyePos('x'), y: calculateEyePos('y') }}
                            x="0" y="0" width="20" height="25" rx="5" fill="#A78BFA"
                        />
                    </g>
                    <g transform="translate(105, 100)">
                        {/* Right Eye */}
                        <rect x="0" y="0" width="20" height="25" rx="5" fill="#A78BFA" opacity="0.3" />
                        <motion.rect
                            animate={{ x: calculateEyePos('x'), y: calculateEyePos('y') }}
                            x="0" y="0" width="20" height="25" rx="5" fill="#A78BFA"
                        />
                    </g>

                    {/* Mouth */}
                    <motion.path
                        d="M 85 150 Q 100 155 115 150"
                        stroke="#A78BFA" strokeWidth="3" fill="transparent" strokeLinecap="round"
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

const Welcome = ({ onComplete }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [status, setStatus] = useState("idle"); // idle, connecting, connected

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleConnect = () => {
        setStatus("connecting");
        setTimeout(() => {
            setStatus("connected");
            setTimeout(onComplete, 800);
        }, 2000); // 2 seconds load time
    };

    return (
        <AnimatePresence>
            <motion.div
                key="portal"
                className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-display overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                transition={{ duration: 1 }}
            >
                {/* --- 3D GRID BACKGROUND --- */}
                <div className="absolute inset-0 perspective-1000 overflow-hidden pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, rotateX: "90deg" }}
                        animate={{ opacity: 1, rotateX: "60deg" }}
                        transition={{ duration: 2 }}
                        className="absolute -inset-[100%] border-t border-b border-primary/20 bg-[linear-gradient(0deg,transparent_24%,rgba(167,139,250,0.1)_25%,rgba(167,139,250,0.1)_26%,transparent_27%,transparent_74%,rgba(167,139,250,0.1)_75%,rgba(167,139,250,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(167,139,250,0.1)_25%,rgba(167,139,250,0.1)_26%,transparent_27%,transparent_74%,rgba(167,139,250,0.1)_75%,rgba(167,139,250,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"
                        style={{
                            y: "-50%"
                        }}
                    />
                    {/* Grid Animation via CSS in style prop caused issues in loop, using simple div animation */}
                    <style>{`
                        @keyframes gridScroll {
                            0% { background-position: 0px 0px; }
                            100% { background-position: 0px 50px; }
                        }
                    `}</style>
                    <div
                        className="absolute -inset-[100%] border-t border-b border-primary/20 bg-[linear-gradient(0deg,transparent_24%,rgba(167,139,250,0.1)_25%,rgba(167,139,250,0.1)_26%,transparent_27%,transparent_74%,rgba(167,139,250,0.1)_75%,rgba(167,139,250,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(167,139,250,0.1)_25%,rgba(167,139,250,0.1)_26%,transparent_27%,transparent_74%,rgba(167,139,250,0.1)_75%,rgba(167,139,250,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"
                        style={{
                            animation: 'gridScroll 1s linear infinite',
                            transform: 'rotateX(60deg) translateY(-50%)'
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                </div>

                {/* --- CONTENT --- */}
                <div className="relative z-10 flex flex-col items-center">
                    <DevBot mousePos={mousePos} />

                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nazwa's Portal</span>
                        </h1>
                        <p className="text-gray-400 font-light text-lg">
                            Frontend Developer & UI/UX Designer
                        </p>
                    </div>

                    <motion.button
                        onClick={handleConnect}
                        disabled={status !== "idle"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            relative overflow-hidden px-8 py-3 rounded-full font-bold text-lg transition-all shadow-xl flex items-center gap-3
                            ${status === "idle" ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-primary/50 cursor-pointer" : ""}
                            ${status === "connected" ? "bg-green-500 text-white cursor-default" : "bg-white/10 text-white"}
                        `}
                    >
                        {/* LEFT TO RIGHT LOADING FILL */}
                        {status === "connecting" && (
                            <motion.div
                                className="absolute inset-0 bg-primary/80 z-0"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                            />
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                            {status === "idle" && (
                                <>
                                    <FaPlay className="text-sm" /> Enter Universe
                                </>
                            )}
                            {status === "connecting" && "Loading System..."}
                            {status === "connected" && "Access Granted"}
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Welcome;
