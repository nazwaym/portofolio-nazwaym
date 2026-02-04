import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaReact,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiTypescript,
  SiKotlin,
} from "react-icons/si";

const SkillCard = ({ name, icon: Icon, color }) => {
  // 3D Tilt Logic
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      className="perspective-1000 relative h-full"
    >
      <div
        className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center group transition-all duration-300 border border-white/5 bg-[#0F0F1A]/40 h-full relative overflow-hidden"
        style={{ "--hover-color": color }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          }}
        />

        <div
          className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg relative z-10"
          style={{ color, transform: "translateZ(20px)" }}
        >
          <Icon />
        </div>

        <span
          className="font-medium text-gray-300 group-hover:text-white transition-colors relative z-10"
          style={{ transform: "translateZ(10px)" }}
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skills = [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  ];

  return (
    <section
      id="skills"
      className="py-24 md:py-32 relative overflow-hidden bg-transparent"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary font-mono text-lg font-bold tracking-[0.3em] uppercase">
              My Stack
            </span>
            <span className="w-12 h-px bg-primary" />
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8">
            TOOLS OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
              THE TRADE.
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            I leverage a modern ecosystem of tools and frameworks to build
            scalable, high-performance web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SkillCard {...skill} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;