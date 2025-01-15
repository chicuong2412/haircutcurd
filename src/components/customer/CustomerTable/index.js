import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import style from "../../../styles/FormStyle.module.scss"
import { useNavigate } from 'react-router-dom';
import $ from "jquery"
import { useInfo } from '../../../layouts/layout';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Checkbox } from '@mui/material';



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: true,
        label: 'Username',
    },
    {
        id: 'nameCusomter',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'rank',
        numeric: false,
        disablePadding: true,
        label: 'Rank',
    },
    {
        id: 'loyaltyPoint',
        numeric: true,
        disablePadding: false,
        label: 'Loyalty Point',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'phoneNumber',
        numeric: true,
        disablePadding: false,
        label: 'Phone Number',
    },
    ,
    {
        id: 'startDate',
        numeric: false,
        disablePadding: true,
        label: 'Start-Date',
    },
    {
        id: 'doB',
        numeric: false,
        disablePadding: true,
        label: 'DoB',
    },
    {
        id: 'lastDayUsing',
        numeric: true,
        disablePadding: true,
        label: 'LastDayUsing',
    },
    {
        id: 'deleted',
        numeric: false,
        disablePadding: true,
        label: 'Deleted',
    },
    {
        id: 'function',
        numeric: false,
        disablePadding: true,
        label: 'Functions',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">

        </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'right'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {(headCell.id !== "function") ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>) : headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <div className={style.container}>
                        <div className={`${style.newButton} createFormCustomer`}>
                            <FontAwesomeIcon className={style.iconNew} icon={faPlus} />
                            <span className={style.newText}>New Employee</span>
                        </div>
                        <div class={`${style.searchMain}`}>
                            <input className={style.searchField} type="text" placeholder="" />
                            <i className={`${style.faMagnifyingGlass}`}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                        </div>
                    </div>

                </Typography>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function CustomerTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    var [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [dataNew, setDataNew] = React.useState([]);
    const navigate = useNavigate();
    const { toast } = useInfo();
    const [reset, setReset] = React.useState(1);

    React.useEffect(() => {
        $(".tableCustomers").on("click", ".viewCustomer", function () {
            navigate(`view?id=${$(this).attr("dataid")}`);
        })

        $(".tableCustomers").on("click", ".editCustomer", function () {
            navigate(`edit?id=${$(this).attr("dataid")}`);
        })

        $(".tableCustomers").on("click", ".deleteCustomer", function () {
            confirmDelete($(this).attr("dataid"));
        })

        $(`.createFormCustomer`).on('click', function () {
            navigate(`create`);
        });
    })

    React.useEffect(() => {
        $.ajax({
            url: `http://localhost:3120/identity/customers`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJncmVhdHNoYW5nLmNvbSIsInN1YiI6ImFkbWluIiwiaWQiOiJlZDcyMzFjZS0zYjg5LTQxOGUtYWM3Ny1iODNhNGRjNjFjY2IiLCJleHAiOjE3NzAzNjMxOTgsImlhdCI6MTczNDM2MzE5OCwic2NvcGUiOiJXT1JLRVIgQURNSU4ifQ.uITT19uUCsf1tGb3ZDF8oE3nKTeF3xpuZyBRhKvBMK7YhQjfPK06N1GGuvszdQ48JPN_cRXNgzpc4QCnk2qi4A`
            },
            data: { 'name': "" }
            ,
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataNew(data.result);
            },
        })
    }, [reset]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    function createData(id, username, nameCustomer, loyaltyPoint, email, address, phoneNumber, startDate, doB, lastDayUsing, deleted, typeCustomer ) {
        return {
            id,
            username,
            nameCustomer,
            loyaltyPoint,
            email,
            address,
            phoneNumber,
            startDate,
            doB,
            lastDayUsing,
            deleted,
            typeCustomer
        };
    }


    var rows = [

    ];

    dataNew.forEach((customer) => {
        rows.push(createData(
            customer.id,
            customer.username,
            customer.nameCustomer,
            customer.loyaltyPoint,
            customer.email,
            customer.address,
            customer.phoneNumber,
            customer.startDate,
            customer.doB,
            customer.lastDayUsing,
            customer.deleted,
            customer.typeCustomer))
    })

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({
                    url: `http://localhost:3120/identity/customers/${id}`,
                    type: 'DELETE',
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJncmVhdHNoYW5nLmNvbSIsInN1YiI6ImFkbWluIiwiaWQiOiJlZDcyMzFjZS0zYjg5LTQxOGUtYWM3Ny1iODNhNGRjNjFjY2IiLCJleHAiOjE3NzAzNjMxOTgsImlhdCI6MTczNDM2MzE5OCwic2NvcGUiOiJXT1JLRVIgQURNSU4ifQ.uITT19uUCsf1tGb3ZDF8oE3nKTeF3xpuZyBRhKvBMK7YhQjfPK06N1GGuvszdQ48JPN_cRXNgzpc4QCnk2qi4A`
                    },
                    CORS: false,
                    contentType: 'application/json',
                    secure: true,
                    async: false,
                    success: function (data) {
                        if (data.code === 104) {
                            setReset(prevState => prevState + 1);
                            toast.current.show({ severity: 'info', summary: '', detail: 'Deleted succesfully', life: 3000 });
                        } else {
                            toast.current.show({ severity: 'error', summary: '', detail: 'Delete failed', life: 3000 });
                        }
                    },
                    error: function (data) {
                        toast.current.show({ severity: 'error', summary: '', detail: `${data.responseJSON.message}`, life: 3000 });
                    }
                })
                //toast.current.show({ severity: 'info', summary: '', detail: 'Deleted succesfully', life: 3000 });

            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <>
            <ConfirmDialog></ConfirmDialog>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            className='tableCustomers'
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const id = row.id;
                                    const isItemSelected = selected.includes(id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="normal"
                                                >
                                                    {id}
                                                </TableCell>
                                                <TableCell align="right">{row.username}</TableCell>
                                                <TableCell align="right">{row.nameCustomer}</TableCell>
                                                <TableCell align="right">{row.typeCustomer}</TableCell>
                                                <TableCell align="right">{row.loyaltyPoint}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.address}</TableCell>
                                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                                <TableCell align="right">{row.startDate}</TableCell>
                                                <TableCell align="center">
                                                    {row.doB}
                                                </TableCell>
                                                <TableCell align="right">{row.lastDayUsing}</TableCell>
                                                <TableCell align="right"><Checkbox checked = {row.deleted}></Checkbox></TableCell>
                                                <TableCell>
                                                    <div className={style.buttonFunctions}>
                                                        <FontAwesomeIcon icon={faPenToSquare} dataid={row.id} className='editCustomer' />
                                                        <FontAwesomeIcon icon={faEye} dataid={row.id} className='viewCustomer' />
                                                        <FontAwesomeIcon icon={faX} dataid={row.id} className='deleteCustomer' />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            <div className={`${style.servicesRow}`}>
                                                <TableRow>


                                                </TableRow>


                                            </div>
                                        </>


                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[4, 8]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
}