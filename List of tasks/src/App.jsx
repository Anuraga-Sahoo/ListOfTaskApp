import { useEffect, useState } from "react";
import Form from "./components/Form";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showandhide, updateformshowandhide } from "./redux store/features/show/showSlice";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  deleteData,
  updateData,
  updateStatus,
} from "./redux store/features/getData/getDataSlice";
import ListUpdate from "./components/ListUpdate";
import { ImCross } from "react-icons/im";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  // const [editId, setEditId] = useState(null); // Track the ID of the item being edited
  // const [editFormData, setEditFormData] = useState({ title: "", description: "", date: "", priority: "" });

  const showForm = useSelector((state) => state.show.value);
  const updateFormShow = useSelector((state) => state.show.updatedFormValue);

  const updatedData = useSelector((state) => state.getData.formData);
  const storeData = useSelector((state) => state.getData.storage);
  const dispatch = useDispatch();

  // add Task btn
  const addTask = () => {
    dispatch(showandhide());
    // dispatch(updateformshowandhide())

  }

  // edit record 
  // Edit state to track the ID and data of the task being edited
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
  });

  // Handle edit button click
  const handleEdit = (id) => {
    dispatch(updateformshowandhide())
    // dispatch(showandhide())
    setEditId(id);
    const taskToEdit = storeData[id];
    setEditFormData({
      title: taskToEdit.title,
      description: taskToEdit.description,
      date: taskToEdit.date,
      priority: taskToEdit.priority,
    });
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle form submission for updating task
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateData({ id: editId, updatedData: editFormData }));
    setEditId(null); // Reset editId to close the form after updating
  };
    

  

  // delete record button
  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  // search
  const [searchValue, setSearchValue] = useState("");
  const [getSearchValue, setGetSearchValue] = useState({});
  const [showSearchValue, setShowSearchValue] = useState(false);

  let handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Binary Search Implementation
  const binarySearch = (arr, target) => {
    let lowIndex = 0;
    let high = arr.length - 1;

    while (lowIndex <= high) {
      let mid = Math.floor((lowIndex + high) / 2);
      let midValue = arr[mid].title.toLowerCase();

      if (midValue === target.toLowerCase()) {
        return arr[mid]; // If found, return the matching item
      }

      if (midValue <= target.toLowerCase()) {
        lowIndex = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return null; // If not found, return null
  };

  // onclick search btn

  let handleClick = () => {
    let result = binarySearch(storeData, searchValue);
    if (result) {
      setGetSearchValue(result);
      setShowSearchValue(true);
    } else {
      setShowSearchValue(false);
      alert("No matching task found!");
    }
  };
  console.log(getSearchValue);

  // Handle progress button click
  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === 'In Progress' ? 'Complete' : 'In Progress';
    dispatch(updateStatus({ id, newStatus }));
  };

  return (
    <>
      <div className="m-5 flex justify-around">
        <Link
          to="/"
          className="text-xl  text-black rounded-md p-2 border-2 border-black flex items-center gap-2 hover:bg-black hover:text-white"
        >
          <IoArrowBackSharp />
          Home
        </Link>
        <div className="flex justify-center items-center">
          <label htmlFor="short">Short By :</label>
          <span id="short" className="bg-green-300 ml-3 rounded-md p-2">
            Priority and Date
          </span>
        </div>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            onChange={handleSearch}
            className="border-2 border-green-500 mr-3 rounded-md h-9 p-5"
          />
          <button
            onClick={handleClick}
            className="bg-zinc-900 text-white rounded-md inline-flex items-center justify-center gap-2  font-bold h-10 w-[5rem] p-3 hover:border-2 hover:border-black hover:text-black hover:bg-white"
          >
            Search
          </button>
        </div>
        <button
          onClick={addTask}
          className="bg-green-500 hover:bg-green-600 rounded-md inline-flex items-center justify-center gap-2  font-bold h-10 w-[5rem] p-3 ml-3"
        >
          Add
          <FaPlus className="text-white" />
        </button>
      </div>
      {/* -------------------------------------Show Add Task Form--------------------------------------------------- */}
      <div className=" flex justify-center items-center">
        {
        showForm && <Form />
      }
      
      </div>
      {/* -------------------------------------Show Edit Task Form--------------------------------------------------- */}
      { updateFormShow && 
        <div>
         {/* Conditionally render the edit form if a task is being edited */}
      {editId !== null && (
        <div className="flex justify-center items-center mt-10">
          <ImCross onClick={()=> dispatch(updateformshowandhide())} className="absolute  left-[20rem] top-5 text-white"/>
          <form
            onSubmit={handleUpdate}
            className="bg-zinc-900 w-[25rem] p-5 rounded-md shadow-md flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Task</h2>
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="p-2 rounded-md"
            />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              className="p-2 rounded-md"
            />
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleInputChange}
              className="p-2 rounded-md"
            />
            <input
              type="number"
              name="priority"
              value={editFormData.priority}
              onChange={handleInputChange}
              className="p-2 rounded-md"
            >
             
            </input>
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md p-2"
            >
              Update Task
            </button>
          </form>
        </div>
      )}
      </div>
      }
{/* ------------------------------------searched item table----------------------------------------- */}
      <div className="searchedItem flex w-full justify-center items-center  ">
        {showSearchValue && (
          <table className="w-[50%] flex flex-col gap-1 bg-blue-200 justify-center items-center rounded-md">
            <thead className="flex gap-8">
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
            </thead>
            <tbody >

            <tr className="flex gap-[4.1rem]">
              <td>{getSearchValue.title}</td>
              <td>{getSearchValue.description}</td>
              <td>{getSearchValue.date}</td>
              <td>{getSearchValue.priority}</td>
              
            </tr>
            </tbody>
          </table>
        )}
      </div>
{/* ----------------------------------------Show the Task Table----------------------------------------------- */}
      <div className="container mt-10 w-full flex justify-center">
      { storeData.length === 0 ? null :
        <div className="dataList   overflow-y-scroll h-[30rem]">
          {/* table row heading  */}
          
            <table >
            <thead>
              <tr >
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  Title
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  Description
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  Due date
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  Priority
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  Status
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  
                </th>
                <th className="text-xl  border-2 border-b-zinc-800 font-serif">
                  
                </th>
              </tr>
            </thead>

            {/* table row data */}

            <tbody>
              {storeData.map((data, index) => {
                console.log(index);
                
                return (
                  <tr key={index}>
                    <td className="text-center font-sans">{data.title}</td>
                    <td className="text-center font-sans w-[35rem] h-[0.5rem]">
                      {data.description}
                    </td>
                    <td className="text-center font-sans">{data.date}</td>
                    <td className="text-center font-sans">{data.priority}</td>
                    <td><button onClick={() => handleStatusChange(index, data.status)} className={`rounded-md p-2 m-2 text-white font-semibold ${
                          data.status === "Complete"
                            ? "bg-green-400"
                            : "bg-orange-400"
                        }`}>
                          {data.status === "Complete" ? "Completed" : "Progress..."}
                          </button></td>
                    <td>
                      <button
                      // to={`/edit/${index}`}
                      onClick={() => handleEdit(index)}
                        className="bg-blue-600 rounded-md ml-3 mr-0 p-2 w-[2rem] text-white flex justify-center items-center gap-1"
                      >
                        <CiEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 rounded-md ml-5 mr-5 p-2 w-[2rem] text-white flex justify-center items-center gap-1"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
          }
      </div>
    </>
  );
}

export default App;
