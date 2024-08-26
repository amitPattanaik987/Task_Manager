import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { itemsContext } from '../Store/Store';
import "./Lists.css"

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
      .get('https://task-manager-2bcq.onrender.com/Lists')
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
    axios.get("https://task-manager-2bcq.onrender.com/Lists").then((response) => {
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

    axios.delete("https://task-manager-2bcq.onrender.com/Lists", { data: { deleteList } }).then((result) => {
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
    axios.post("https://task-manager-2bcq.onrender.com/delete/sublist", { tasks: item, List: clickedelement }).then((result) => {
      console.log(result);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='Outer-box flex justify-center items-center h-screen'>
      <div className='w-[70%] h-[70%] bg-white rounded-lg flex xl:p-[20px] max-xl:p-[15px] max-lg:p-[10px] max-sm:p-[5px] max-lg:w-[70%] max-sm:w-[95%]'>
        <div className='bg-white w-[35%] p-[5px] flex flex-col justify-between max-xl:p-[8px] left-container'>
          <div className='flex flex-col gap-[3px] bg-white max-xl:gap-[2px] left-container-upper'>
            <p className='bg-white text-sky-600 text-[18px] flex max-xl:text-[17px] justify-between p-[4px] max-sm:p-[3px] max-sm:text-[15px] max-sm:flex max-sm:flex-col max-sm:text-center'>LISTS<span className='bg-white'>{Lists1.length != 0 ? <p className='text-[15px] text-center bg-white text-red-500 max-xl:text-[13px]'>(DOUBLECLICK TO DELETE)</p> : null}</span></p>
            <div className='flex flex-col gap-[3px] bg-white p-[5px] overflow-y-auto list-data'>
              {Lists1.length > 0 ? (
                Lists1.map((item) => (
                  <p key={item._id} className='p-[4px] flex justify-center cursor-pointer text-center select-none max-xl:h-[35px] max-sm:text-[13px] max-sm:p-[2px] inner-list' onClick={event} onDoubleClick={doubleclick}>{item.List}</p>
                ))
              ) : (
                <p className='flex text-center justify-center bg-orange-300 text-3xl p-[20px]'>No lists available !!</p>
              )}
            </div>
          </div>
          <button className='btn btn-success w-[100px] max-xl:text-[15px]' onClick={onNewListClick}>
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
                <div className='bg-white flex flex-col right-main-container'>
                  <div className='bg-white flex justify-between items-center mb-4'>
                    <p className='bg-white text-3xl text-sky-600 p-2 max-sm:text-[20px]'>TASKS-{clickedelement}</p>
                    <button className='btn btn-success' onClick={Addbtnclicked}>+</button>
                  </div>
                  <div className='flex flex-col gap-1 bg-white p-2 overflow-y-auto tasks-data'>
                    {
                      tasks.length === 0 ?
                        <p className='bg-white text-center p-2'>There Is No Tasks! Click On The Add Button To Create Tasks.</p> :
                        tasks.map((item) => (
                          <div key={Math.random()} className='p-[10px] bg-slate-300 border border-slate-400 flex justify-between'>
                            <p className='bg-slate-300 w-[100%] flex items-center p-[5px] justify-center'>{item}</p>
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
