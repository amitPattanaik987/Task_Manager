import React from 'react'
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Sign_up() {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${email} and ${password}`);
        axios.post("https://task-manager-2bcq.onrender.com/", { email, password }).then((responsedata) => {
            if (responsedata.data.success) {
                localStorage.setItem('auth-token', responsedata.data.token);
                localStorage.setItem('email', responsedata.data.email);
                navigate("/Lists")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleLogin = (e) => {
        navigate("/login");
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='container w-[320px] h-[320px] bg-slate-50 py-[20px] flex flex-col text-center p-[20px] gap-[20px] '>
                <h1 className='bg-slate-50 text-sky-400 font-medium text-4xl'>SIGN UP</h1>
                <form className='flex flex-col gap-[20px] bg-white'>
                    <input type="text" placeholder='📧 Email' className='bg-slate-50 h-[35px] p-[5px]' onChange={(e) => setemail(e.target.value)} />
                    <input type="text" placeholder='🔒 Password' className='bg-slate-50 h-[35px] p-[5px]' onChange={(e) => setpassword(e.target.value)} />
                    <button className='bg-slate-50 btn btn-info w-[100px]' onClick={handleSubmit}>Sign up</button>
                </form>
                <p className='bg-slate-50'>Already got an Account? <span><a href="" className='bg-slate-50 underline text-blue-500' onClick={handleLogin}>Login</a></span> now!</p>
            </div>
        </div>
    )
}

export default Sign_up
