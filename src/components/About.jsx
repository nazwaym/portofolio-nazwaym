import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaPaintBrush, FaUsers, FaEye, FaSync } from 'react-icons/fa';
import profileImg from '/images/activities/nazwaym.png';

// --- Components ---

const BentoBox = ({ children, className, delay = 0, title, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={`relative group overflow-hidden rounded-3xl bg-[#0F0F1A]/40 border border-white/5 hover:border-primary/20 transition-all duration-500 p-8 ${className}`}
    >
        {title && (
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="text-primary/60 group-hover:text-primary transition-colors">
                    <Icon size={18} />
                </div>
                <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">{title}</h4>
            </div>
        )}
        <div className="relative z-10">{children}</div>
    </motion.div>
);

const ProfileVisual = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full aspect-[4/5] perspective-1000 group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[#0F0F1A] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative z-10">
                <motion.img
                    src={profileImg}
                    alt="Nazwa"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale-[20%] group-hover:grayscale-0"
                    style={{ objectPosition: "center 20%", transform: "translateZ(30px)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent opacity-80" />

                <div className="absolute top-6 left-6" style={{ transform: "translateZ(50px)" }}>
                    <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Designer & Dev</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header - Centered */}
                <div className="mb-16 lg:mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-px bg-primary"></span>
                            <span className="text-primary font-mono text-sm font-bold tracking-[0.4em] uppercase">About Me</span>
                            <span className="w-12 h-px bg-primary"></span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-8 uppercase tracking-tight">
                            CRAFTING WITH<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient text-glow">PASSION.</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-5 relative lg:sticky lg:top-32">
                        <ProfileVisual />
                    </div>


                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">


                        <BentoBox className="md:col-span-2 bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FaCode size={80} className="rotate-12" />
                            </div>
                            <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed relative z-10">
                                I am a <span className="text-white font-medium italic underline decoration-primary/30 underline-offset-8">Frontend Developer</span> and <span className="text-white font-medium italic underline decoration-secondary/30 underline-offset-8">UI/UX Designer</span> focused on building clean, intuitive, and user-friendly web interfaces.
                            </p>
                        </BentoBox>


                        <BentoBox title="My Process" icon={FaPaintBrush}>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                I usually design in <span className="text-white font-medium">Figma</span> and implement the designs into responsive frontends using <span className="text-primary">React.js</span>, <span className="text-primary">Next.js</span>, <span className="text-secondary">Laravel</span>, and <span className="text-accent">Tailwind CSS</span>.
                            </p>
                        </BentoBox>


                        <BentoBox title="Attention to Detail" icon={FaEye}>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                I pay heavy attention to details, user flow, and visual consistency to ensure the highest quality experience.
                            </p>
                        </BentoBox>


                        <BentoBox title="Collaboration" icon={FaUsers} className="md:col-span-2">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <p className="text-lg text-gray-300 font-light leading-relaxed">
                                        I enjoy collaborating with teams and am open to feedback to continuously improve the quality of my work.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                                        <FaSync className="text-secondary animate-spin-slow" />
                                    </div>
                                </div>
                            </div>
                        </BentoBox>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
