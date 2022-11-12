import { useState } from "react";
import './Search.css';
import axios from 'axios';
import { useEffect } from "react";

const API_URL = 'http://localhost:8000/api';
const client = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

const createQueryString = (queryString) => {
    const query = queryString.split(" ").map((word) => {
        return `query=${word.trim()}`;
    }).join("&");
    return query;
}


export default function Search({ setResults }) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const trimmedSearch = search.trim();
        if (trimmedSearch.length > 2) {
            const query = createQueryString(search);
            client.get(`/search?${query}`)

                .then((response) => {
                    
                    setResults(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [search, setResults])
    return (
        <form onSubmit={e => {
            e.preventDefault();
            console.log(search);
        }}>
            <div className="search-wrapper">
                <div className="form-group">
                    <input 
                        type="text" 
                        name="search-input" 
                        id="search-input" 
                        className="form-control" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        
                        placeholder="Searching..."/>

                    <button type="submit" className="btn">🔍</button>
                </div>
            </div>
        </form>
    )
}