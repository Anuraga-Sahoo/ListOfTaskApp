import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ListUpdate = () => {

  const {id} = useParams();
  const storeData = useSelector((state) => state.getData.storage);
  console.log(storeData);
  const existingUser = storeData.filter((f, index )=> index == id)
  if (!existingUser.length) {
    return <div>No task found with the given ID.</div>;
  }
  const { title, description, date, priority} = existingUser[0]

  const [updateTitle, setUpdateTitle] = useState(title)
  const [updateDescription, setUpdateDescription] = useState(description)
  const [updateDate, setUpdateDate] = useState(date)
  const [updatePriority, setUpdatePriority] = useState(priority)



  return (
    <div>
      <>
    <div className={true ? "main-container mt-[5rem] flex justify-center items-center flex-col"  : "hidden"}>
      <h2 className="font-bold text-2xl m-2">Update your Task</h2>
    <div className="relative w-fit">
      <div className="input bg-zinc-900 h-fit p-10 w-fit rounded-md">
      <ImCross className="absolute  left-[20rem] top-5 text-white"/>
        <form action=""  className="flex flex-col gap-3 justify-center items-center">
          <input
            type="text"
            name="title"
            id=""
            placeholder="Enter your task Title"
            required
            value={updateTitle}
            className="w-[18rem] h-[2.5rem] rounded-md px-[4rem] text-black mt-4"
          />

          <textarea name="description" id=""
          placeholder="Describe Your Work"
          required
          value={updateDescription}
          className='w-[18rem] h-[5rem] rounded-md px-[4.5rem] py-4 text-black'></textarea>

          <div className="flex gap-2">
          <input
            type="date"
            name="date"
            id=""
            required
            value={updateDate}
            className="w-[8.5rem] h-[2rem] rounded-md p-3 text-black"
          />

          <input
            type="number"
            name="priority"
            id=""
            required
            value={updatePriority}
            placeholder="Enter Priority"
            className="w-[8.5rem] h-[2rem] rounded-md p-3 text-black"
          />
          </div>
          <input
            type="submit"
            value="Update"
            className="bg-blue-600 rounded-md w-[6rem] h-[2.5rem] font-bold text-xl m-3"
          />
        </form>
      </div>
    </div>
    </div>
    </>
    </div>
  )
}

export default ListUpdate
