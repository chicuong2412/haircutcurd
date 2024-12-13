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

function createData(idAppointment, idCustomer, idWorker, idLocation, statusAppointment, dateTime, idService, idCombo, price) {
  return {
    idAppointment,
    idCustomer,
    idWorker,
    idLocation,
    statusAppointment,
    dateTime,
    idService,
    idCombo,
    price,
  };
}

const data = [{
  "id": "11621695-8025-46c4-b192-064549fadad9",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "1596822c-f517-4268-9684-a87923892457",
  "status": "WAITING",
  "idLocation": "682cba49-0b42-4b90-91e1-e0e042256665",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 100.0
},
{
  "id": "2de31303-6078-4df5-97c8-a0160ac692c6",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "12439430-acb5-43b6-a63f-75ba014dfce1",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "7735674c-6cdd-461a-b978-ec08592106a1",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "1596822c-f517-4268-9684-a87923892457",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "975193ff-3832-46ee-ad41-80e37896084a",
  "idCustomer": "474628c5-69fb-4ce5-b64a-4612975157cc",
  "idWorker": "12439430-acb5-43b6-a63f-75ba014dfce1",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "9bedcf44-f4e3-4556-9e33-4cfe15e4075d",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "6bd8485b-8734-4301-a167-63f71860b74b",
  "status": "WAITING",
  "idLocation": "f2f1ace6-362b-4ef1-8341-0b69f04629c2",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "11621695-8025-46c4-b192-064549fadad9",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "1596822c-f517-4268-9684-a87923892457",
  "status": "WAITING",
  "idLocation": "682cba49-0b42-4b90-91e1-e0e042256665",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 100.0
},
{
  "id": "2de31303-6078-4df5-97c8-a0160ac692c6",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "12439430-acb5-43b6-a63f-75ba014dfce1",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "7735674c-6cdd-461a-b978-ec08592106a1",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "1596822c-f517-4268-9684-a87923892457",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "975193ff-3832-46ee-ad41-80e37896084a",
  "idCustomer": "474628c5-69fb-4ce5-b64a-4612975157cc",
  "idWorker": "12439430-acb5-43b6-a63f-75ba014dfce1",
  "status": "WAITING",
  "idLocation": "0faa608d-53a0-4092-8f0b-ab9101ed67e9",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
{
  "id": "9bedcf44-f4e3-4556-9e33-4cfe15e4075d",
  "idCustomer": "ccafbc57-553e-4868-aa30-b4ff8bc1c91b",
  "idWorker": "6bd8485b-8734-4301-a167-63f71860b74b",
  "status": "WAITING",
  "idLocation": "f2f1ace6-362b-4ef1-8341-0b69f04629c2",
  "dateTime": "2027-01-03T10:35:00",
  "idService": [
    {
      "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
      "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
      "duration": 50,
      "rate": 4.3,
      "price": 130.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        }
      ]
    },
    {
      "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
      "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
      "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
      "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
      "duration": 75,
      "rate": 4.9,
      "price": 180.0,
      "productsList": [
        {
          "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
          "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
          "stockQuantity": 95,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
          "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
          "price": 180.0,
          "rate": 4.0
        },
        {
          "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
          "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
          "stockQuantity": 150,
          "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
          "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
          "price": 250.0,
          "rate": 4.7
        }
      ]
    }
  ],
  "idCombo": [],
  "price": 1001.0
},
];

var rows = [

];

data.forEach((appointment) => {
  rows.push(createData(appointment.id,
    appointment.idCustomer,
    appointment.idWorker,
    appointment.idLocation,
    appointment.status,
    appointment.dateTime,
    appointment.idService,
    appointment.idCombo,
    appointment.price))
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
    id: 'idAppointment',
    numeric: false,
    disablePadding: true,
    label: 'Appointment ID',
  },
  {
    id: 'idCustomer',
    numeric: false,
    disablePadding: true,
    label: 'Customer ID',
  },
  {
    id: 'idWorker',
    numeric: false,
    disablePadding: false,
    label: 'Worker ID',
  },
  {
    id: 'idLocation',
    numeric: false,
    disablePadding: false,
    label: 'Location ID',
  },
  {
    id: 'statusAppointment',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'dateTime',
    numeric: false,
    disablePadding: false,
    label: 'DateTime',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  ,
  {
    id: 'services',
    numeric: false,
    disablePadding: true,
    label: 'Services/Combos',
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
            <div className={`${style.newButton} createForm`}>
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  var [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  React.useEffect(() => {
    $(".tableAppointment").on("click", ".view", function () {
      navigate(`view?id=${$(this).attr("dataID")}`);
    })

      $(`.createForm`).on('click', function() {
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
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              className='tableAppointment'
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
                  const id = row.idAppointment;
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
                        <TableCell align="left">{row.idCustomer}</TableCell>
                        <TableCell align="left">{row.idWorker}</TableCell>
                        <TableCell align="left">{row.idLocation}</TableCell>
                        <TableCell align="left">{row.statusAppointment}</TableCell>
                        <TableCell align="left">{row.dateTime}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="center">
                          {row.idService.length + row.idCombo.length}
                        </TableCell>
                        <TableCell>
                          <div className={style.buttonFunctions}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <FontAwesomeIcon icon={faEye} dataID={row.idAppointment} className='view' />
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