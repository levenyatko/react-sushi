import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error( resData.message || 'Something went wrong!');
    }

    return resData;
}

export default function useHttp(url, config, initialData = null) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                let resConfig = {...config};
                if (data && resConfig.method === 'POST') {
                    resConfig.data = data;
                }
                const resData = await sendHttpRequest(url, resConfig);
                setData(resData);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);
        },
        [url, config]);

    useEffect(() => {
        if (!config || config && (!config.method || config.method === 'GET')) {
            sendRequest('');
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    };
}