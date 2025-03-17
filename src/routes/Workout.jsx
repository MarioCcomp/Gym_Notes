import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import { useExerciseContext } from '../hooks/useExerciseContext';

import './Workout.css'

import GymApi from '../components/GymApi';

import WorkoutClass from '../models/WorkoutClass';
import Exercise from '../models/Exercise';


const Workout = () => {

    const { exerciseSelectedNew, setExerciseSelectedNew, isButtonPressed, setIsButtonPressed } = useExerciseContext();
    //const url = `http://localhost:3000/workouts/${id}`;
    // const {data: item, httpConfig} = useFetch(url);
    const [base, setBase] = useState(false);
    const [pers, setPers] = useState(false);
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [adding, setAdding] = useState(false);
    const [exercise, setExercise] = useState(new Exercise("", 0, 0, [], null));
    const [exerciseList, setExerciseList] = useState([]);
    const [seriesData, setSeriesData] = useState([]);

    const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);



    const [item, setItem] = useState(null); // local storage


    // useEffect(() => {
    //     if (item.exercises) {
    //         setExerciseList(item.exercises);  salvando no db.json
    //     }
    // }, [item]);


    //  
    useEffect(() => {
        // Recupera os dados da localStorage
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];

        // Encontre o workout correspondente ao ID
        const workoutItem = storedWorkouts.find(workout => workout.id === parseInt(id));

        if (workoutItem) {
            // Criar uma instância de WorkoutClass

            const workoutInstance = new WorkoutClass(
                workoutItem.id,
                workoutItem.title,
                workoutItem.exercises.map(e => new Exercise(e.name, e.sets, e.reps, e.workoutData, e.gifUrl)) // Recriando instâncias
            );


            // const workoutInstance = new WorkoutClass(workoutItem.id, workoutItem.title, workoutItem.exercises.map(e => {
            //     // Aqui, recriamos as instâncias de Exercise corretamente
            //     const ex = new Exercise(e.name, e.sets, e.reps, e.workoutData, e.gifUrl);
            //     return ex;
            // }));

            setWorkout(workoutInstance);
            setExerciseList(workoutInstance.exercises);  // Lista de exercícios com métodos restaurados
        }
    }, [id]);



    const handleBtn = (newExercise) => {


        // const newExercise = exerciseSelectedNew; // OO

        // const newExercise = exercise;

        newExercise.id = new Date().getTime(); // OO




        setExerciseList([...exerciseList, newExercise]); // Adiciona o novo exercício à lista
        workout.addExercise(newExercise); // OO


        const updatedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        const updatedWorkoutList = updatedWorkouts.map(work => (work.id === workout.id ? workout : work));
        localStorage.setItem('workouts', JSON.stringify(updatedWorkoutList));

        setIsButtonPressed(false);
        setAdding(false);
        setBase(false);
        setExercise(new Exercise("", 0, 0, [], null));
        







    }

    const toggleSelect = (index) => {
        setSelectedExerciseIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleSeriesDataChange = (exerciseIndex, setIndex, field, value) => {
        const updatedSeriesData = [...seriesData];
        if (!updatedSeriesData[exerciseIndex]) {
            updatedSeriesData[exerciseIndex] = [];
        }

        updatedSeriesData[exerciseIndex][setIndex] = {
            ...updatedSeriesData[exerciseIndex][setIndex],
            [field]: value,
        };

        setSeriesData(updatedSeriesData);
    };

    const handleFinishWorkout = () => {

        const currentDate = new Date().toISOString().split('T')[0];
        workout.exercises.forEach((exercise, exerciseIndex) => {
            const exerciseSeries = seriesData[exerciseIndex] || [];
            exercise.addWorkoutData(currentDate, exerciseSeries);
        });

        const updatedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        const updatedWorkoutList = updatedWorkouts.map(work => (work.id === workout.id ? workout : work));
        localStorage.setItem('workouts', JSON.stringify(updatedWorkoutList));

        setSeriesData([]);

        console.log(updatedWorkoutList);


    };






    const handleInfo = (exerciseIndex, setIndex) => {
        // Acessa o histórico de treinos do exercício específico
        const lastWorkoutData = workout.exercises[exerciseIndex].lastWorkoutData();


        if (lastWorkoutData) {
            const currentSet = lastWorkoutData.sets[setIndex]; // Acessa o conjunto de dados da série com o setIndex

            // Formata a informação que você deseja mostrar
            const exercise = `No último treino, você fez ${currentSet.reps} repetições com ${currentSet.carga}kg e com RIR de ${currentSet.rir}`;
            console.log(exercise);
        } else {
            console.log("Nenhuma informação de treino encontrada.");
        }
    }

    const handleClear = (e, exerciseIndex, setIndex) => {
        e.preventDefault();

        const updatedSeriesData = [...seriesData];
        // Limpa os dados de seriesData para todos os exercícios e sets

        if (updatedSeriesData[exerciseIndex] && updatedSeriesData[exerciseIndex][setIndex]) {
            updatedSeriesData[exerciseIndex][setIndex] = null;  // Limpa os dados do set específico
        }

        // Ou, se você quiser limpar apenas os dados de um exercício específico, você pode fazer algo assim:
        setSeriesData(updatedSeriesData); // Limpa todos os dados
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setExercise(new Exercise(exercise.name, exercise.sets, exercise.reps, exercise.workoutData, fileUrl));
        }
    }




    return (
        <div id='container'>

            {/* HEADER */}

            {!adding && <div id="header">
                <Link to="/workouts"><i className="bi bi-arrow-left"></i></Link>
                <h2>{workout ? workout.title : 'Carregando...'}</h2>
                <button onClick={() => setAdding(true)}>Adicionar Exercício</button>
                {/* <p>Total de exercícios: {item.exercises.length}</p> */}
            </div>}

            {/* SHOWING EXERCISES */}

            {!adding && <div id="exercises">
                {workout && workout.exercises && workout.exercises.length > 0 && workout.exercises && workout.exercises.map((exercise, index) => (
                    <div className="exercise" key={exercise.id}>
                        <img src={exercise.gifUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToATq5Ity951LejrsOaJ2mfSjK7ACTBWw2iQ&s"} alt="treino" className="image-preview" />

                        <p>Exercício: {exercise.name}</p>
                        <p>Séries: {exercise.sets} <i className={`bi bi-arrow-${selectedExerciseIndex === index ? 'down' : 'right'}`} onClick={() => toggleSelect(index)}></i></p>
                        {selectedExerciseIndex === index && [...Array(exercise.sets)].map((_, setIndex) => (
                            <div key={`${exercise.id}-${setIndex}`} className={`series`}>
                                <div id="set-header">
                                    <p>Série {setIndex + 1}</p>
                                    <i className="bi bi-info-circle" onClick={() => handleInfo(index, setIndex)}></i>
                                </div>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Peso"
                                        onChange={(e) => handleSeriesDataChange(index, setIndex, 'carga', e.target.value)}
                                        value={seriesData[index]?.[setIndex]?.carga ?? ''}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Repetições"
                                        onChange={(e) => handleSeriesDataChange(index, setIndex, 'reps', e.target.value)}
                                        value={seriesData[index]?.[setIndex]?.reps ?? ''}
                                    />
                                    <input
                                        type="text"
                                        placeholder="RIR"
                                        onChange={(e) => handleSeriesDataChange(index, setIndex, 'rir', e.target.value)}
                                        value={seriesData[index]?.[setIndex]?.rir ?? ''}
                                    />
                                    <button onClick={(e) => handleClear(e, index, setIndex)}>Limpar</button>
                                </form>
                            </div>
                        ))}
                        <p>Repetições: {exercise.reps}</p>
                    </div>
                ))}
                {exerciseList.length > 0 && <button id='end-btn' onClick={handleFinishWorkout}>Finalizar Treino</button>}
            </div>}

            {/* ADDING EXERCISES */}

            {adding && <div id="add-exercise">
                {!base && !pers && <div id="ask">
                    <p>Você deseja selecionar o exercício da base de dados, ou adicionar um personalizado?</p>
                    <div id="option-btn">
                        <button onClick={() => setBase(true)}>Selecionar da base</button>
                        <button onClick={() => setPers(true)}>Personalizado</button>
                    </div>
                </div>}

                {base && <GymApi />}
                {base && isButtonPressed && (() => {
                    const neww = new Exercise(
                        exerciseSelectedNew.name,
                        exerciseSelectedNew.sets,
                        exerciseSelectedNew.reps,
                        exerciseSelectedNew.workoutData,
                        exerciseSelectedNew.gifUrl
                    );
                    setExerciseSelectedNew({ name: "", sets: "", reps: "", gifUrl: "" });
                    handleBtn(neww);
                    return null;  // Ou algo como <></> caso queira retornar algo.
                })()}


                {pers && <div id="add-workout">
                    <form id='form-input'>
                        <input type="text" placeholder="Nome do Exercício" onChange={(e) => setExercise(new Exercise(e.target.value, exercise.sets, exercise.reps, exercise.workoutData, exercise.gifUrl))} />
                        <input type="text" placeholder="Séries" onChange={(e) => setExercise(new Exercise(exercise.name, parseInt(e.target.value) || 0, exercise.reps, exercise.workoutData, exercise.gifUrl)) || 0} />
                        <input type="text" placeholder="Repetições" onChange={(e) => setExercise(new Exercise(exercise.name, exercise.sets, parseInt(e.target.value) || 0, exercise.workoutData, exercise.gifUrl))} />
                        <label className='custom-file-upload'>Deseja adicionar uma imagem ou um gif a este exercício?
                            <input type="file" accept="image/*,image/gif" onChange={handleFileChange} />
                        </label>
                        {exercise.gifUrl && (
                            <div>
                                <p>Pré-visualização:</p>
                                <img src={exercise.gifUrl} alt="Imagem do exercício" width="200" />
                            </div>
                        )}
                        <button onClick={() => handleBtn(new Exercise(exercise.name, exercise.sets, exercise.reps, exercise.workoutData, exercise.gifUrl))}>Adicionar Exercício</button>

                        {exerciseList.length ? exerciseList.map((exercise) => (
                            <div className="exercise">
                                <p>Exercício: {exercise.name}</p>
                                <p>Séries: {exercise.sets}</p>
                                <p>Repetições: {exercise.reps}</p>
                            </div>
                        )) : <p>Nenhum exercício adicionado</p>}
                        <button onClick={() => setPers(false)}>Voltar</button>
                    </form>

                </div>}
            </div>}

        </div>
    )
}

export default Workout