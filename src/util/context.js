import React, { useEffect, useReducer, useContext } from 'react'
import { reducer } from './reducer'
const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?';

//the state object that holds the values for the context

//this will be used by the reducer
const initialState = {
    hits: [], 
    page: 0,
    loading: true,
    query: 'react',
    nbpages: 0,

}

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const fetchHits = async (url) => {
        dispatch({type: "SET_LOADING"})
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: 'SET_HITS', payload: data})
        }catch(error){
            console.error(error);
        }
    }

    const handleSearch = (query) => {
        dispatch({type: "HANDLE_SEARCH", payload: query})
    }
    const removeStory = (id) => {
        dispatch({type: "REMOVE_STORY", payload: id });
    }

    const handlePage = (value) => {
        dispatch({ type: "HANDLE_PAGE", payload: value})
    }

    useEffect(() => {
        fetchHits(`${API_ENDPOINT}query=${state.query}&page=${state.page}&`)
        
    }, [state.query, state.page])
    return (
    <AppContext.Provider value = {{...state, handleSearch, removeStory, handlePage}}>
        {children}
    </AppContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(AppContext)
}