import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Sound wave animation behind logo */}
      <div className="relative flex items-center justify-center">
        {/* Animated sound waves */}
        <div className="absolute flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-primary"
              initial={{ height: 8 }}
              animate={{ 
                height: [8, 32, 48, 32, 8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Logo text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex items-baseline"
        >
          <span className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Unmute
          </span>
          <span className="text-4xl md:text-5xl font-bold text-primary">
            1
          </span>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 text-muted-foreground text-sm md:text-base"
      >
        AI-Powered Accessibility for Everyone
      </motion.p>

      {/* Loading dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
