// custom hook
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(null);
    const [loading, setLoading] = useState(false);

    const httpConfig = (data, method) => {
        if (method === "POST" || method === "PUT" || method === "PATCH") {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': 'fd90e8ae83msh60086f48f49bd7fp117d70jsn1175d712169c', // Sua chave da API
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // Host da API
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        } else if (method === "GET") {
            setConfig({
                method,
                headers: {
                    'x-rapidapi-key': 'fd90e8ae83msh60086f48f49bd7fp117d70jsn1175d712169c',
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                }
            });
            setMethod(method);
        }
    };

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await fetch(url, config);
            const data = await response.json();
            setLoading(false);
            setData(data);
        }
        if (url && method) {
            getData();
        }
    }, [url, callFetch, config, method]);

    useEffect(() => {
        const httpRequest = async () => {
            let json;
            if (method === "POST" || method === "PUT" || method === "PATCH") {
                let fetchOptions = [url, config];

                setLoading(true);
                const res = await fetch(...fetchOptions);
                json = await res.json();
                setLoading(false);
            }
            setCallFetch(json);
        };
        httpRequest();
    }, [config, method, url]);

    return { data, httpConfig, loading };
};
