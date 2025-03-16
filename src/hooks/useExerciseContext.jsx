import { useContext } from "react";
import { ExerciseContext } from "../context/ExerciseContext";

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext)

    if(!context) {
        console.log('useExerciseContext must be used within a ExerciseContextProvider');
        return;
    }


    return context;
}