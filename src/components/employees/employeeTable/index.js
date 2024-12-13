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

function createData(id, username, nameWorker, specialities, salary, email, address, phoneNumber, location, doB, rate) {
    return {
        id,
        username,
        nameWorker,
        specialities,
        salary,
        email,
        address,
        phoneNumber,
        location,
        doB,
        rate,
    };
}

const dataNew = [
    {
        "id": "023ffe4a-054c-47ab-a17a-c17db9eb49df",
        "username": "tuan88888",
        "nameWorker": "Bui Quoc Tuan",
        "specialities": "Receptionist",
        "salary": 950.0,
        "email": "tuan.bui@gmail.com",
        "address": "District 8",
        "phoneNumber": "0934568888",
        "location": {
            "id": "f2f1ace6-362b-4ef1-8341-0b69f04629c2",
            "name": "Elegant Styles",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style1.jpg",
            "address": "District 1",
            "city": "Ho Chi Minh City",
            "phoneNumber": "0911122233",
            "email": "elegantstyles@gmail.com",
            "openHour": "09:00:00"
        },
        "doB": "1994-06-22",
        "rate": 0.0
    },
    {
        "id": "12439430-acb5-43b6-a63f-75ba014dfce1",
        "username": "an123456",
        "nameWorker": "Nguyen Van An",
        "specialities": "Cleaner",
        "salary": 1000.0,
        "email": "an.nguyen@gmail.com",
        "address": "District 1",
        "phoneNumber": "0912345678",
        "location": {
            "id": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
            "name": "Modern Cuts",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style2.jpg",
            "address": "Ha Dong",
            "city": "Hanoi",
            "phoneNumber": "0933445566",
            "email": "moderncuts@gmail.com",
            "openHour": "08:30:00"
        },
        "doB": "1990-01-15",
        "rate": 0.0
    },
    {
        "id": "1596822c-f517-4268-9684-a87923892457",
        "username": "hoa56789",
        "nameWorker": "Tran Thi Hoa",
        "specialities": "Receptionist",
        "salary": 900.0,
        "email": "hoa.tran@gmail.com",
        "address": "District 5",
        "phoneNumber": "0921122334",
        "location": {
            "id": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
            "name": "Modern Cuts",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style2.jpg",
            "address": "Ha Dong",
            "city": "Hanoi",
            "phoneNumber": "0933445566",
            "email": "moderncuts@gmail.com",
            "openHour": "08:30:00"
        },
        "doB": "1995-05-10",
        "rate": 0.0
    },
    {
        "id": "6bd8485b-8734-4301-a167-63f71860b74b",
        "username": "mai123456",
        "nameWorker": "Nguyen Thi Mai",
        "specialities": "Cleaner",
        "salary": 900.0,
        "email": "mai.nguyen@gmail.com",
        "address": "District 7",
        "phoneNumber": "0923344556",
        "location": {
            "id": "f2f1ace6-362b-4ef1-8341-0b69f04629c2",
            "name": "Elegant Styles",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style1.jpg",
            "address": "District 1",
            "city": "Ho Chi Minh City",
            "phoneNumber": "0911122233",
            "email": "elegantstyles@gmail.com",
            "openHour": "09:00:00"
        },
        "doB": "1992-12-18",
        "rate": 0.0
    },
    {
        "id": "739bfd19-13d4-4f0a-8b36-84eb2a7dfce0",
        "username": "tan123",
        "nameWorker": "Dang Phu Tan",
        "specialities": "Chua Co",
        "salary": 1200.0,
        "email": "tan123@gmail.com",
        "address": "Kp3",
        "phoneNumber": "0925852298",
        "location": {
            "id": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
            "name": "Modern Cuts",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style2.jpg",
            "address": "Ha Dong",
            "city": "Hanoi",
            "phoneNumber": "0933445566",
            "email": "moderncuts@gmail.com",
            "openHour": "08:30:00"
        },
        "doB": "2003-12-24",
        "rate": 0.0
    },
    {
        "id": "9e6914a8-055e-41a7-ad97-7cc0120edef2",
        "username": "kiet67890",
        "nameWorker": "Nguyen Tuan Kiet",
        "specialities": "Hair Stylist",
        "salary": 1200.0,
        "email": "kiet.nguyen@gmail.com",
        "address": "District 4",
        "phoneNumber": "0912349999",
        "location": {
            "id": "682cba49-0b42-4b90-91e1-e0e042256665",
            "name": "Sunny Hair Studio",
            "imgSrc": "https://storage.30shine.org/salon_image/front/default.jpg",
            "address": "Binh Duong",
            "city": "Binh Duong",
            "phoneNumber": "0925152298",
            "email": "cung0976@gmail.com",
            "openHour": "10:30:00"
        },
        "doB": "1997-09-25",
        "rate": 0.0
    },
    {
        "id": "a905768f-2eed-4381-a19d-f026b0376530",
        "username": "hoa12345",
        "nameWorker": "Pham Van Hoa",
        "specialities": "Assistant",
        "salary": 1100.0,
        "email": "hoa.pham@gmail.com",
        "address": "District 2",
        "phoneNumber": "0931122233",
        "location": {
            "id": "682cba49-0b42-4b90-91e1-e0e042256665",
            "name": "Sunny Hair Studio",
            "imgSrc": "https://storage.30shine.org/salon_image/front/default.jpg",
            "address": "Binh Duong",
            "city": "Binh Duong",
            "phoneNumber": "0925152298",
            "email": "cung0976@gmail.com",
            "openHour": "10:30:00"
        },
        "doB": "1998-02-20",
        "rate": 0.0
    },
    {
        "id": "af73fd13-e076-40f6-9d6f-be7defee0f4a",
        "username": "tuan12345",
        "nameWorker": "Vo Van Tuan",
        "specialities": "Manager",
        "salary": 1500.0,
        "email": "tuan.vo@gmail.com",
        "address": "District 6",
        "phoneNumber": "0931239876",
        "location": {
            "id": "f2f1ace6-362b-4ef1-8341-0b69f04629c2",
            "name": "Elegant Styles",
            "imgSrc": "https://storage.30shine.org/salon_image/front/style1.jpg",
            "address": "District 1",
            "city": "Ho Chi Minh City",
            "phoneNumber": "0911122233",
            "email": "elegantstyles@gmail.com",
            "openHour": "09:00:00"
        },
        "doB": "1990-03-12",
        "rate": 0.0
    },
    {
        "id": "e52685c3-46f8-4937-bcfc-a5be225a6ca3",
        "username": "khoa98765",
        "nameWorker": "Le Minh Khoa",
        "specialities": "Designer",
        "salary": 1250.0,
        "email": "khoa.le@gmail.com",
        "address": "District 3",
        "phoneNumber": "0913456789",
        "location": {
            "id": "682cba49-0b42-4b90-91e1-e0e042256665",
            "name": "Sunny Hair Studio",
            "imgSrc": "https://storage.30shine.org/salon_image/front/default.jpg",
            "address": "Binh Duong",
            "city": "Binh Duong",
            "phoneNumber": "0925152298",
            "email": "cung0976@gmail.com",
            "openHour": "10:30:00"
        },
        "doB": "1993-08-12",
        "rate": 0.0
    }
];

