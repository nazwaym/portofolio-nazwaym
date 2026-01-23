import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaEnvelope, FaFileAlt, FaReact, FaHtml5, FaGitAlt, FaUser } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiVite, SiFigma } from 'react-icons/si';
import useTypewriter from '../hooks/useTypewriter';



const HeroVisual = React.memo(({ displayIcons }) => {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Calculate rect once on mouse enter to avoid layout thrashing during move
    const rectRef = React.useRef(null);

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;

        const width = rectRef.current.width;
        const height = rectRef.current.height;
        const mouseX = e.clientX - rectRef.current.left;
        const mouseY = e.clientY - rectRef.current.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        rectRef.current = null; // Reset
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
        >
            {/* Icons placed on the ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full rounded-full border-[6px] md:border-[8px] border-[#F0ABFC]" // Thick Pink Ring
                style={{ transform: "translateZ(20px)" }}
            >
                {/* Icons placed on the ring */}
                {displayIcons.map((item, index) => {
                    const angle = index * (360 / displayIcons.length);
                    return (
                        <div
                            key={index}
                            className="absolute w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8 flex items-center justify-center bg-[#2D1B4E] rounded-full border-2 border-[#F0ABFC] shadow-lg"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`, // Translate 150px = Radius (half of 300px)
                            }}
                        >
                            {/* Counter Rotate Icon to keep it upright while ring spins */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <item.icon className="text-xl md:text-3xl" style={{ color: item.color }} />
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Static Center Avatar */}
            <div
                className="absolute w-32 h-32 md:w-40 md:h-40 bg-[#E0B0FF] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(224,176,255,0.4)] z-20"
                style={{ transform: "translateZ(40px)" }}
            >
                <FaUser className="text-5xl md:text-6xl text-[#2D1B4E]" />
            </div>

        </motion.div>
    )
});

const Hero = () => {
    const roles = ["Frontend Developer", "UI/UX Designer"];
    const displayedRole = useTypewriter(roles);

    // Memoize icons to prevent re-renders of HeroVisual
    const displayIcons = React.useMemo(() => [
        { icon: FaReact, color: "#61DAFB" },
        { icon: SiJavascript, color: "#F7DF1E" },
        { icon: SiTailwindcss, color: "#38B2AC" },
        { icon: SiFigma, color: "#F24E1E" },
        { icon: FaHtml5, color: "#E34F26" },
        { icon: SiVite, color: "#646CFF" },
    ], []);

    return (
        <section
            id="home"
            className="min-h-screen flex items-center relative overflow-hidden py-28 md:py-0"
        >
            {/* Subtle Section Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

                    {/* Text Content - Left Side */}
                    <motion.div
                        className="flex-1 text-center md:text-left flex flex-col items-center md:items-start z-20"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >


                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white font-display tracking-tight">
                            Hello, I'm <br />
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block pb-1">
                                Nazwa
                            </span>
                        </h1>

                        <div className="h-10 mb-8 flex items-center justify-center md:justify-start">
                            <span className="text-xl md:text-3xl font-medium text-gray-400 mr-3">I am a</span>
                            <span className="text-xl md:text-3xl font-bold text-white font-mono min-w-[280px] text-left">
                                {displayedRole}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-secondary ml-1"
                                >
                                    |
                                </motion.span>
                            </span>
                        </div>

                        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                            Frontend Developer & UI/UX Designer dedicated to building responsive, user-centric web applications.
                            I blend creative design with clean code.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-medium shadow-lg shadow-primary/25 transition-all flex items-center gap-2 text-lg group"
                            >
                                <FaEnvelope className="group-hover:rotate-12 transition-transform" /> Contact Me
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Visual Content (Avatar) - Right Side */}
                    <motion.div
                        className="flex-1 flex justify-center md:justify-end relative z-10 mt-8 md:mt-0"
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <HeroVisual displayIcons={displayIcons} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
