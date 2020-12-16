import { Typography } from '@material-ui/core';
import React from 'react';
import style from './Header.module.css';

function Header () {
    return (
        <header className={style.wrapper}>
            <Typography variant='h4'>Contacts</Typography>
        </header>
    )
}

{/* <div className={style.buttonWrapper}>
    <ButtonGroup variant='outlined'>
        <Button>
            <ViewModule />
        </Button>
        <Button>
            <FormatListBulleted />
        </Button>
    </ButtonGroup>
</div> */}

export default Header;