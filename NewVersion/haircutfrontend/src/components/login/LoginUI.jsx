import React, { useEffect, useState } from 'react'
import style from './Login.module.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMain } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RegisterForm() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { setIsLogged } = useMain();

    const handleOnclickShowPassword = (event) => {
        setIsShowPassword(!isShowPassword)
    }

    const handleOnclickShowConfirmPassword = (event) => {
        setIsShowConfirmPassword(!isShowConfirmPassword)
    }

    const userLoginHandler = (event) => {

        if (!username || !password || !confrimPassword) {
            $(".errorOutput").html("Please fill in all the information");
            return;
        }

        if (password.localeCompare(confrimPassword) != 0) {
            $(".errorOutput").html("Confirm password does not match password");
            return;
        }

        $.ajax({
            url: "http://localhost:3120/identity/customers",
            type: 'POST',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            data: JSON.stringify({
                username: username,
                password: password,
                email: email,
                nameCustomer: name
            }),
            async: false
            ,
            success: function (data) {
                console.log(data);
                if (data.code == 101) {
                    navigate("/");
                }
            },
            error: function(data) {
                $(".errorOutput").html(data.responseJSON.message);
            }
        })
    }

    return (
        <>
            <div className='headingPane'>
                <div className='siteName'>
                    REGISTER
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Register</li>
                    </ol>
                </div>
            </div>
            <div className={style.LoginContainer}>
                <div className={style.formInputs}>
                    <div className={style.inputGroup}>
                        <label for='username'>Username</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} id='username' className={style.usernameInput}></input>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='email'>Email</label>
                        <input value={email} id='email' onChange={(event) => setEmail(event.target.value)} className={style.usernameInput}></input>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='name'>Name</label>
                        <input value={name} id='name' onChange={(event) => setName(event.target.value)} className={style.usernameInput}></input>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='password'>Password</label>
                        <input type={(isShowPassword) ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} id='password' className={style.usernameInput}></input>
                        <span className={style.showPasswordIcon} onClick={(event) => handleOnclickShowPassword()}>
                            <FontAwesomeIcon icon={(isShowPassword) ? faEye : faEyeSlash}></FontAwesomeIcon>
                        </span>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='confirmPassword'>Confirm Password</label>
                        <input type={(isShowConfirmPassword) ? 'text' : 'password'} value={confrimPassword} onChange={(event) => setConfrimPassword(event.target.value)} id='confirmPassword' className={style.usernameInput}></input>
                        <span className={style.showPasswordIcon} onClick={(event) => handleOnclickShowConfirmPassword()}>
                            <FontAwesomeIcon icon={(isShowConfirmPassword) ? faEye : faEyeSlash}></FontAwesomeIcon>
                        </span>
                    </div>
                    <button onClick={(event) => userLoginHandler()} className={style.loginButton}>REGISTER</button>
                    <p className={`${style.errorOutput} errorOutput`}></p>
                </div>
            </div>

        </>
    )
}

