import React, { useState, useEffect, useRef } from 'react';
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
  const { setListname, Listname } = useContext(itemsContext)
  const [tasks, settasks] = useState([])

  const onNewListClick = () => {
    navigate('/NewList');
  };

  useEffect(() => {
    let email = localStorage.getItem("email")
    if(!email){
      alert("Please Logi or SignUp First..")
    }

    axios
      .get(https://task-management-2-5ack.onrender.com/Lists', {
        params: {
          email: email  // Pass the email as a query parameter
        }
      })
      .then(response => {
        response.data.map((item) => {
          setLists1((prev) => ([...prev, item.list]))
        })

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);


  const setter = (e) => {
    setlistclicked(true);
    setListname(e.target.innerHTML);
    setclickedelement(e.target.innerHTML);
  }


  const event = (e) => {

    axios.get("https://task-management-2-5ack.onrender.com/Listsdata", {
      params: {
        list: e.target.innerHTML
      }
    }).then((response) => {
      console.log(response.data[0].tasks);
      settasks(response.data[0].tasks)
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    })
  };

  const doubleclick = (e) => {
    console.log(clickedelement);

    const deleteList = clickedelement;

    axios.delete("https://task-management-2-5ack.onrender.com/Lists", {
      params: {
        list: deleteList
      }
    })
      .then((result) => {
        console.log(result);
        window.location.reload(); // Reloads the page after deletion
      })
      .catch((err) => {
        console.error('Error In Deleting the list:', err);
      });
  }


  const Addbtnclicked = () => {
    navigate("/Newtask");
  }

  function deleteclicked(item) {
    console.log(item);
    console.log(clickedelement);
    axios.post("https://task-management-2-5ack.onrender.com/delete/sublist", { task: item, list: clickedelement }).then((result) => {
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
            <p className='bg-white text-sky-600 text-[18px] flex  justify-center p-[4px] max-sm:p-[3px] max-sm:flex max-sm:flex-col max-sm:text-center'>LISTS</p>
            <div className='flex flex-col gap-[3px] bg-white p-[5px] overflow-y-auto list-data'>
              {Lists1.length > 0 ? (
                Lists1.map((item) => (
                  <p key={item._id} className=' px-[10px] flex items-center cursor-pointer select-none max-sm:text-[13px] max-sm:p-[2px] inner-list justify-between' onClick={(e) => { setter(e); event(e) }} >{item}</p>
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
                    <p className='bg-white w-[80%] text-3xl text-sky-600 p-2 max-sm:text-[20px] overflow-x-auto right-task-open'>TASKS-{clickedelement}</p>
                    <div className='bg-white flex gap-1'>
                      <button className='btn btn-success' onClick={Addbtnclicked}>+</button>
                      <button className='btn btn-danger' onClick={doubleclick}>🗑️</button>
                    </div>
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
