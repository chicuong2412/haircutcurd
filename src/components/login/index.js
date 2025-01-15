import React, { useState } from 'react'
import style from "../../styles/LoginReFoStyle.module.scss"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { useMain } from '../App';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import $ from "jquery"

export default function index() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasWrong, setHasWrong] = useState(false);

    const navigate = useNavigate();

    const toast = useRef(null);

    const { setIsLogged } = useMain();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const login = () => {
        if (password !== "" && username !== "") {
            setHasWrong(false);
            $.ajax({
                url: "http://localhost:3120/identity/auth/workers/login",
                type: 'POST',
                dataType: 'json',
                CORS: false,
                contentType: 'application/json',
                secure: true,
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                async: false
                ,
                success: function (data) {
                    if (data.code == 1000 && data.result.authenticated) {
                        setIsLogged(true)
                        localStorage.setItem("username", username);
                        localStorage.setItem("JWT", data.result.token);
                        localStorage.setItem("ID", data.result.id);
                        localStorage.setItem("ROLE", data.result.role);
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Login Successfully!!!', life: 3000 });
                        navigate('/');
                    } else {
                        toast.current.show({ severity: 'warn', summary: 'Failed', detail: 'Login Failed!!!', life: 3000 });
                        setHasWrong(true);
                    }
                },
                error: function (data) {
                    $(".errorOutput").html(data.responseJSON.message);
                }
            })        } else {
            setHasWrong(true);
            toast.current.show({ severity: 'warn', summary: 'Missing', detail: 'Please fill in required information!!!', life: 3000 });
        }
    }

    return (
        <>
            <Toast ref={toast}></Toast>
            <div className={style.container}>
                <div className={style.holder}>
                    <div className={style.colFull}>
                        <h1>Login</h1>
                        <h6>Login to have access!!!</h6>
                    </div>
                    <div className={style.colFull}>
                        <TextField
                            id="outlined-required"
                            label="Username"
                            error={(hasWrong || (username === "" && hasWrong)) ? true : false}
                            fullWidth
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className={style.colFull}>
                        <FormControl sx={{}} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                fullWidth
                                error={(hasWrong || (password === "" && hasWrong)) ? true : false}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                    <Button onClick={login} variant="contained">Login</Button>
                </div>
            </div>
        </>
    )
}
