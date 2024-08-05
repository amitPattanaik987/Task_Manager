import axios from "axios";
import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { itemsContext } from "../Store/Store";

export default function Newtask() {
    const [task, settask] = useState();
    const navigate = useNavigate();
    const {Listname}=useContext(itemsContext);

    const onAddClick = (e) => {
        e.preventDefault();
        console.log(task);
        console.log(Listname);

        axios.post("http://localhost:3000/Newtask", {task: task , List:Listname })
            .then((result) => {
                console.log(result);
                navigate("/Lists");
            })
            .catch((err) => {
                console.error('Error creating new Task:', err);
            });
    };
    

    const onCancelClick = () => {
        navigate("/Lists");
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[40%] h-[180px] bg-white p-[15px] flex flex-col gap-[16px] rounded-xl'>
                <h1 className='bg-white'>CREATE A NEW TASK</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Enter task here..'
                    onChange={(e) => settask(e.target.value)}
                />
                <div className='bg-white flex gap-[10px]'>
                    <button className="btn btn-light" onClick={onCancelClick}>Cancel</button>
                    <button className='btn btn-primary' onClick={onAddClick}>Add</button>
                </div>
            </div>
        </div>
    );
}
