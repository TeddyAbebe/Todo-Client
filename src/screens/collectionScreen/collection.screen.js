import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
import { TodoService } from "../../services";
// import PercentageCircle from "reactjs-percentage-circle";

import { FiMoreHorizontal, FiPlus } from "react-icons/fi";

// import { FaBookOpen } from "react-icons/fa";

import AddNewPopup from "./addnew.popup";
import { BottomBar } from "../shared";
import CollectionItem from "./collection.item";

// const data = [
//   { id: 1, title: "School", color: "pink2", percentage:20 },
//   { id: 2, title: "Personal", color: "green2" , percentage:80 },
//   { id: 3, title: "Design", color: "purple2", percentage:10 },
//   { id: 4, title: "Groceries", color: "yellow2", percentage:55 },
// ];

function CollectionScreen() {
  const todoService = new TodoService();
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [taskMap, setTaskMap] = useState(null);

  const fetchTodos = () => {
    setLoading(true);
    todoService.getAllTodo()
    .then((res) => {
      // console.log(res.data);
      const tasks = res.data;
      let tm = {};
      tasks.forEach((ts) => {
        console.log(tm[ts.colid]);
        if(tm[ts.colid]!==undefined){
          tm[ts.colid] = [...tm[ts.colid], ts];
        }else{
          tm[ts.colid] = [ts];
        }
      });
      setTaskMap(tm);
      console.log(tm);
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false));
  }

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col w-full items-center pb-20">
      <div className="flex flex-col w-full px-3 md:w-5/6 lg:px-0 lg:w-[930px] text-white pt-5 lg:pt-16">
        <div className="flex flex-row justify-between items-center mb-10">
          <div className="font-medium text-2xl">Collections</div>
          <FiMoreHorizontal size={20} />
        </div>
        <div className="flex flex-row gap-2 text-sm mb-5">
          <div className="px-5 py-1.5 border-2 border-third rounded-xl">
            Favorites
          </div>
          <div className="px-5 py-1.5 border-2 border-third bg-third rounded-xl">
            All Collections
          </div>
          {loading && <div>Loading...</div>}
        </div>

        {taskMap!=null && (
          <div className="flex flex-row flex-wrap">
            {Object.keys(taskMap).map((d) => {
              return (
                <CollectionItem todos={taskMap[d]}/>
              );
            })}

            <div className="w-1/2 lg:w-1/3 p-1.5">
              <div onClick={() => setAddTaskOpen(true)} 
              className="border-2 border-secondary hover:border-third rounded-2xl px-4 py-8 flex flex-col gap-4 justify-center items-center duration-200 hover:cursor-pointer">
                <FiPlus size={22} className='text-third'/>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomBar />

      {addTaskOpen && <AddNewPopup onClose={() => setAddTaskOpen(false)} onTaskAdded={fetchTodos}/>}
    </div>
  );
}

export default CollectionScreen;
