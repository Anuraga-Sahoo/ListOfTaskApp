import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { showandhide } from "../redux store/features/show/showSlice";
import { resetFormData, storeData, updateFormData } from "../redux store/features/getData/getDataSlice";

const Form = () => {
  
  const showForm = useSelector((state)=> state.show.value)
  const data = useSelector((state) => state.getData.formData)
  const dispatch = useDispatch()
   
  // const [data , setData] = useState({title : "", description: "", date: "", priority:""})

  // after submit  it save the data in storage with the help of redux toolkit
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(data)
    dispatch(storeData())
    // dispatch(resetFormData())
    // dispatch(showandhide())
  }

// get the value of  form data
  let updateHandler = (e) => {
    dispatch(updateFormData({ name: e.target.name, value: e.target.value }));
    }

  
  
  return (
    <>
    <div className={showForm ? "main-container mt-[10rem] flex justify-center items-center" : "hidden"}>
    <div className="relative w-fit">
      <div className="input bg-zinc-900 h-fit p-10 w-fit rounded-md">
      <ImCross onClick={()=> dispatch(showandhide())} className="absolute  left-[20rem] top-5 text-white"/>
        <form action="" onSubmit={submitHandler} className="flex flex-col gap-3 justify-center items-center">
          <input
            type="text"
            name="title"
            id=""
            placeholder="Enter your task Title"
            onChange={updateHandler}
            required
            className="w-[18rem] h-[2.5rem] rounded-md px-[4rem] text-black mt-4"
          />

          <textarea name="description" id=""
          placeholder="Describe Your Work"
          onChange={updateHandler}
          required
          className='w-[18rem] h-[5rem] rounded-md px-[4.5rem] py-4 text-black'></textarea>

          <div className="flex gap-2">
          <input
            type="date"
            name="date"
            id=""
            onChange={updateHandler}
            required
            className="w-[8.5rem] h-[2rem] rounded-md p-3 text-black"
          />

          <input
            type="number"
            name="priority"
            id=""
            onChange={updateHandler}
            required
            placeholder="Enter Priority"
            className="w-[8.5rem] h-[2rem] rounded-md p-3 text-black"
          />
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-blue-600 rounded-md w-[6rem] h-[2.5rem] font-bold text-xl m-3"
          />
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default Form;
