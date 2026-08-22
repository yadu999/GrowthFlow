import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}