import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { itemsContext } from '../Store/Store';

function Lists() {
  const navigate = useNavigate();
  const [Lists1, setLists1] = useState([]);
  const [listclicked, setlistclicked] = useState(false);
  const [clickedelement, setclickedelement] = useState();
  const { setListname } = useContext(itemsContext)
  const [tasks, settasks] = useState([])

  const onNewListClick = () => {
    navigate('/NewList');
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/Lists')
      .then(response => {
        setLists1(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const event = (e) => {
    setlistclicked(true);
    setclickedelement(e.target.innerHTML);
    setListname(e.target.innerHTML);
    axios.get("http://localhost:3000/Lists").then((response) => {
      const a = e.target.innerHTML;
      response.data.map((item) => {
        if (item.List === a) {
          settasks(item.tasks)
        }
      })
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    })
  };

  const doubleclick = (e) => {
    const deleteList = e.target.innerHTML;

    axios.delete("http://localhost:3000/Lists", { data: { deleteList } }).then((result) => {
      console.log(result);
      window.location.reload();
    }).catch((err) => {
      console.error('Error In Deleting the list:', err);
    })
  }

  const Addbtnclicked = () => {
    navigate("/Newtask");
  }

  function deleteclicked(item) {
    console.log(item);
    console.log(clickedelement);
    axios.post("http://localhost:3000/delete/sublist", { tasks: item, List: clickedelement }).then((result) => {
      console.log(result);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='Outer-box flex justify-center items-center h-screen'>
      <div className='w-[50%] h-[70%] bg-white rounded-lg p-[20px] flex'>
        <div className='bg-white w-[35%] p-[10px] flex flex-col justify-between'>
          <div className='flex flex-col gap-[4px] bg-white'>
            <p className='bg-white text-sky-600 text-[20px] p-2 flex'>LISTS<span>{Lists1.length != 0 ? <p className='text-[15px] text-center bg-white text-red-500'>(DOUBLECLICK ON LIST TO DELETE)</p> : null}</span></p>
            <div className='flex flex-col gap-1 bg-white p-2 h-[320px] overflow-y-auto'>
              {Lists1.length > 0 ? (
                Lists1.map((item) => (
                  <p key={item._id} className='p-2 flex justify-center cursor-pointer text-center select-none' onClick={event} onDoubleClick={doubleclick}>{item.List}</p>
                ))
              ) : (
                <p className='flex text-center justify-center bg-orange-300 text-3xl p-[20px]'>No lists available !!</p>
              )}
            </div>
          </div>
          <button className='btn btn-success w-[100px]' onClick={onNewListClick}>
            Create List
          </button>
        </div>
        <div className='p-[10px] w-[65%] bg-white'>
          {
            Lists1.length === 0 ?
              <div className='bg-white p-[10px] mx-auto'>
                <p className='bg-white'>Please Create a list from the Sidebar</p>
              </div>
              :
              !listclicked ?
                <div className='bg-white flex justify-center text-center mt-5'>
                  <p className='bg-white text-3xl'>Click on the lists to add tasks</p>
                </div>
                :
                <div className='bg-white flex flex-col'>
                  <div className='bg-white flex justify-between items-center mb-4'>
                    <p className='bg-white text-3xl text-sky-600 p-2'>TASKS-{clickedelement}</p>
                    <button className='btn btn-success' onClick={Addbtnclicked}>+</button>
                  </div>
                  <div className='flex flex-col gap-1 bg-white p-2 h-[320px] overflow-y-auto'>
                    {
                      tasks.length === 0 ?
                        <p className='bg-white text-center p-2'>There Is No Tasks! Click On The Add Button To Create Tasks.</p> :
                        tasks.map((item) => (
                          <div key={Math.random()} className='p-[10px] bg-slate-300 border border-slate-400 flex justify-between'>
                            <p className='bg-slate-300 w-[100%] flex items-center p-[5px]'>{item}</p>
                            <button className='btn btn-danger' onClick={() => {
                              deleteclicked(item);
                            }}>🗑️</button>
                          </div>
                        ))
                    }
                  </div>
                </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Lists;
