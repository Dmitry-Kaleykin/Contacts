import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { useUsers } from '../../business/context';
import User from './User/User';
import style from './UserList.module.css';

function UserList () {

    const { state } = useUsers();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function onChangeRowsPerPage (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function onChangePage (event, page) {
        setPage(page)
    }

    if (state.loading) {
        return (
            <div className={style.loadingWrapper}>
                <CircularProgress />
            </div>
        )
    }

    if (!state.loading) {
        return (
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead className={style.tableHead}>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Birthday</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Nationality</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { state.usersDataCopy?.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage ).map( (user, index) => 
                            <User
                                key={index}
                                avatar={user.picture.thumbnail}
                                name={user.name}
                                birthday={user.dob}
                                email={user.email}
                                phone={user.phone}
                                location={user.location}
                                nationality={user.nat} />
                        )}
                    </TableBody>
                </Table>
                <TablePagination 
                    rowsPerPageOptions={[5, 10]}
                    rowsPerPage={rowsPerPage}
                    count={state.usersDataCopy?.length || 1}
                    page={+page}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage} />
            </TableContainer>
        )
    }
}

export default UserList;