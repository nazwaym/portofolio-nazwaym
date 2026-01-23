import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaCss3Alt, FaDatabase, FaExternalLinkAlt, FaGithub, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiGraphql, SiNextdotjs, SiTailwindcss, SiTypescript, SiVite, SiFigma } from 'react-icons/si';

// --- ICONS MAPPING ---
const getTechIcon = (tag) => {
    const icons = {
        'React': <FaReact className="text-[#61DAFB]" />,
        'Next.js': <SiNextdotjs className="text-white" />,
        'Tailwind': <SiTailwindcss className="text-[#38B2AC]" />,
        'Tailwind CSS': <SiTailwindcss className="text-[#38B2AC]" />,
        'Vite': <SiVite className="text-[#646CFF]" />,
        'TypeScript': <SiTypescript className="text-[#3178C6]" />,
        'CSS Modules': <FaCss3Alt className="text-[#264DE4]" />,
        'Node.js': <FaNodeJs className="text-[#68A063]" />,
        'Database': <FaDatabase className="text-[#eee]" />,
        'GraphQL': <SiGraphql className="text-[#E10098]" />,
        'PHP (Laravel)': <span className="text-[#777BB4] font-bold">PHP</span>,
        'Figma': <SiFigma className="text-[#F24E1E]" />,
        'MySQL': <FaDatabase className="text-[#4479A1]" />,
        'Bootstrap': <span className="text-[#7952B3] font-bold">B</span>,
        'Chart.js': <span className="text-[#FF6384] font-bold">C</span>,
        'HTML5': <FaHtml5 className="text-[#E34F26]" />,
        'CSS3': <FaCss3Alt className="text-[#1572B6]" />,
        'Javascript': <FaJs className="text-[#F7DF1E]" />,
    };
    return icons[tag] || null;
};

