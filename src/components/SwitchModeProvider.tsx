import React, {createContext, useContext, useState} from 'react';

interface Context {
    switchMode: 'MM' | 'BL'
    setSwitchMode: React.Dispatch<React.SetStateAction<'MM' | 'BL'>>
}

const SwitchModeContext = createContext({} as Context)

export const SwitchModeProvider: React.FC = ({ children }) => {
    const [switchMode, setSwitchMode] = useState<'MM' | 'BL'>('MM')

    return <SwitchModeContext.Provider value={{
        switchMode,
        setSwitchMode,
    }}>
        {children}
    </SwitchModeContext.Provider>
}

export const useSwitchModeContext = () => useContext(SwitchModeContext)