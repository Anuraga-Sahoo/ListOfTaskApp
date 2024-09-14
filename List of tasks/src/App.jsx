import { useState } from "react";
import Form from "./components/Form";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showandhide } from "./redux store/features/show/showSlice";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

function App() {
  const showForm = useSelector((state) => state.show.value);
  // console.log(showForm)
  const dispatch = useDispatch();
  return (
    <>
      <div className="m-5 flex justify-around">
        
      <Link to="/" className="text-xl  text-black rounded-md p-2 border-2 border-black flex items-center gap-2 hover:bg-black hover:text-white"><IoArrowBackSharp />Home</Link>
      <div>
          <label htmlFor="short">Short By :</label>
          <select id="short" className="bg-green-300 ml-3 rounded-md p-2">
            <option value="dueDate">due Date</option>
            <option value="priority.">priority.</option>
          </select>
        </div>
        <div>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="border-2 border-green-500 mr-3 rounded-md h-9 p-5"
          />
          <button className="bg-zinc-900 text-white rounded-md inline-flex items-center justify-center gap-2  font-bold h-10 w-[5rem] p-3 hover:border-2 hover:border-black hover:text-black hover:bg-white">
            Search
          </button>
        </div>
        <button
          onClick={() => dispatch(showandhide())}
          className="bg-green-500 hover:bg-green-600 rounded-md inline-flex items-center justify-center gap-2  font-bold h-10 w-[5rem] p-3 ml-3"
        >
          Add
          <FaPlus className="text-white" />
        </button>
      </div>
      <div className=" flex justify-center items-center">
        {showForm && <Form />}
      </div>

<div className="container mt-10 w-full flex justify-center">

      <div className="dataList  border-2 border-spacing-2 border-black overflow-y-scroll h-[30rem]">
        {/* table row heading  */}
        <table >
          <thead>

        <tr >
          <th className="text-2xl  border-2 border-b-zinc-800 font-serif">Title</th>
          <th className="text-2xl  border-2 border-b-zinc-800 font-serif">Description</th>
          <th className="text-2xl  border-2 border-b-zinc-800 font-serif">Due date</th>
          <th className="text-2xl  border-2 border-b-zinc-800 font-serif">Priority</th>
          <th className="text-2xl  border-2 border-b-zinc-800 font-serif">Status</th>
        </tr>
          </thead>

        {/* table row data */}

        <tbody>

        <tr >
          <td className="text-center font-sans">Make youtube video</td>
          <td className="text-center font-sans w-[35rem] h-[0.5rem]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, consequuntur?</td>
          <td className="text-center font-sans">29-9-2024</td>
          <td className="text-center font-sans">1st</td>
          <td>incomplete</td>
        </tr>
        <tr>
          <td className="text-center font-sans">Make youtube video</td>
          <td className="text-center font-sans ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, consequuntur? Lorem ipsum dolor sit amet.</td>
          <td className="text-center font-sans">29-9-2024</td>
          <td className="text-center font-sans">1st</td>
          <td>incomplete</td>
        </tr>
        </tbody>
        </table>
      </div>
</div>
    </>
  );
}

export default App;
