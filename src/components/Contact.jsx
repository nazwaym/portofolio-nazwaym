import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    FaCheckCircle,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPaperPlane
} from 'react-icons/fa';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC
            )
            .then(
                () => {
                    setFormStatus('success');
                    formRef.current.reset();
                    setTimeout(() => setFormStatus('idle'), 5000);
                },
                (error) => {
                    console.error('EmailJS Error:', error);
                    alert('Failed to send message. Please try again.');
                    setFormStatus('idle');
                }
            );
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-primary" />,
            label: 'Email',
            value: 'yuliantimunjanan@gmail.com',
            link: 'mailto:yuliantimunjanan@gmail.com'
        },
        {
            icon: <FaLinkedin className="text-[#0077B5]" />,
            label: 'LinkedIn',
            value: 'Nazwa Yulianti M',
            link: 'https://linkedin.com/in/nazwa-yulianti-munjana-89775b2b4'
        },
        {
            icon: <FaGithub className="text-white" />,
            label: 'GitHub',
            value: 'nazwaym',
            link: 'https://github.com/nazwaym'
        },
        {
            icon: <FaMapMarkerAlt className="text-red-500" />,
            label: 'Location',
            value: 'Indonesia',
            link: '#'
        }
    ];

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
            {/* Subtle Section Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-px bg-secondary"></span>
                                <span className="text-secondary font-mono text-lg font-bold tracking-[0.3em] uppercase">Inquiry</span>
                                <span className="w-12 h-px bg-secondary"></span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-8">
                                LET'S<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">CONNECT.</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                                I enjoy meeting new people and ideas. If you’re interested in collaborating or have any questions, don’t hesitate to contact me.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6">
                                    Contact Information
                                </h3>

                                <div className="space-y-6">
                                    {contactInfo.map((info, idx) => (
                                        <a
                                            key={idx}
                                            href={info.link}
                                            className="flex items-center gap-4 group transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                    {info.label}
                                                </p>
                                                <p className="text-gray-200 group-hover:text-primary transition-colors">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

                                {formStatus === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                            <FaCheckCircle className="text-4xl text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Message Sent!
                                        </h3>
                                        <p className="text-gray-400">
                                            Thank you for reaching out. I'll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-8 text-primary hover:text-accent font-medium"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input
                                                name="user_name"
                                                required
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                            />
                                            <input
                                                name="user_email"
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                            />
                                        </div>

                                        <textarea
                                            name="message"
                                            required
                                            rows="5"
                                            placeholder="Your Message"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none"
                                        />

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full bg-gradient-to-r from-primary to-accent py-4 rounded-xl font-bold flex items-center justify-center gap-3"
                                        >
                                            {formStatus === 'sending' ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <FaPaperPlane />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
