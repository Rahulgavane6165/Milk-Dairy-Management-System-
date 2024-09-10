import { Alert, Slide, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState({ open: false, message: '', severity: 'info', duration: 6000, });

    const showSnackbar = ({ message, severity = 'info', duration = 6000 }) => {
        setSnackbarState({ open: true, message, severity, duration });
    };

    const closeSnackbar = () => {
        setSnackbarState((prevState) => ({ ...prevState, open: false }));
    };

    const Transition = (props) => {
        return <Slide {...props} direction="up" />;
    };

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar open={snackbarState.open} autoHideDuration={snackbarState.duration} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={Transition}>
                <Alert onClose={closeSnackbar} severity={snackbarState.severity} >
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    return useContext(SnackbarContext);
};