export default function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    const { setIsLogged } = useMain()

    const handleOnclickShowPassword = (event) => {
        setIsShowPassword(!isShowPassword)
    }

    const userLoginHandler = (event) => {
        if (!username || !password) return;
        $.ajax({
            url: "http://localhost:3120/identity/auth/login",
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
                    navigate('/')
                } else {
                    $(".errorOutput").html("Wrong password!!!");
                }
            },
            error: function(data) {
                $(".errorOutput").html(data.responseJSON.message);
            }
        })
    }

    useEffect(() => {
        $("#username").on('change', function () {
            setUsername($(this).val())
        })

        $("#password").on('change', function () {
            setPassword($(this).val())
        })

        // $(".createAccount").on('click', function () {
        //     navigate("/register");
        // })
    }, [])

    return (
        <>
            <div className='headingPane'>
                <div className='siteName'>
                    LOGIN
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Login</li>
                    </ol>
                </div>
            </div>
            <div className={style.LoginContainer}>
                <div className={style.formInputs}>
                    <div className={style.inputGroup}>
                        <label for='username'>Username or Email</label>
                        <input id='username' className={style.usernameInput}></input>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='password'>Password</label>
                        <input type={(isShowPassword) ? 'text' : 'password'} id='password' className={style.usernameInput}></input>
                        <span className={style.showPasswordIcon} onClick={(event) => handleOnclickShowPassword()}>
                            {/* <FontAwesomeIcon icon={(isShowPassword) ? faEye : faEyeSlash}></FontAwesomeIcon>
                             */}
                             {(isShowPassword) ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                        </span>
                    </div>
                    <button onClick={(event) => userLoginHandler()} className={style.loginButton}>LOGIN</button>
                    <div className={style.textHold}>
                        <h6 className={style.forgotPassword}><span className='forgotPass'><Link style={{
                            textDecoration: "none",
                            color: "black"
                        }} to={"/changepassword"}>Forgot passwords?</Link></span></h6>
                        <h6>Dont have one? <span className='createAccount'><Link style={{
                            textDecoration: "none",
                            color: "black"
                        }} to={"/register"}>Create new one</Link></span></h6>
                    </div>
                    <p className={`${style.errorOutput} errorOutput`}></p>
                </div>
            </div>

        </>
    )
}

function ChangePasswordForm() {

    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowNewPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleOnclickShowPassword = (event) => {
        setIsShowOldPassword(!isShowOldPassword)
    }

    const handleOnclickShowConfirmPassword = (event) => {
        setIsShowConfirmPassword(!isShowNewPassword)
    }

    const userChangePasswordHandler = (event) => {

        if (!username || !oldPassword || !newPassword) {
            $(".errorOutput").html("Please fill in all the information");
            return;
        }

        $.ajax({
            url: "http://localhost:3120/identity/auth/changepassword",
            type: 'POST',
            dataType: 'json',
            CORS: false,
            contentType: 'application/json',
            secure: true,
            data: JSON.stringify({
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            }),
            async: false
            ,
            success: function (data) {
                console.log(data);
                if (data.code == 101) {
                    navigate("/");
                }
            },
            error: function(data) {
                $(".errorOutput").html(data.responseJSON.message);
            }
        })
    }

    return (
        <>
            <div className='headingPane'>
                <div className='siteName'>
                    CHANGE PASSWORD
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Change password</li>
                    </ol>
                </div>
            </div>
            <div className={style.LoginContainer}>
                <div className={style.formInputs}>
                    <div className={style.inputGroup}>
                        <label for='username'>Username</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} id='username' className={style.usernameInput}></input>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='oldPassword'>Old Password</label>
                        <input type={(isShowOldPassword) ? 'text' : 'password'} value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} id='oldPassword' className={style.usernameInput}></input>
                        <span className={style.showPasswordIcon} onClick={(event) => handleOnclickShowPassword()}>
                            <FontAwesomeIcon icon={(isShowOldPassword) ? faEye : faEyeSlash}></FontAwesomeIcon>
                        </span>
                    </div>
                    <div className={style.inputGroup}>
                        <label for='newPassword'>New Password</label>
                        <input type={(isShowNewPassword) ? 'text' : 'password'} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} id='newPassword' className={style.usernameInput}></input>
                        <span className={style.showPasswordIcon} onClick={(event) => handleOnclickShowConfirmPassword()}>
                            <FontAwesomeIcon icon={(isShowNewPassword) ? faEye : faEyeSlash}></FontAwesomeIcon>
                        </span>
                    </div>
                    <button onClick={(event) => userChangePasswordHandler()} className={style.loginButton}>CHANGE PASSOWRD</button>
                    <p className={`${style.errorOutput} errorOutput`}></p>
                </div>
            </div>

        </>
    )
}

export { RegisterForm, ChangePasswordForm };
