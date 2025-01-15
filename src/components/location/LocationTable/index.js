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
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
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
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'imgSrc',
        numeric: false,
        disablePadding: true,
        label: 'imgSrc',
    },
    {
        id: 'address',
        numeric: true,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'phoneNumber',
        numeric: false,
        disablePadding: false,
        label: 'PhoneNumber',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'openHour',
        numeric: false,
        disablePadding: false,
        label: 'OpenHour',
    },
    {
        id: 'isDeleted',
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'center'}
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
                        <div className={`${style.newButton} createFormLocation`}>
                            <FontAwesomeIcon className={style.iconNew} icon={faPlus} />
                            <span className={style.newText}>New Location</span>
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

export default function LocationTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    var [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();
    const { toast } = useInfo();
    const [reset, setReset] = React.useState(1);
    const [dataNew, setDataNew] = React.useState([]);
    let heightBottom = $(".bottomBar").height() * 0.82;

    function createData(id, name, imgSrc, address, city, phoneNumber, email, openHour, deleted) {
        return {
            id,
            name,
            imgSrc,
            address,
            city,
            phoneNumber,
            email,
            openHour,
            deleted
        };
    }

    var rows = [

    ];

    React.useEffect(() => {
        $.ajax({
            url: "http://localhost:3120/identity/location/getLocations",
            type: 'GET',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data) {
                setDataNew(data.result);
            }
        });
    }, [reset])

    console.log(dataNew);
    

    dataNew.forEach((location) => {
        rows.push(createData(
            location.id,
            location.name,
            location.imgSrc,
            location.address,
            location.city,
            location.phoneNumber,
            location.email,
            location.openHour,
            location.deleted))
    })

    React.useEffect(() => {
        $(".tableLocations").on("click", ".viewLocation", function () {
            navigate(`view?id=${$(this).attr("dataid")}`);
        });

        $(".tableLocations").on("click", ".editLocation", function () {
            navigate(`edit?id=${$(this).attr("dataid")}`);
        });

        $(".tableLocations").on("click", ".deleteLocation", function () {
            let id = $(this).attr("dataid");
            confirmDelete(id);
        });

        $(`.createFormLocation`).on('click', function () {
            navigate(`create`);
        });
    }, []);

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

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({
                    url: `http://localhost:3120/identity/location/deleteLocation/${id}`,
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
                        console.log(data);
                        if (data.code === 104) {
                            setReset(prevState => prevState + 1);
                            toast.current.show({ severity: 'info', summary: '', detail: 'Deleted succesfully', life: 3000 });
                        } else {
                            toast.current.show({ severity: 'error', summary: '', detail: 'Delete failed', life: 3000 });
                        }
                    },
                    error: function (data) {
                        console.log(data);
                        toast.current.show({ severity: 'error', summary: '', detail: `${data.responseJSON.message}`, life: 3000 });
                    }
                })


            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    var visibleRows = React.useMemo(
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
                    <TableContainer sx={{ height: `${heightBottom}` }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            className='tableLocations'
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
                                    console.log(row);
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
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.imgSrc}</TableCell>
                                                <TableCell align="center">{row.address}</TableCell>
                                                <TableCell align="left">{row.city}</TableCell>
                                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.openHour}</TableCell>
                                                <TableCell align="right"><Checkbox checked = {row.deleted} /></TableCell>
                                                <TableCell>
                                                    <div className={style.buttonFunctions}>
                                                        <FontAwesomeIcon icon={faPenToSquare} dataid={row.id} className='editLocation' />
                                                        <FontAwesomeIcon icon={faEye} dataid={row.id} className='viewLocation' />
                                                        <FontAwesomeIcon icon={faX} dataid={row.id} className='deleteLocation' />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
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
                        rowsPerPageOptions={[5, 10]}
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