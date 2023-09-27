import { useState } from "react"
import Link from "next/link";

export default function Searchbar({placeholder,data}){
    const [filteredData, setFilteredData] = useState([]);
    const handleFilter =(event)=>{
        const searchWord = event.target.value;
        const newFilter = data.filter((value)=>{
            return value.description.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord==""){
            setFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
    }
    return(
        <>
            <form className='w-full my-5 flex justify-center'>   
            <svg aria-hidden="true" className="w-8 h-14 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <div className="relative w-3/4" id="search">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    </div>
                    <input type="search" id="searchInputs" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder={placeholder} required onChange={handleFilter}/>
                    {filteredData.length!=0 &&(
                    <div id="dataResult" className="mt-1 w-80 h-20 bg-white shadow-lg overflow-y-auto scrollbar-none">
                        {filteredData.slice(0,10).map((value,key)=>{
                            return(
                                <div>
                                <Link id="dataItem" href={`/mens/tshirt/${value.tshirtId}`} target="_blank" className="w-full h-12 flex items-center text-black hover:bg-gray-200">
                                <p className="ml-3">{value.description}</p>
                                </Link>
                                <Link href={`/mens/tshirt/${value.tshirtId}`} id="clearbtn" type="submit" className="flex cursor-pointer text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-red-500 dark:focus:ring-red-800">Search</Link>
                                </div>
                            )
                        })}
                        </div>
                    )}
                </div>
            </form>
        </>
    )
}