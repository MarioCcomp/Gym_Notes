import React from 'react'

import { useFetch} from '../hooks/useFetch'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';	

import WorkoutClass from '../models/WorkoutClass';
import Exercise from '../models/Exercise';

import './Workouts.css'

const Workouts = () => {

    const url = `http://localhost:3000/workouts`;
       // const {data: workouts, httpConfig} = useFetch(url);
        const [adding, setAdding] = useState(false);

        const [exerciseList, setExerciseList] = useState([]);
        const [exercise, setExercise] = useState(new Exercise("", 0, 0));
        const [title, setTitle] = useState("");


        const [workoutList, setWorkoutList] = useState([]);


        useEffect(() => {
            // Recuperar os treinos do localStorage
            const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
            setWorkoutList(storedWorkouts.map(workout => new WorkoutClass(workout.id, workout.title, workout.exercises.map((ex) => new Exercise(ex.name, ex.sets, ex.reps, ex.workoutData, ex.gifUrl)))));
        }, []);

        // useEffect(() => {
        //     if(workouts) {
        //         setWorkoutList(workouts);
        //     }
        // }, [workouts])

        

        const handleClick = () => {
            setAdding(true);
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
       { !adding && <h2>Meus Treinos</h2>}
       { adding && <h2>Adicionando novo treino</h2>}
        <button onClick={handleClick}>Adicionar Treino</button>
        </div>

        {!adding && <div id="workouts" >
            {workoutList && workoutList.map((workout, index) => (
                <Link to={`/workout/${workout.id}`} key={index}>
                <div className="workout">
                    <h3>{workout.title}</h3>
                </div>
                </Link>
            ))}
            </div>}
       {adding && <div id="add-workout">
            <form id='form-input'>
                <input type="text" placeholder="Título do Treino" onChange={(e) => setTitle(e.target.value)} />
                 <input type="text" placeholder="Nome do Exercício" onChange={(e) => setExercise(new Exercise(e.target.value, exercise.sets, exercise.reps))} />
                 <input type="text" placeholder="Séries"  onChange={(e) => setExercise(new Exercise(exercise.name, parseInt(e.target.value) || 0, exercise.reps)) || 0}/>
                 <input type="text" placeholder="Repetições" onChange={(e) => setExercise(new Exercise(exercise.name, exercise.sets, parseInt(e.target.value) || 0))}/>
                 <button onClick={handleBtn}>Adicionar Exercício</button>
               
                {exerciseList.length ? exerciseList.map((exercise) => (
                    <div className="exercise">
                        <p>Exercício: {exercise.name}</p>
                        <p>Séries: {exercise.sets}</p>
                        <p>Repetições: {exercise.reps}</p>
                    </div>
                )) : <p>Nenhum exercício adicionado</p>}
                <button onClick={handleSubmit}>Adicionar Treino</button>
                <button onClick={() => setAdding(false)}>Voltar</button>
            </form>
            
        </div>}
    </div>
  )
}

export default Workouts