// --- HOLO CARD COMPONENT ---
const HoloCard = ({ title, description, tags, image, demoLink, repoLink, index }) => {
    // Mouse tracking for 3D Tilt
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax for Image (moves opposite to card)
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[420px] rounded-2xl perspective-1000 group z-10"
        >
            {/* --- HOLOGRAPHIC BORDER GLOW --- */}
            <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ transform: "translateZ(-20px)" }}
            />

            {/* --- GLASS CARD BODY --- */}
            <div className="absolute inset-0 bg-[#0F0F1A]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col clip-path-cyber ring-1 ring-white/5 hover:ring-primary/40 transition-all duration-500">

                {/* --- HEADER: Image Area (Parallax) --- */}
                <div className="relative h-48 overflow-hidden border-b border-white/5 group-hover:border-primary/30 transition-colors bg-black/40">
                    {/* Glass Overlay on Image */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0F0F1A] via-transparent to-white/5 opacity-50" />

                    <motion.div
                        style={{ x: imageX, y: imageY, scale: 1.15 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover object-center transition-all duration-700 brightness-90 group-hover:brightness-110 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/600x400/1F2937/A78BFA/png?text=Preview+Coming+Soon';
                            }}
                        />
                    </motion.div>

                    {/* Tech Badge Overlay */}
                    <div className="absolute top-3 right-3 z-30 flex gap-1.5">
                        {tags.map((tag, idx) => {
                            const icon = getTechIcon(tag);
                            if (!icon) return null;
                            return (
                                <div key={idx} className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-sm hover:scale-110 transition-transform">
                                    {icon}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- BODY: Projects Info --- */}
                <div className="p-5 flex flex-col flex-grow relative z-20">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                            {title}
                        </h3>
                        {/* Status Dot */}
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3 font-light">
                        {description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400 group-hover:border-primary/20 group-hover:text-primary/80 transition-all uppercase tracking-wider">
                                    {getTechIcon(tag) && <span className="text-xs">{getTechIcon(tag)}</span>}
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* --- ACTIONS --- */}
                        <div className="flex gap-3">
                            <a
                                href={demoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <FaExternalLinkAlt size={12} /> View Project
                            </a>
                            {repoLink && repoLink !== "#" && (
                                <a
                                    href={repoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300"
                                >
                                    <FaGithub size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- DECORATIVE HUD ELEMENTS --- */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>
            </div>
        </motion.div>
    );
};

const HoloText = ({ text }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1 max-w-lg">
            {text.split(" ").map((word, wordIndex) => (
                <div key={wordIndex} className="flex whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <HoloChar key={`${wordIndex}-${charIndex}`} char={char} />
                    ))}
                    {/* Add space between words */}
                    <span className="w-2"></span>
                </div>
            ))}
        </div>
    );
};

const HoloChar = ({ char }) => {
    return (
        <motion.span
            whileHover={{
                scale: 1.5,
                color: "#A78BFA",
                textShadow: "0 0 8px rgba(167,139,250,0.8)",
                y: -5
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block cursor-default text-gray-400 font-mono transition-colors duration-200"
        >
            {char}
        </motion.span>
    );
};

const Projects = () => {
    // Spotlight Effect State
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const projects = [
        {
            title: "HijabNazwa",
            description: "An elegant e-commerce landing page designed for a Hijab brand, featuring a responsive product gallery and a seamless user interface for online shopping experiences.",
            tags: ["React", "Tailwind", "Vite"],
            image: "/images/projects/hijab.png",
            demoLink: "https://hijabnazwa.vercel.app/",
            repoLink: "https://github.com/nazwaym/HijabNazwa.github.io"
        },
        {
            title: "Dompet Pintar",
            description: "An intuitive personal finance tracker built with Laravel, allowing users to manage budgets and visualize spending patterns effectively.",
            tags: ["PHP (Laravel)", "MySQL", "Tailwind CSS", "Bootstrap", "Chart.js"],
            image: "/images/projects/dompetpintar.png",
            demoLink: "https://dompet-pintar-gamma.vercel.app/",
            repoLink: "https://github.com/nazwaym/DompetPintar"
        },
        {
            title: "Islamic Kids",
            description: "Interactive Islamic learning platform for children. I worked as UI/UX Designer & Researcher, creating child-friendly interfaces and intuitive user flows.",
            tags: ["Figma", "UI/UX Design"],
            image: "/images/projects/islamickids.png",
            demoLink: "https://play.google.com/store/apps/details?id=com.islamickids.uas&pcampaignid=web_share",
            repoLink: "https://github.com/nazwaym/islamic-kids"
        },

        {
            title: "Redesain Satu Sehat",
            description: "UI/UX redesign of Indonesia's SATUSEHAT app, using HCI principles to improve accessibility for elderly users and streamline the digital health experience.",
            tags: ["Figma", "HCI", "UI/UX Redesign"],
            image: "/images/projects/redesainsatusehat.png",
            demoLink: "https://www.figma.com/design/RMLLmcFYpqMiqt9hYbDQBb/IMK?node-id=24-458&t=RprFnzZNFtyyXUQF-1",
        },
        {
            title: "Resoku",
            description: "Restoku is a restaurant ordering web app designed with user-centered flows, clear information, and consistent interaction patterns to support efficient menu browsing, ordering, and admin order management.",
            tags: ["Figma", "UI/UX Design"],
            image: "/images/projects/restoku.png",
            demoLink: "https://www.figma.com/design/xaM9BoP2nH9kdTRWZgmWma/PBO?node-id=0-1&p=f&t=ajVDCzUgcqE7mWNh-0", // Placeholder link
        }


    ];

    return (
        <section
            id="projects"
            className="py-24 md:py-32 relative overflow-hidden bg-transparent"
            onMouseMove={handleMouseMove}
        >
            {/* Background Glows */}
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* --- SPOTLIGHT BACKGROUND EFFECT --- */}
            <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 lg:opacity-100"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.08), transparent 40%)`
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-px bg-primary"></span>
                            <span className="text-primary font-mono text-lg font-bold tracking-[0.3em] uppercase">Showcase</span>
                            <span className="w-12 h-px bg-primary"></span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8">
                            DIGITAL<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">EXPERIMENTS.</span>
                        </h2>
                        {/* Interactive Holo Text */}
                        <div className="mt-4">
                            <HoloText text="A collection of products where code meets creativity." />
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <HoloCard key={index} {...project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
