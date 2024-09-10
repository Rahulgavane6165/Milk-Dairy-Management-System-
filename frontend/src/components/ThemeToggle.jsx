// src/components/ThemeToggle.jsx

import { DarkMode, LightMode } from '@mui/icons-material'; // Use DarkMode and LightMode icons

import React from 'react';
import { themeAtom } from '../recoil/themeAtom';
import { useRecoilState } from 'recoil';

const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button onClick={toggleTheme} className="px-2 rounde">
      {theme === 'light' ? <LightMode /> : <DarkMode />} {/* Updated icons */}
    </button>
  );
};

export default ThemeToggle;
