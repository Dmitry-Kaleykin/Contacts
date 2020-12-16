import { useState } from "react";
import { useUsers } from "./context";

export default function useRequest () {

    const { rewriteUsers, toggleLoading } = useUsers();

    async function request () {

        toggleLoading(true);
        
        let url = 'https://randomuser.me/api/?results=200';
    
        const status = await fetch(url);
        const result = await status.json();
    
        rewriteUsers(result);
    
        toggleLoading(false);
    }

    return {request};
}