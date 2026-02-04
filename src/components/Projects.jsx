import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaReact,
  FaCss3Alt,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaLaravel,
  FaAndroid,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiFigma,
  SiMysql,
  SiKotlin,
} from "react-icons/si";

/* ================= TECH ICON MAP ================= */
const getTechIcon = (tag) => {
  const icons = {
    React: <FaReact className="text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="text-white" />,
    Tailwind: <SiTailwindcss className="text-[#38B2AC]" />,
    "Tailwind CSS": <SiTailwindcss className="text-[#38B2AC]" />,
    Vite: <SiVite className="text-[#646CFF]" />,
    TypeScript: <SiTypescript className="text-[#3178C6]" />,
    JavaScript: <FaJs className="text-[#F7DF1E]" />,
    HTML5: <FaHtml5 className="text-[#E34F26]" />,
    CSS3: <FaCss3Alt className="text-[#1572B6]" />,

    Laravel: <FaLaravel className="text-[#FF2D20]" />,
    MySQL: <SiMysql className="text-[#4479A1]" />,
    Database: <FaDatabase className="text-gray-300" />,

    Kotlin: <SiKotlin className="text-[#7F52FF]" />,
    Android: <FaAndroid className="text-[#3DDC84]" />,

    Figma: <SiFigma className="text-[#F24E1E]" />,
    "UI/UX Design": <SiFigma className="text-[#F24E1E]" />,
    HCI: <SiFigma className="text-pink-400" />,
  };

  return icons[tag] || null;
};

/* ================= HOLO CARD ================= */
const HoloCard = ({
  title,
  description,
  tags,
  image,
  demoLink,
  repoLink,
  index,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-2xl"
    >
      <div className="bg-[#0F0F1A]/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col">

        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover brightness-90"
            loading="lazy"
          />

          {/* TECH ICONS */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {tags.map(
              (tag, i) =>
                getTechIcon(tag) && (
                  <div
                    key={i}
                    className="p-2 rounded-md bg-black/60 border border-white/10"
                  >
                    {getTechIcon(tag)}
                  </div>
                )
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-xs py-2 rounded-md bg-primary text-white font-semibold text-center hover:opacity-90"
              >
                View Project
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= PROJECTS ================= */
const Projects = () => {
  const projects = [
    {
      title: "HijabNazwa",
      description:
        "Modern e-commerce landing page with responsive layout and clean shopping experience.",
      tags: ["React", "Tailwind", "Vite"],
      image: "/images/projects/hijab.png",
      demoLink: "https://hijab-nazwa.vercel.app/",
      repoLink: "https://github.com/nazwaym/HijabNazwa",
    },
    {
      title: "Dompet Pintar",
      description:
        "Personal finance web app for tracking expenses, budgets, and insights.",
      tags: ["Laravel", "React", "Tailwind CSS", "MySQL"],
      image: "/images/projects/dompetpintar.png",
      demoLink: "https://dompet-pintar-gamma.vercel.app/",
      repoLink: "https://github.com/nazwaym/DompetPintar",
    },
    {
      title: "Islamic Kids",
      description:
        "Interactive Islamic learning app with child-friendly UI and UX research.",
      tags: ["Figma", "UI/UX Design"],
      image: "/images/projects/islamickids.png",
      demoLink:
        "https://play.google.com/store/apps/details?id=com.islamickids.uas",
    },
    {
      title: "Pizza App",
      description:
        "Android pizza ordering app with smooth navigation and dynamic menu.",
      tags: ["Kotlin", "Android"],
      image: "/images/projects/pizza.png",
      repoLink: "https://github.com/nazwaym/PizzaApp",
    },
    {
      title: "SATUSEHAT Redesign",
      description:
        "UI/UX redesign focused on accessibility and elderly-friendly interaction.",
      tags: ["Figma", "HCI", "UI/UX Design"],
      image: "/images/projects/redesainsatusehat.png",
      demoLink:
        "https://www.figma.com/design/RMLLmcFYpqMiqt9hYbDQBb/IMK",
    },
    {
      title: "Restoku",
      description:
        "Restaurant ordering system with clear user flow and admin management.",
      tags: ["Figma", "UI/UX Design"],
      image: "/images/projects/restoku.png",
      demoLink:
        "https://www.figma.com/design/xaM9BoP2nH9kdTRWZgmWma/PBO",
    },
  ];

  return (
    <section id="projects" className="py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-5xl font-black text-white mb-16">
          PROJECTS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <HoloCard key={i} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
