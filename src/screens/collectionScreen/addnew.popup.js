import React, {useState} from "react";
import { Link } from "react-router-dom";

import { FaCalendar, FaFlag, FaCheck } from "react-icons/fa";

import { TodoService } from "../../services";

const cols = [
    {id:1, name:'School'},
    {id:2, name:'Personal'},
    {id:3, name:'Design'},
    {id:4, name:'Groceries'},

];

function AddNewPopup({onClose, onTaskAdded}) {
    const todoService = new TodoService();
    const [selectedCollection, setSelectedCollection] = useState(1);
    const [title, setTitle] = useState('');

    const [loading, setLoading] = useState(false);

    const createTodo = () => {
        if(title!==''){
            const data = {
                id: Math.floor(Math.random() * 1000000000),
                title: title,
                completed: false,
                colid: selectedCollection
            }
    
            setLoading(true);
            todoService.createTodo(data)
            .then((res) => {
                console.log(res.data);
                onTaskAdded();
                onClose();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        }else{
            console.log('Title not written');
        }

    }

  return (
    <div className="fixed z-10 w-full flex flex-col justify-end md:justify-start items-center text-white pt-10 h-full bg-[#00000077]">
        <div className="flex flex-col bg-secondary py-7 pb-10 md:pb-7 shadow-xl rounded-2xl p-5 gap-4 w-full md:w-auto">
            <input type="text" 
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
            className="border-2 border-third px-4 py-2.5 rounded-xl bg-secondary w-full md:w-96" 
            placeholder="Todo Title" />

            <div className="flex flex-col gap-3 mb-6">
                <div className="flex flex-row gap-3">
                    {cols.map((col) => {
                        return (
                            <div key={col.id} 
                            onClick={() => setSelectedCollection(col.id)}
                            className="flex flex-row px-4 py-1.5 rounded-xl border-2 border-third gap-2 items-center hover:cursor-pointer">
                                {selectedCollection===col.id && <FaCheck size={14} className='text-green2'/>}
                                <div className="text-white text-sm">
                                    {col.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-row gap-3">
                    <Link to={'/'} className="flex flex-row px-4 py-1.5 rounded-xl border-2 border-third gap-2 items-center">
                        <FaCalendar size={15} className='text-green2'/>
                        <div className="text-white text-sm">
                            Today
                        </div>
                    </Link>
                    <div className="flex flex-row px-4 py-1.5 rounded-xl border-2 border-third gap-2 items-center">
                        <FaFlag size={15} className='text-red-400'/>
                    </div>
                    {loading && <div>Loading...</div>}
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <div onClick={createTodo} className='px-10 py-2.5 rounded-xl bg-pink2 hover:cursor-pointer'>
                    Add Task
                </div>

                <div onClick={onClose} className='px-10 py-2.5 rounded-xl bg-third hover:cursor-pointer'>
                    Cancel
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddNewPopup;
