import React from 'react'
import { useNavigate } from 'react-router-dom';


function Errorpage() {

    const navigate=useNavigate();

    const ontryagain=()=>{
        navigate("/Login")
    }

  return (
    <div className='flex justify-center items-center h-screen text-3xl flex-col gap-3'>
      404 Error ! User not found...
      <button class="btn btn-secondary" onClick={ontryagain}>Try Again</button>
    </div>
  )
}

export default Errorpage;