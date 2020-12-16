import { 
    Button, 
    Divider, 
    FormControl, 
    IconButton, 
    InputBase, 
    InputLabel, 
    MenuItem, 
    Paper, 
    Select } from '@material-ui/core';
import { Clear, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../../business/context';
import useRequest from '../../business/hooks';
import style from './Filter.module.css';

function Filter () {

    const nationalities = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US'];
    const {request} = useRequest();
    const {state, rewriteUsersCopy} = useUsers();

    const [searchValue, setSearchValue] = useState('');
    const [nation, setNation] = useState('');
    const [gender, setGender] = useState('');

    function search () {
        const searchTerm = searchValue.trim().toLowerCase().split(' ').join('.');

        if (nation && !gender) {
            const searchedUsers = state.usersData.filter( user => {
                if (user.email.includes(searchTerm) && user.nat === nation.toUpperCase()) return user
            });
            rewriteUsersCopy(searchedUsers);
        } else if (!nation && gender) {
            const searchedUsers = state.usersData.filter( user => {
                if (user.email.includes(searchTerm) && user.gender === gender) return user
            });
            rewriteUsersCopy(searchedUsers);
        } else if (nation && gender) {
            const searchedUsers = state.usersData.filter( user => {
                if (user.email.includes(searchTerm) && user.gender === gender && user.nat === nation.toUpperCase()) return user
            });
            rewriteUsersCopy(searchedUsers);
        } else {
            const searchedUsers = state.usersData.filter( user => user.email.includes(searchTerm));
            rewriteUsersCopy(searchedUsers);
        }        
    }

    function clearInputs () {
        setSearchValue('');
        setNation('');
        setGender('');
    }

    useEffect(() => {
        request();
        rewriteUsersCopy(state.usersData);
        console.log('useEffect');
    }, []);

    return (
        <Paper className={style.filterWrapper}>
            <Paper 
                elevation={0} 
                variant='outlined' 
                className={style.searchContainer}>
                <InputBase 
                    value={searchValue}
                    onChange={e => {
                        setSearchValue(e.target.value);
                    }} 
                    fullWidth 
                    className={style.searchInput}
                    placeholder='Name' />
                <Divider orientation='vertical' />
                <IconButton 
                    onClick={search} 
                    className={style.searchIcon} 
                    size='small'>
                    <Search />
                </IconButton>
            </Paper>
            <FormControl 
                size='small' 
                className={style.selectContainer} 
                variant='outlined' 
                component='div'>
                <InputLabel id='genderLabel'>Gender</InputLabel>
                <Select 
                    value={gender}
                    onChange={e => {
                        setGender(e.target.value); 
                    }}
                    label='Gender'
                    labelId='genderLabel'
                    id='Gender'>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                </Select>
            </FormControl>
            <FormControl 
                size='small' 
                className={style.selectContainer} 
                variant='outlined' 
                component='div'>
                <InputLabel id='nationLabel' >Nationality</InputLabel>
                <Select 
                    value={nation} 
                    onChange={e => {
                        setNation(e.target.value);
                    }} 
                    label='Nationality' 
                    labelId='nationLabel' 
                    id='Nationality'>
                    { nationalities.map( (nation, index) => 
                        <MenuItem key={index} value={nation.toLowerCase()}>
                            {nation}
                        </MenuItem> ) }
                </Select>
            </FormControl>
            <div className={style.clearButtonContainer}>
                <Button 
                    onClick={clearInputs}
                    startIcon={<Clear />}>Clear</Button>
            </div>
        </Paper>
    )
}

export default Filter;