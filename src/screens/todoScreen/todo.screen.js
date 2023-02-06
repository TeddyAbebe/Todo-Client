import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import { FaCheck, FaAngleLeft, FaPlus, FaRegCalendar, FaBookOpen, FaUser, FaPaintBrush, FaShoppingCart } from "react-icons/fa";

import { TodoService } from "../../services";


function TodoScreen() {
  const todoService = new TodoService();
  const [completed, setCompleted] = useState(0);
  const [notCompleted, setNotCompleted] = useState(0);

  const {id} = useParams();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodosOfCollection = () => {
    setLoading(true);
    todoService.getTodoByCollectionId(id)
    .then((res) => {
      // console.log(res.data);
      setTodos(res.data);
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false));
  }

  const completeTask = (id, comp) => {
    const data = {
      completed: comp
    }
    // setLoading(true);
    todoService.completeTodo(id, data)
    .then((res) => {
      fetchTodosOfCollection();
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false));
  }

  useEffect(() => {
    fetchTodosOfCollection();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(todos.length>0){
      let comp = 0;
      let notComp = 0;
      todos.forEach(
        (todo) => {
          if(todo.completed!==0){
            comp += 1
          }else{
            notComp += 1
          }
        }
      );

      setCompleted(comp);
      setNotCompleted(notComp);
    }
    // eslint-disable-next-line
  }, [todos]);

  return (
    <div className="flex flex-row w-full">
      <div className="hidden lg:flex flex-col w-80 bg-secondary py-4 text-white h-screen">
        <div className="flex flex-row gap-3 items-center px-8 py-4">
          <div className="text-xl">Collections</div>
        </div>
        <div className="flex flex-row gap-3 items-center px-8 py-4 hover:bg-third duration-200">
          <div className={`w-8 h-8 flex flex-row justify-center items-center bg-pink2 rounded-lg`}>
            <FaBookOpen size={14}/>
          </div>
          <div className="font-medium text-lg">School</div>
        </div>
        <div className="flex flex-row gap-3 items-center px-8 py-4 hover:bg-third duration-200">
          <div className={`w-8 h-8 flex flex-row justify-center items-center bg-green2 rounded-lg`}>
            <FaUser size={14}/>
          </div>
          <div className="font-medium text-lg">Personal</div>
        </div>
        <div className="flex flex-row gap-3 items-center px-8 py-4 hover:bg-third duration-200">
          <div className={`w-8 h-8 flex flex-row justify-center items-center bg-purple2 rounded-lg`}>
            <FaPaintBrush size={14}/>
          </div>
          <div className="font-medium text-lg">Design</div>
        </div>
        <div className="flex flex-row gap-3 items-center px-8 py-4 hover:bg-third duration-200">
          <div className={`w-8 h-8 flex flex-row justify-center items-center bg-yellow2 rounded-lg`}>
            <FaShoppingCart size={14}/>
          </div>
          <div className="font-medium text-lg">Groceries</div>
        </div>
      </div>
      <div className="flex flex-col items-center flex-grow px-4">
        <div className="flex flex-col w-full px-3 md:w-5/6 lg:px-0 lg:w-[800px] text-white pt-5 lg:pt-16 gap-6">

          <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-row gap-3 items-center">
              <Link to={'/'} className={`w-8 h-8 flex flex-row justify-center items-center bg-secondary rounded-lg`}>
                <FaAngleLeft size={20}/>
              </Link>
              <div className="font-medium text-2xl">Collections</div>
            </div>
            <FiMoreVertical size={20} />
          </div>

          <div className="hidden px-2.5 py-2.5 border-2 border-secondary hover:border-third duration-200 hover:cursor-pointer rounded-2xl lg:flex flex-row gap-3 items-center">
            <div className={`p-1.5 flex flex-row justify-center items-center bg-pink2 rounded-xl`}>
              <FaPlus size={16} className='text-primary'/>
            </div>
            <div className="text-base text-[#aaa]">Add a task</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-base ">Tasks - {notCompleted}</div>
            {loading && <div>Loading...</div>}
            {todos.length>0 && (
              <div className="flex flex-col gap-2">
                {todos.map((todo) => {
                  if(todo.completed===0){
                    return (
                      <div id={todo.id} onClick={() => completeTask(todo.id, true)}
                      className="px-3 py-3 bg-secondary hover:border-third duration-200 hover:cursor-pointer rounded-2xl flex flex-row gap-3 items-start">
                        <div className={`w-6 h-6 flex flex-row justify-center items-center rounded-lg border-2 border-pink2 bg-secondary`}>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-base text-[#aaa]">
                            {todo.title}
                          </div>
                          <div className="flex flex-row gap-2 text-green2">
                            <FaRegCalendar size={15} className=''/>
                            <div className="text-sm">
                                Mondary
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }else{
                    return <div></div>;
                  }
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-base ">Completed - {completed}</div>
            {loading && <div>Loading...</div>}
            {todos.length>0 && (
              <div className="flex flex-col gap-2">
                {todos.map((todo) => {
                  if(todo.completed!==0){
                    return (
                      <div id={todo.id} onClick={() => completeTask(todo.id, false)}
                      className="px-3 py-3 bg-secondary hover:border-third duration-200 hover:cursor-pointer rounded-2xl flex flex-row gap-3 items-start">
                        <div className={`w-6 h-6 flex flex-row justify-center items-center rounded-lg border-2 border-pink2 bg-pink2`}>
                          <FaCheck size={12} className='text-primary'/>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-base text-[#aaa] line-through">
                            {todo.title}
                          </div>
                          <div className="flex flex-row gap-2 text-green2">
                            <FaRegCalendar size={15} className=''/>
                            <div className="text-sm">
                                Mondary
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }else{
                    return <div></div>;
                  }
                })}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 p-3 flex flex-row justify-center items-center bg-pink2 rounded-2xl mb-6 lg:hidden">
          <FiPlus size={21} />
        </div>
      </div>

    </div>
  );
}

export default TodoScreen;
