"use client"
import React, { ReactNode, createContext, useState } from "react"

enum MAINMENU {
    HOME, JELAJAH, PROFILE, SETTING, PESAN
}

enum THEMEMODE {
    DARK = 'dark',
    RETRO = "retro"
}

interface CONTEXTVALUE {
    menuAktive: number;
    _handleMenuAktive: (value: number) => void;
    themeMode: string;
    _handleChangeTheme: (value: string) => void;
}

const ContextValue = createContext<CONTEXTVALUE>({
    menuAktive: MAINMENU.HOME,
    _handleMenuAktive(value) { },
    themeMode: THEMEMODE.DARK,
    _handleChangeTheme(value) { },
})


function SetContextProvider({ children }: { children: ReactNode }) {
    const [menuAktive, setMenuAktive] = useState<number>(MAINMENU.HOME)
    const [themeMode, setThemeMode] = useState<string>(() => {
        const getMode = localStorage.getItem("theme-mode")
        return getMode ? getMode : THEMEMODE.RETRO
    })

    function _handleMenuAktive(value: number) {
        setMenuAktive(value)
    }

    function _handleChangeTheme(value: string) {
        setThemeMode(value)
        localStorage.setItem("theme-mode", value)
    }

    return (
        <ContextValue.Provider
            value={{
                menuAktive,
                _handleMenuAktive,
                themeMode,
                _handleChangeTheme
            }}
        >
            {children}
        </ContextValue.Provider>
    )
}

export { ContextValue, SetContextProvider, MAINMENU, THEMEMODE }