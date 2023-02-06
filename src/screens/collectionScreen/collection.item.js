import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { FaBookOpen, FaCheck } from "react-icons/fa";

function CollectionItem({todos}) {
    const [collectionData, setCollectionData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        let comp = [];
        let notComp = [];
        todos.forEach(
            (todo) => {
            if(todo.completed!==0){
                comp.push(todo);
            }else{
                notComp.push(todo);
            }
            }
        );


        const pr = (notComp.length / todos.length)*100;

        const data = {
            name: todos[0].name,
            percentage: pr,
            completedCount: comp.length,
            colId: todos[0].colid,
            total: todos.length
        }

        setCollectionData(data);
        setLoading(false);
    // eslint-disable-next-line
    }, []);

    return (
    <div className="w-1/2 lg:w-[310px] lg:h-[250px] p-2">
        {loading && (
            <div className="w-full">
                <div className="bg-secondary hover:scale-105 duration-200 rounded-3xl p-6 py-6 flex flex-col gap-0 h-full justify-between">
                    Loading ...
                </div>
            </div>
        )}
        {collectionData!=null && (
            <Link to={`/todo/${collectionData.colId}`} key={collectionData.colId} className="w-full">
                <div className="bg-secondary hover:scale-105 duration-200 rounded-3xl p-6 py-6 flex flex-col gap-0 h-full justify-between">
                    <div className={`w-10 h-10 flex flex-row justify-center items-center bg-pink2 rounded-xl mb-4`}>
                        <FaBookOpen size={23}/>
                    </div>
                    {/* <div>sad</div> */}
                    <div className="flex text-xl lg:text-2xl font-bold mb-2">{collectionData.name}</div>
                    <div className="flex flex-row justify-between items-center">

                        {collectionData.total===collectionData.completedCount 
                        ? (
                            <div className="text-sm lg:text-lg text-slate-400 mb-5">All {collectionData.total} done!</div>
                        ) 
                        : (
                            <div className="text-sm lg:text-lg text-slate-400">{collectionData.completedCount}/{collectionData.total} done</div>
                        )}
                    {/* <PercentageCircle percent={80}></PercentageCircle> */}

                    {collectionData.total===collectionData.completedCount 
                    ? (
                        <div className="w-8 h-8 rounded-full bg-purple2 flex justify-center items-center mb-5">
                            <FaCheck size={14} className="text-white"/>
                        </div>
                    ) 
                    : (
                        <>
                        <svg className="hidden lg:w-20 lg:h-20 lg:flex justify-center">
                        <circle className="text-third" stroke-width="4" stroke="currentColor" fill="transparent" r="15" cx="40" cy="40"/>
                            <circle className={`text-yellow2`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="transparent" strokeDasharray="94.2477796" 
                            strokeDashoffset={`${collectionData.percentage}`} r="15" cx="40" cy="40"/>
                        </svg>
                        <svg className="w-10 h-10 lg:hidden flex justify-center">
                            <circle className="text-third" stroke-width="4" stroke="currentColor" fill="transparent" r="12" cx="20" cy="20"/>
                            <circle className={`text-yellow2`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="transparent" strokeDasharray="94.2477796" 
                            strokeDashoffset={`${collectionData.percentage}`} r="12" cx="20" cy="20"/>
                        </svg>
                        </>
                    )}
                    </div>
                </div>
            </Link>
        )}
    </div>
    );
}

export default CollectionItem;
