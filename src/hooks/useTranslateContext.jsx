import { useContext } from "react";
import { TranslateContext } from "../context/TranslateContext";

export const useTranslateContext = () => {
    const context = useContext(TranslateContext);

    if(!context) {
        console.log('useTranslateContext must be used within a TranslateContextProvider');
        return;
    }

    return context;
}