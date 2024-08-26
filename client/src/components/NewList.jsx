import axios from "axios";
import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function NewList() {
    const [List, setList] = useState();
    const navigate = useNavigate();

    const onCreateClick = (e) => {
        e.preventDefault();
        console.log(List);

        axios.post("https://task-manager-2bcq.onrender.com/NewList",  {List} )
            .then((result) => {
                console.log(result);
                navigate("/Lists");
            })
            .catch((err) => {
                console.error('Error creating new list:', err);
            });
    };

    const onCancelClick = () => {
        navigate("/Lists");
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[40%] h-[180px] bg-white p-[15px] flex flex-col gap-[16px] rounded-xl max-md:w-[90%] max-md:h-[220px] max-md:justify-center'>
                <h1 className='bg-white max-md:text-[25px]'>CREATE A NEW LIST</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Enter List here..'
                    onChange={(e) => setList(e.target.value)}
                />
                <div className='bg-white flex gap-[10px]'>
                    <button className="btn btn-light" onClick={onCancelClick}>Cancel</button>
                    <button className='btn btn-primary' onClick={onCreateClick}>Create</button>
                </div>
            </div>
        </div>
    );
}
