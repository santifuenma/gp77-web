import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} // Small start offset
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Small exit offset
            transition={{ duration: 0.3, ease: "easeOut" }} // Slightly faster but smooth
            style={{ width: "100%" }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
