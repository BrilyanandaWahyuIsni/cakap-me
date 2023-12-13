"use client"
import React, { ReactNode, createContext, useState } from "react"

enum MainMenu {
    HOME, JELAJAH, PROFILE, SETTING
}

interface CONTEXTVALUE {
    menuAktive: number;
    _handleMenuAktive: (value: number) => void
}

const ContextValue = createContext<CONTEXTVALUE>({
    menuAktive: MainMenu.HOME, _handleMenuAktive(value) {

    },
})


function SetContextProvider({ children }: { children: ReactNode }) {
    const [menuAktive, setMenuAktive] = useState<MainMenu>(MainMenu.HOME)

    function _handleMenuAktive(value: number) {
        setMenuAktive(value)
    }

    return (
        <ContextValue.Provider value={{ menuAktive, _handleMenuAktive }} >
            {children}
        </ContextValue.Provider>
    )
}

export { ContextValue, SetContextProvider, MainMenu }