import axios from 'axios'
import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate=useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault();
        console.log(`${Email},${Password}`);
        axios.post("https://task-management-2-5ack.onrender.comlogin",{email:Email,password:Password}).then((result)=>{
            console.log(result);
            localStorage.setItem('auth-token',result.data.token);
            localStorage.setItem('email',result.data.email);
            navigate("/Lists")
        }).catch((err)=>{
            navigate("/Errorpage")
            return err;
        })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='container w-[320px] h-[320px] bg-slate-50 py-[20px] flex flex-col text-center p-[20px] gap-[40px] '>
                <h1 className='bg-slate-50 text-sky-400 font-medium text-4xl'>Login Now</h1>
                <form className='flex flex-col gap-[25px] bg-white'>
                    <input type="text" placeholder='📧 Email' className='bg-slate-50 h-[35px] p-[5px]' onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='🔒 Password' className='bg-slate-50 h-[35px] p-[5px]' onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-slate-50 btn btn-info w-[100px] ml-[10px]' onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}
