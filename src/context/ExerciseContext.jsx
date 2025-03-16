import { createContext, useState} from "react";

import Exercise from "../models/Exercise";

export const ExerciseContext = createContext();

// criando o provider

export const ExerciseContextProvider = ({children}) => {
    const [exerciseSelectedNew, setExerciseSelectedNew] = useState(new Exercise());
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    
    return (
        <ExerciseContext.Provider value={{exerciseSelectedNew, setExerciseSelectedNew, isButtonPressed, setIsButtonPressed}}>
        {children}
        </ExerciseContext.Provider>
    )
}