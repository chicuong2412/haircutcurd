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

function createData(id, name, imgSrc, stockQuantity, description, price, rate) {
    return {
        id,
        name,
        imgSrc,
        stockQuantity,
        description,
        price,
        rate,
    };
}

const dataNew = [
    {
        "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
        "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
        "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
        "stockQuantity": 95,
        "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
        "price": 180.0,
        "rate": 4.0
    },
    {
        "id": "780bb032-f003-4fd4-90a3-97d1a88cea68",
        "name": "Kem Dưỡng Ẩm Ban Đêm Skin&Dr Night Care 50g",
        "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SNCDRM-vn-11134278-5t67o-pfkl8dz4m91wc.jpg",
        "stockQuantity": 85,
        "description": "Kem dưỡng ẩm ban đêm giúp tái tạo làn da, bổ sung độ ẩm và ngăn ngừa lão hóa, mang lại làn da khỏe mạnh khi thức dậy.",
        "price": 200.0,
        "rate": 4.5
    },
    {
        "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
        "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
        "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
        "stockQuantity": 150,
        "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
        "price": 250.0,
        "rate": 4.7
    },
    {
        "id": "e5c67ce3-5e1c-4cce-93a2-53c3c20f07e3",
        "name": "Tẩy Tế Bào Chết Trà Xanh Skin&Dr Green Tea 100ml",
        "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30STMPRD-vn-11134123-8u97y-wo3kxjbzt19if.jpg",
        "stockQuantity": 120,
        "description": "Giúp làm sạch sâu, loại bỏ tế bào chết trên da, mang lại làn da mịn màng, tươi sáng với chiết xuất từ trà xanh thiên nhiên.",
        "price": 150.0,
        "rate": 4.2
    },
    {
        "id": "fccde357-77ea-4e9f-b3ed-12b19063ef04",
        "name": "Xịt Khoáng Làm Dịu Da Skin&Dr Hydrating Mist 100ml",
        "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SMSTXY-vn-11134356-1r03z-pmq4lt7w9b8fy.jpg",
        "stockQuantity": 200,
        "description": "Xịt khoáng dưỡng ẩm làm dịu da tức thì, giúp cân bằng độ ẩm và bảo vệ da trước tác động của môi trường.",
        "price": 130.0,
        "rate": 4.3
    }
];

var rows = [

];

dataNew.forEach((product) => {
    rows.push(createData(
        product.id,
        product.name,
        product.imgSrc,
        product.stockQuantity,
        product.description,
        product.price,
        product.rate))
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
        id: 'stockQuantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'rate',
        numeric: true,
        disablePadding: false,
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
                        <div className={`${style.newButton} createFormProduct`}>
                            <FontAwesomeIcon className={style.iconNew} icon={faPlus} />
                            <span className={style.newText}>New Product</span>
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

export default function ProductTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    var [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();

    React.useEffect(() => {
        $(".tableProducts").on("click", ".view", function () {
            navigate(`view?id=${$(this).attr("dataID")}`);
        });

        $(".tableProducts").on("click", ".edit", function () {
            navigate(`edit?id=${$(this).attr("dataID")}`);
        });

        $(`.createFormProduct`).on('click', function () {
            navigate(`create`);
        });
    })

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
                            className='tableProducts'
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
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.imgSrc}</TableCell>
                                                <TableCell align="right">{row.stockQuantity}</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.rate}</TableCell>
                                                <TableCell>
                                                    <div className={style.buttonFunctions}>
                                                        <FontAwesomeIcon icon={faPenToSquare} dataID={row.id} className='edit' />
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