import React from 'react'
import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useExerciseContext } from '../hooks/useExerciseContext'

import Exercise from '../models/Exercise'

import './GymApi.css'


const GymApi = () => {
    const {exerciseSelectedNew, setExerciseSelectedNew, isButtonPressed, setIsButtonPressed} = useExerciseContext();
    const [exerciseSelected, setExerciseSelected] = useState(null);
    const [canNext, setCanNext] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
      const [isSelected, setIsSelected] = useState(false);
      const [targetMuscle, setTargetMuscle] = useState('')
      const [page, setPage] = useState(0); // 🔹 Estado para controlar a página atual
      const resultsPerPage = 10; // 🔹 Número de exercícios por página

      const targetMusclesUrl = 'https://exercisedb.p.rapidapi.com/exercises/targetList'
      const muscleSearchUrl = `https://exercisedb.p.rapidapi.com/exercises/target/${targetMuscle}?offset=${page * resultsPerPage}&limit=${resultsPerPage}`

      const { data: targetMuscles, httpConfig: targetMusclesConfig, loading: targetMusclesLoading } = useFetch(targetMusclesUrl);
      const { data: muscleSearch, httpConfig: muscleSearchConfig, loading: muscleSearchLoading } = useFetch(muscleSearchUrl);

      useEffect(() => {
        if (targetMuscle) {
          muscleSearchConfig(null, 'GET');
        }
      }, [targetMuscle, page]);

      useEffect(() => {
        targetMusclesConfig(null, 'GET');
      }, []);


     const handleClick = (selectedMuscle) => {
        setIsSelected(true);
        setTargetMuscle(selectedMuscle);
       
        setPage(0);

      }

        const toggleSelected = (index) => {
            setExerciseSelected((previous) => {
                if (previous === index) { 
                   // setExerciseSelectedNew(null);
                    return null;
                }
               // setExerciseSelectedNew(new Exercise(muscleSearch[index].name, 3, "10 - 12"));
                //console.log(exerciseSelectedNew);
                return index;
            });
            
           
        }

        const triggerWarning = () => {
          setShowMessage(true);
          
          // Após 3 segundos, esconder a mensagem
          setTimeout(() => {
            setShowMessage(false);
          }, 3000); // 3000ms = 3 segundos
        };

        const handleAdd = (e) => {
          e.preventDefault();
          if(exerciseSelected === null || exerciseSelected === ""){
            triggerWarning();
            return;
          }
          // console.log(muscleSearch[exerciseSelected]);
          //console.log(exerciseSelectedNew);
          setCanNext(true);
        }

        const handleAddExercise = (e) => {
          e.preventDefault();
          setExerciseSelectedNew({...exerciseSelectedNew, name: muscleSearch[exerciseSelected].name, gifUrl: muscleSearch[exerciseSelected].gifUrl});
          setCanNext(false);
          setExerciseSelected(null);
          setIsSelected(false);
          setTargetMuscle('');
          setIsButtonPressed(true);
        }

    

  return (
    <div>
        {!isSelected && <div id="header">
            <h2>Select a muscle</h2>
        </div>}
        {!isSelected && <div id="options">    
        {targetMuscles.map((item, index) => (
            <button key={index} onClick={() => handleClick(item)}>{item}</button>
          ))}
        </div>}
          
        {isSelected && !canNext && <div id="search">
            <div id="search-header">
              <h2>Selecione o exercicio escolhido</h2>
              <button onClick={handleAdd}>Adicionar Exercício</button>
              {showMessage && <p>Você não selecionou um exercicio!</p>}
            </div>
        <div id="muscles-exercises">
            {muscleSearch.map((item, index) => (
                <div key={index} id='eachExercise' onClick={() => toggleSelected(index)} className={exerciseSelected === index ? 'exercise_selected' : ''}>
                <h3>{item.name}</h3>
                <img src={item.gifUrl} alt="gifExercise" />
                </div>
            ))}

        </div>
        <div id="page">
        <button 
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))} 
            disabled={page === 0}
          >
            Página Anterior
          </button>
          <button 
            onClick={() => setPage((prev) => prev + 1)} 
            disabled={muscleSearch?.length < resultsPerPage}
          >
            Próxima Página
          </button>
        </div>
        </div>}

        {canNext && <div id="edit-exercise">
          <h2>Você selecionou o seguinte exercício:</h2>
          <div id="showing-exercise">
            <img src={muscleSearch[exerciseSelected].gifUrl} alt="exercise" />
            <h3>{muscleSearch[exerciseSelected].name}</h3>
            <form id='form-input'>
                 <label>Séries</label>
                 <input type="text" placeholder="Séries"  onChange={(e) => setExerciseSelectedNew({...exerciseSelectedNew, sets:parseInt(e.target.value) || 0})}/>
                 <label>Repetições</label>
                 <input type="text" placeholder="Repetições" onChange={(e) => setExerciseSelectedNew({...exerciseSelectedNew, reps:e.target.value})}/>
                  <button onClick={handleAddExercise}>Adicionar Exercício</button> 
               
                
                <button type='button' onClick={() => setAdding(false)}>Voltar</button>
            </form>
          </div>
        </div>}
    </div>
  )
}

export default GymApi