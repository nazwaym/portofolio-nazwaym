import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpandAlt, FaTimes, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ActivityCard = ({ activity, index, onClick }) => {
    // Determine grid size based on index for a professional Bento look
    const gridClasses = {
        0: 'md:col-span-8 md:row-span-2', // Large featured
        1: 'md:col-span-4 md:row-span-1', // Small
        2: 'md:col-span-4 md:row-span-1', // Small
        3: 'md:col-span-12 md:row-span-1', // Wide bottom
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => onClick(activity)}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-[#0F0F1A]/40 border border-white/5 hover:border-primary/30 transition-all duration-500 min-h-[280px] ${gridClasses[index] || 'md:col-span-4'}`}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div className="max-w-[80%]">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 mb-2 text-primary/80 font-mono text-[10px] uppercase tracking-widest font-bold"
                        >
                            <FaCalendarAlt size={10} />
                            {activity.date}
                        </motion.div>
                        <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-primary transition-colors leading-tight mb-2">
                            {activity.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                            {activity.description}
                        </p>
                    </div>

                    {/* Expand Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 mb-1">
                        <FaExpandAlt size={14} />
                    </div>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

const ActivityModal = ({ activity, onClose }) => {
    if (!activity) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
                layoutId={`activity-${activity.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl bg-[#0F0F1A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
                {/* Image Section */}
                <div className="md:w-1/2 relative overflow-hidden h-64 md:h-96 md:h-auto">
                    <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-20"
                    >
                        <FaTimes size={18} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-primary/20">
                            Activity Detail
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] italic">
                            <FaCalendarAlt size={10} />
                            {activity.date}
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black font-display text-white mb-6 leading-tight">
                        {activity.title}
                    </h2>

                    <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                        <p>{activity.description}</p>
                        {activity.details && (
                            <div className="pt-6 border-t border-white/5">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-px bg-primary" /> Key Contributions
                                </h4>
                                <ul className="space-y-3">
                                    {activity.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            <span className="text-sm">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                        {activity.location && (
                            <div className="flex items-center gap-2 text-white/40 text-xs italic">
                                <FaMapMarkerAlt size={12} className="text-primary/60" />
                                {activity.location}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Documentation = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        {
            id: 1,
            title: "HIMATIF - Nalar Division",
            date: "March 2025",
            description: "Active member of HIMATIF - Nalar Division, contributing to organizational excellence and digital innovation.",
            image: "/images/activities/HIMATIF1.jpeg",
            location: "Universitas Sultan Ageng Tirtayasa",
            details: [
                "Collaborated with cross-functional teams to organize tech workshops.",
                "Developed digital strategies for organizational growth.",
                "Maintained internal documentation and project tracking.",
                "Fostered a collaborative environment for logic and innovation-based projects."
            ]
        },
        {
            id: 2,
            title: "Paramuda Goes To School V2",
            date: "August 2024",
            description: "Led publication and documentation efforts as a volunteer, capturing and sharing the essence of community education.",
            image: "/images/activities/paramuda.jpeg",
            location: "Sunter Jaya, Jakarta",
            details: [
                "Managed event cinematography and photography for official records.",
                "Produced engaging social media content reaching hundreds of students.",
                "Coordinated with various schools for event execution.",
                "Documented success stories from volunteer programs."
            ]
        },
        {
            id: 3,
            title: "JuaraGCP 2024",
            date: "August 2024",
            description: "Facilitated workshops on Cloud technologies and Open Source contributions.",
            image: "/images/activities/juaragcp.jpeg",
            location: "Google Developers Group",
            details: [
                "Guided developers through Google Cloud Platform fundamentals.",
                "Demonstrated productive Git workflows for collaborative coding.",
                "Shared best practices for open-source project management.",
                "Mentored newcomers in the cloud ecosystem."
            ]
        },
        {
            id: 4,
            title: "Ekraf Developer Day 2025",
            date: "November 2025",
            description: "Participated in intensive workshops covering modern creative technologies and ecosystem development.",
            image: "/images/activities/bddekraf.jpeg",
            location: "Creative Hub Indonesia",
            details: [
                "Explored cutting-edge web technologies and design trends.",
                "Engaged with industry leaders about the future of digital economy.",
                "Analyzed best practices for creative app development.",
                "Expanded professional network within the Indonesian tech ecosystem."
            ]
        }
    ];

    return (
        <section id="documentation" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-px bg-secondary/50"></span>
                            <span className="text-secondary font-mono text-sm font-bold tracking-[0.4em] uppercase">Activities</span>
                            <span className="w-12 h-px bg-secondary/50"></span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-8 uppercase tracking-tight">
                            COMMUNITY<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient text-glow">& IMPACT.</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                            A collection of documentation of academic activities, organizations, and workshops
                        </p>
                    </motion.div>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-fr md:auto-rows-[250px]">
                    {activities.map((activity, index) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            index={index}
                            onClick={setSelectedActivity}
                        />
                    ))}
                </div>
            </div>

            {/* MODAL / DETAIL VIEW */}
            <AnimatePresence>
                {selectedActivity && (
                    <ActivityModal
                        activity={selectedActivity}
                        onClose={() => setSelectedActivity(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Documentation;