var rows = [

];

dataNew.forEach((worker) => {
    rows.push(createData(
        worker.id,
        worker.username,
        worker.nameWorker,
        worker.specialities,
        worker.salary,
        worker.email,
        worker.address,
        worker.phoneNumber,
        worker.location.id,
        worker.doB,
        worker.rate))
})

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
        id: 'nameWorker',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'specialities',
        numeric: false,
        disablePadding: false,
        label: 'Specialities',
    },
    {
        id: 'salary',
        numeric: true,
        disablePadding: false,
        label: 'Salary',
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
        id: 'location',
        numeric: false,
        disablePadding: true,
        label: 'Location',
    },
    {
        id: 'doB',
        numeric: false,
        disablePadding: true,
        label: 'DoB',
    },
    {
        id: 'rate',
        numeric: false,
        disablePadding: true,
        label: 'Rate',
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
                        <div className={`${style.newButton} createFormEmployee`}>
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

export default function EmployeeTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    var [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();

    React.useEffect(() => {
        $(".tableEmployees").on("click", ".view", function () {
            navigate(`view?id=${$(this).attr("dataID")}`);
        })

        $(".tableEmployees").on("click", ".editEmployee", function () {
            navigate(`edit?id=${$(this).attr("dataID")}`);
        })

        $(`.createFormEmployee`).on('click', function() {
            navigate(`create`);
          });
    })

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const showServices = (event, id) => {

    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            className='tableEmployees'
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
                                                <TableCell align="center">{row.username}</TableCell>
                                                <TableCell align="center">{row.nameWorker}</TableCell>
                                                <TableCell align="center">{row.specialities}</TableCell>
                                                <TableCell align="right">{row.salary}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.address}</TableCell>
                                                <TableCell align="left">{row.phoneNumber}</TableCell>
                                                <TableCell align="center">
                                                    {row.location}
                                                </TableCell>
                                                <TableCell align="left">{row.doB}</TableCell>
                                                <TableCell align="left">{row.rate}</TableCell>
                                                <TableCell>
                                                    <div className={style.buttonFunctions}>
                                                        <FontAwesomeIcon icon={faPenToSquare} dataID={row.id} className='editEmployee' />
                                                        <FontAwesomeIcon icon={faEye} dataID={row.id} className='view' />
                                                        <FontAwesomeIcon icon={faX} />
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