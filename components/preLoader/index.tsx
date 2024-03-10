import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import styles from './style.module.scss';

const words: string[] = ["React Js", "JamStack", "HeadLess CMS", "Javascript", "やあ", "Angular", "Tailwind", "Next Js"];

interface Dimension {
  width: number;
  height: number;
}

const Index: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, index === 0 ? 2000 : 250);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.8 },
    },
  };

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className="h-screen w-screen flex items-center justify-center fixed z-50 bg-[#161615]">
      {dimension.width > 0 && (
        <>
          <motion.p className="flex text-white text-xl items-center absolute z-10" variants={opacity} initial="initial" animate="enter">
            <span className="block w-10 h-10 bg-white rounded-full mr-4"></span>
            {words[index]}
          </motion.p>
          <svg className='absolute top-0 w-full h-[calc(100% + 300px)]'>
            <motion.path className="fill-[#161615] text-gray-900" variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Index;
