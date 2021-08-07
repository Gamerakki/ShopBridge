import { Button, TextField,  } from '@material-ui/core'
import  { useState } from 'react'
import '../css/Login.scss'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import logo from '../assets/logo.png' // with import
import { checkPassword, validEmail } from '../commonFunctions/commonFunctions';
import ApiCalls from '../axios/ApiCalls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../globalConstant/globalConstant';
const cookies = new Cookies();
function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmailError, setUserEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [disabledBtn,setDisabledBtn] = useState(false);
    const history = useHistory();
    // This function is called when user want to validate the user from the server
    const validatedUserFromServer = async () => {
        if(userEmailError || userPasswordError || userEmail.trim() == "" || userPassword.trim() == "" ){
            toast('Plese enter proper login details');
            return false
        }
        setDisabledBtn(true)
        let obj = {
            "email":userEmail,
            "password":userPassword,
        }
       let responseData:any = await ApiCalls(baseUrl+'login','post',obj);
       console.log(responseData,'this is api');
       if(responseData.status == 200){
        setDisabledBtn(false)
            cookies.set('userinfo',responseData.data.token);
            window.location.href = '/dashboard'
       }else{
        setDisabledBtn(false)
        toast.error('Something went wrong');
       }

    }
    return (
        <div className="loginMainContainer">
            <div className="loginCenterDiv">
                <div className="logoDiv">
                    <img src={logo} alt="" />
                </div>
                <div className="inputDiv">
                    <TextField
                        error={userEmailError ? true : false}
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        onChange={(e) => {
                            if (e.target.value.length > 3) {
                                setUserEmail(e.target.value)
                                console.log(validEmail(e.target.value))
                                if (validEmail(e.target.value)) {
                                    setUserEmailError(false)
                                } else {
                                    setUserEmailError(true)
                                }
                            }
                        }}
                    />
                </div>
                <div className="inputDiv">
                   
                    <div>
                        <TextField
                            id="outlined-basi2c"
                            error={userPasswordError ? true : false}
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => {
                                if (e.target.value.length > 3) {
                                    setUserPassword(e.target.value)
                                    console.log(validEmail(e.target.value))
                                    if (checkPassword(e.target.value)) {
                                        setUserPasswordError(false)
                                    } else {
                                        setUserPasswordError(true)
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="passwordPatternText">
                        Password  must be of  minimum 8 letter password, with at least a symbol,
                        upper and lower case letters and a number
                    </div>
                </div>
                <div className="inputDiv">
                    <Button
                        variant="contained"
                       disabled={disabledBtn}
                        className="loginBtn"
                        onClick={() => {
                            validatedUserFromServer()
                        }}
                        startIcon={<PowerSettingsNewIcon />}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
