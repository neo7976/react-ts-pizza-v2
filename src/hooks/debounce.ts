import {useEffect, useState} from "react";

/*
* Данный хук служит, чтобы не отправлять слишком частые запросы на сервер не получить БАН
* */

export function useDebounce(value: string, delay = 300): string {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay]);
    return debounced;
}