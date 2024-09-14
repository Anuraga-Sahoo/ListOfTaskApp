import { useEffect, useState } from "react";
import Form from "./components/Form";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showandhide } from "./redux store/features/show/showSlice";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  deleteData,
  updateData,
  updateStatus,
} from "./redux store/features/getData/getDataSlice";

function App() {
  // const [editId, setEditId] = useState(null); // Track the ID of the item being edited
  // const [editFormData, setEditFormData] = useState({ title: "", description: "", date: "", priority: "" });

  const showForm = useSelector((state) => state.show.value);
  const updatedData = useSelector((state) => state.getData.formData);
  // console.log("updated Data: ",updatedData)
  const storeData = useSelector((state) => state.getData.storage);
  console.log(storeData);
  const dispatch = useDispatch();

  // edit record 
  // const handleEdit = (id) => {
  //   // alert(id)
  //   dispatch(updateData( id, updatedData )); // Dispatch action to update data
  //   setEditFormData(); // Reset form data

  // }

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

      if (midValue < target.toLowerCase()) {
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

      <div className="searchedItem">
        {showSearchValue && (
          <table>
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>status</th>
            </thead>
            <tr>
              <td>{getSearchValue.title}</td>
              <td>{getSearchValue.description}</td>
              <td>{getSearchValue.date}</td>
              <td>{getSearchValue.priority}</td>
              {/* <td>{getSearchValue.title}</td> */}
            </tr>
          </table>
        )}
      </div>

      <div className="container mt-10 w-full flex justify-center">
      { storeData.length === 0 ? null :
        <div className="dataList  border-2 border-spacing-2 border-black overflow-y-scroll h-[30rem]">
          {/* table row heading  */}
          
            <table>
            <thead>
              <tr>
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
                        onClick={() => handleEdit(index)}
                        className="bg-blue-600 rounded-md ml-3 mr-0 p-1 w-[4rem] text-white"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 rounded-md ml-5 mr-5 p-1 w-[4rem] text-white"
                      >
                        Delete
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
