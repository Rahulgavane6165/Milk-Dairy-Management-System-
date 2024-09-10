// src/theme.js

import { createTheme } from '@mui/material/styles';
import { themeAtom } from './recoil/themeAtom';
import { useRecoilValue } from 'recoil';

export const useCustomTheme = () => {
    const theme = useRecoilValue(themeAtom);

    return createTheme({
        palette: {
            mode: theme,
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#9c27b0',
            },
            background: {
                default: theme === 'light' ? '#f4f6f8' : '#111827',
            },
        },
    });
};
