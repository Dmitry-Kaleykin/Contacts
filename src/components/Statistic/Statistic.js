import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../../business/context';
import style from './Statistic.module.css';

function Statistic () {

    const {state} = useUsers();

    const [stats, setStats] = useState({});

    const result = {
        males: 0,
        females: 0,
        nationalities: {},
    }

    function fillStats () {
        state.usersDataCopy?.map( user => {

            if (!result.nationalities[user.nat]) {
                result.nationalities[user.nat] = 1;
            } else {
                result.nationalities[user.nat]++;
            }
            if (user.gender === 'female') {
                result.females++;
            } else {
                result.males++
            }
            
        });
        setStats(result);
    }

    useEffect(() => fillStats(), [state.usersDataCopy]);

    return (
        <Paper className={style.statisticWrapper}>
            <h3>Statistic</h3>
            <Grid container spacing={1}>
                <Grid className={style.gridHeader} container item>
                    <Grid item xs={2}>Collection size</Grid>
                    <Grid item xs={2}>Males</Grid>
                    <Grid item xs={2}>Females</Grid>
                    <Grid item xs={6} />
                </Grid>
                <Grid className={style.gridBody} container item>
                    <Grid item xs={2}>{state.usersDataCopy?.length}</Grid>
                    <Grid item xs={2}>{stats.males}</Grid>
                    <Grid item xs={2}>{stats.females}</Grid>
                    <Grid item xs={6} />
                </Grid>
                <Grid container item>
                    <Grid item xs={2} />
                    {
                        (stats.males > stats.females)
                        ? <Grid className={style.gridDesc} item xs={2}>Men predominate</Grid>
                        : <Grid className={style.gridDesc} item xs={2}>Women predominate</Grid>
                    }
                    <Grid item xs={2} />
                    <Grid item xs={6} />
                </Grid>
            </Grid>
            <p className={style.natHeader}>Nationalities</p>
            <div className={style.natContainer}>
                {
                    stats.nationalities && Object.keys(stats.nationalities).map( (key, index) => {
                        return (
                            <div key={index} className={style.natItem}>
                                <span>{key}: </span>
                                <span className={style.natCount}>{stats.nationalities[key]}</span>
                            </div>
                        )
                    })
                }
                    
            </div>
        </Paper>
    )
}

export default Statistic;