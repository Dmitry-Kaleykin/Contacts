import React, { useContext, useState } from 'react';


const UserContext = React.createContext();

export function UserContextComponent ({children}) {

    const [state, setState] = useState({
        loading: false,
        usersData: null,
        usersDataCopy: null,
    });

    function toggleLoading (loading) {
        setState(prevState => ({
            ...prevState,
            loading: loading,
        }));
    }

    function rewriteUsers (usersData) {
        setState(prevState => ({
            ...prevState,
            usersData: usersData.results,
            usersDataCopy: usersData.results,
        }));
    }

    function rewriteUsersCopy (usersData) {
        setState(prevState => ({
            ...prevState,
            usersDataCopy: usersData,
        }));
    }

    return (
        <UserContext.Provider value={{state, rewriteUsers, toggleLoading, rewriteUsersCopy}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUsers = () => useContext(UserContext);