"use client";
import { SiNginx } from "react-icons/si";
import { motion } from "framer-motion";

const MainLoading = () => {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center gap-3">
            <motion.div
                animate={{
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.93, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
            >
                <SiNginx className="text-blue-500 dark:text-secondary w-24 h-24" />
            </motion.div>
            <h1 className="text-2xl font-bold relative flex items-center justify-center gap-2">
                <motion.span
                    animate={{
                        width: ["0%", "100%", "100%"],
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0.85, 0.93, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="z-20 absolute h-full bg-white dark:bg-slate-900"
                />
                <motion.span
                    className="z-10 bg-white dark:bg-slate-900 relative"
                    animate={{
                        opacity: [0, 1, 1, 1, 1, 0],
                        translateX: [30, 30, 0, 0, 0],
                        translateY: [50, 0, 0, 0, 0, 0],
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.95, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                >
                    Neural
                </motion.span>
                <motion.span
                    className="relative"
                    animate={{
                        opacity: [0, 0, 1, 1, 1, 0],
                        translateX: [-25, -25, 0, 0, 0],
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.95, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                >
                    Bank
                </motion.span>
            </h1>
        </section>
    );
};

export default MainLoading;
