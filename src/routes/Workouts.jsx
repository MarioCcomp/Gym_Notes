import React from 'react'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';	

import WorkoutClass from '../models/WorkoutClass';
import Exercise from '../models/Exercise';

import './Workouts.css'

const Workouts = () => {


        const [exerciseList, setExerciseList] = useState([]);
        const [exercise, setExercise] = useState(new Exercise("", 0, 0));
        const [title, setTitle] = useState("");


        const [workoutList, setWorkoutList] = useState([]);


        useEffect(() => {

            const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
            setWorkoutList(storedWorkouts.map(workout => new WorkoutClass(workout.id, workout.title, workout.exercises.map((ex) => new Exercise(ex.name, ex.sets, ex.reps, ex.workoutData, ex.gifUrl)))));
        }, []);

    
        

        const handleClick = () => {
            const newWorkout = new WorkoutClass(workoutList.length + 1, `Treino ${workoutList.length + 1}`, []);
            const updatedWorkouts = [...workoutList, newWorkout];
            setWorkoutList(updatedWorkouts);
            localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        }

        const handleBtn = (e) => {
            e.preventDefault();
            setExerciseList([...exerciseList, exercise]);
            setExercise(new Exercise("", 0, 0));
        }
        
        const handleSubmit = (e) => {
            e.preventDefault();
            setAdding(false);
            const newWorkout = new WorkoutClass(workoutList.length + 1, title, exerciseList);

            // httpConfig(newWorkout, "POST");


            // Adicionar o novo treino ao localStorage
            const updatedWorkouts = [...workoutList, newWorkout];

               // Atualizar o estado
             setWorkoutList(updatedWorkouts); 
             localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));

            
        }



  return (
    <div id='app'>
        <div id="header">
        <Link to="/"><i className="bi bi-arrow-left"></i></Link>
       <h2>Meus Treinos</h2>
        <button onClick={handleClick}>Adicionar Treino</button>
        </div>

        <div id="workouts" >
            {workoutList && workoutList.map((workout, index) => (
                <Link to={`/workout/${workout.id}`} key={index}>
                <div className="workout">
                    <h3>{workout.title}</h3>
                </div>
                </Link>
            ))}
            </div>
    </div>
  )
}

export default Workouts