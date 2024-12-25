"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopLayout({ children }) {
    const animationVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
    };

    return (
        <AnimatePresence>
            <motion.section
                variants={animationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {children}
            </motion.section>
        </AnimatePresence>
    );
}
export default ShopLayout