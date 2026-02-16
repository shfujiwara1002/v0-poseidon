export const priceFlashVariants = {
  idle: { backgroundColor: 'transparent' },
  up: {
    backgroundColor: ['rgba(20, 184, 166, 0.15)', 'rgba(20, 184, 166, 0.15)', 'transparent'],
    transition: { duration: 2, times: [0, 0.1, 1] },
  },
  down: {
    backgroundColor: ['rgba(239, 68, 68, 0.15)', 'rgba(239, 68, 68, 0.15)', 'transparent'],
    transition: { duration: 2, times: [0, 0.1, 1] },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export const chartPointEntry = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

export const numberRoll = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.3 },
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(0, 240, 255, 0)',
      '0 0 0 4px rgba(0, 240, 255, 0.15)',
      '0 0 0 0 rgba(0, 240, 255, 0)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};
