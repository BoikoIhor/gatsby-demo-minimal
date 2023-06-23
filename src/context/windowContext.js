import React, { createContext, useContext } from 'react';

export const WindowContext = createContext({});

export const useWindow = () => {
    return useContext(WindowContext)
}

const WindowProvider = ({ children }) => {
    return (
        typeof window === "undefined" ?
            null :
            <WindowContext.Provider value={window}>
                {children}
            </WindowContext.Provider>
    );
};

export default WindowProvider;
