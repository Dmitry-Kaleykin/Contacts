import { Avatar, Chip, Grid, TableCell, TableRow } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React from 'react';
import style from './User.module.css';

function User ({avatar, name, birthday, email, phone, location, nationality}) {

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return (
        <TableRow>
            <TableCell>
                <Avatar alt='' src={avatar || '../../../assets/img/noimg.png'} />
            </TableCell>
            <TableCell>
                {name.first + ' ' + name.last}
            </TableCell>
            <TableCell>
                {new Date(birthday.date).toLocaleString('en-US', options)}
            </TableCell>
            <TableCell>
                <OneRowCell text={email} />
            </TableCell>
            <TableCell>
                <OneRowCell text={phone} />
            </TableCell>
            <TableCell>
                <ThreeRowsCell location={location} text='Adress' />
            </TableCell>
            <TableCell>
                <Chip color='primary' label={nationality} />
            </TableCell>
        </TableRow>
    )
}

function OneRowCell ({text}) {
    return (
        <Grid container direction='row' justify='flex-start'>
            <Grid item>
                <FileCopy className={style.icon} fontSize='small' color='primary' />
            </Grid>
            <Grid item>
                {text}
            </Grid>
        </Grid>
    )
}

function ThreeRowsCell ({location}) {
    return (
        <Grid wrap='nowrap' container>
            <Grid item>
                <FileCopy className={style.icon} fontSize='small' color='primary'/>
            </Grid>
            <Grid item>
                <div style={{fontWeight: 'bold'}}>{`/${location.country}/`}</div>
                <div>{`${location.street.number} ${location.street.name}, ${location.state}`}</div>
                <div>{`${location.city} ${location.postcode}`}</div>
            </Grid>
        </Grid>
    )
}

export default User;