import React from 'react'
import { useTranslateContext } from '../hooks/useTranslateContext';
import { useFetch } from '../hooks/useFetch';
import { useState, useEffect } from 'react';

const TranslateMuscles = () => {
  

    const targetMusclesUrl = 'https://exercisedb.p.rapidapi.com/exercises/targetList'
    const { data: targetMuscles, httpConfig: targetMusclesConfig, loading: targetMusclesLoading } = useFetch(targetMusclesUrl);

    const {translatedText, setTranslatedText} = useTranslateContext();
                const [sourceLang, setSourceLang] = useState("en");
                const [targetLang, setTargetLang] = useState("pt");
                const [translatedMuscles, setTranslatedMuscles] = useState([]);
            
                const handleTranslate = async () => {
                    const apiUrl = "https://655.mtis.workers.dev/translate";
                    const params = new URLSearchParams({
                        text: text,
                        source_lang: sourceLang,
                        target_lang: targetLang,
                    });
            
                    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`${apiUrl}?${params}`)}`;
            
                    const response = await fetch(proxyUrl);
            
                    if(response.ok) {
                        const data = await response.json();
                        console.log(data);
                        const translated = JSON.parse(data.contents);
                        console.log(translated.response.translated_text);
                        // setTranslatedText(translated.response.translated_text);
                        return translated.response.translated_text;
                    }
                   
                }
    
                const translateText = async (textToTranslate) => {
                  const apiUrl = "https://655.mtis.workers.dev/translate";
                  const params = new URLSearchParams({
                      text: textToTranslate,
                      source_lang: sourceLang,
                      target_lang: targetLang,
                  });
          
                  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`${apiUrl}?${params}`)}`;
          
                  try {
                      const response = await fetch(proxyUrl);
          
                      if (response.ok) {
                          const data = await response.json();
                          const translated = JSON.parse(data.contents);
                          return translated.response.translated_text; // Retorna a tradução
                
                      } else {
                          console.error("Erro na requisição:", response.status);
                          return null;
                      }
                  } catch (error) {
                      console.error("Erro ao conectar à API:", error);
                      return null;
                  }
              };
    
                
    
                const translateAllMuscles = async() => {
                  if(!targetMuscles || targetMuscles.length === 0) return;
    
                  const translated = []
    
                  for(const muscle of targetMuscles) {
            
                    const translatedName = await translateText(muscle);
                    translated.push({originalName: muscle, translatedName});
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    
                    
                  }
                  setTranslatedText(translated);
                  localStorage.setItem('translatedMuscles', JSON.stringify(translated));
                }
    
                useEffect(() => {
    
                  const cached = localStorage.getItem('translatedMuscles');
    
                  if(cached) {
                    setTranslatedText(JSON.parse(cached))
                  }
    
                  else if (targetMuscles && targetMuscles.length > 0) {
                      translateAllMuscles();
                  }
              }, [targetMuscles]);
    
  return (
    <div></div>
  )
}

export default TranslateMuscles