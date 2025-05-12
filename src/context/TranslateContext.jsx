import { createContext, useState } from "react";

export const TranslateContext = createContext();

// criando o provider

export const TranslateContextProvider = ({children}) => {
    const [translatedText, setTranslatedText] = useState([]);

    return (
        <TranslateContext.Provider value = {{translatedText, setTranslatedText}}>
            {children}
            </TranslateContext.Provider>

    )
}