import { createContext, useState } from "react";

export const TranslateContext = createContext();

// criando o provider

export const TranslateContextProvider = ({children}) => {
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    return (
        <TranslateContext.Provider value = {{text, setText, translatedText, setTranslatedText}}>
            {children}
            </TranslateContext.Provider>

    )
}