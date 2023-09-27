import Searchbar from "../../searchbar";
import Data from "../../data.json"
import Link from "next/link";
export default function Tshirt(){
    const handleClick = event => {
        const x=document.getElementById("left");
        const y=document.getElementById("select");
        if(x.classList.contains('hidden')){
            console.log(x.classList);
            x.classList.remove('hidden');
        }
        else{
            x.classList.add('hidden')
        }
      };
      const size = () =>{
        const x = document.getElementById("size");
        if(x.classList.contains('hidden')){
            console.log(x.classList);
            x.classList.remove('hidden');
        }
      };
      const sizerm = () =>{
        const x = document.getElementById("size");
        if(x.classList.contains('hidden')){
            console.log(x.classList);
            x.classList.remove('hidden');
        }
        else{
            x.classList.add('hidden')
        }
      };
    //   for(let i of products.data){
    //     console.log(i);
    //     let card = document.createElement("div");
    //     card.classList.add("card","i.category","col-span-1","bg-gray-200","mx-4");
    //     let imgContainer = document.createElement("div");
    //     imgContainer.classList.add("image-container");
    //     let image = document.createElement("img");
    //     image.setAttribute("src",i.image);
    //     image.setAttribute("alt",i.attribute);
    //     imgContainer.appendChild(image);
    //     card.appendChild(imgContainer);

    //     document.getElementById("products").appendChild(card);
    // }
    return(
        <>
            <div className="grid md:grid-cols-6 md:h-screen">
                <div className="md:col-span-1 md:border-r-4 sm:border-b-2 md:border-b-0 bg-primary text-white">
                <div className="flex justify-between items-center">
                    <h1 className="uppercase p-4 font-bold text-lg">ROTS Website</h1>
                    <div className="px-4 cursor-pointer md:hidden"  id="select">
                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleClick} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    </div>
                </div>
                <ul className="text-sm mt-6 inline sm:justify-start" id="menu">
                    <li><Link href='/' className="font-bold flex justify-center p-3 md:justify-start">Home</Link></li>
                    <li><Link href='#' className="flex justify-center p-3 md:justify-start">About</Link></li>
                    <li><Link href='#' className="flex justify-center p-3 md:justify-start">Contact</Link></li>
                    <li><Link href='/profile' className="flex justify-center p-3 md:justify-start">Profile</Link></li>
                </ul>
                </div>
                <div className="bg-gray-200 md:col-span-5 h-full mb-10">
                    <div className='flex justify-center md:justify-end'>
                        <Link href='/login' className='m-2 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 text-white font-semibold'>Login</Link>
                        <Link href='/signup' className='m-2 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 text-white font-semibold'>Signup</Link>
                    </div>
                    <Searchbar placeholder={"Search.."} data={Data}/>
                    <div className="grid grid-cols-4 mr-4">
                        <div className="col-span-3 bg-white ml-3">
                            <h1 className="uppercase p-4 font-bold text-lg">Jeans Catalouge</h1>
                            <div id="products" className="grid md:grid-cols-4 mb-4">
                                {Data.map((user)=>(
                                    <div className="sm:col-span-4 md:col-span-2 lg:col-span-1 mx-4 bg-gray-200" key={user.tshirtId}>
                                        <img src={`${user.image}`} alt={`${user.description}`}></img>
                                        <p>{user.description}</p>
                                        <p>&#8377;500 <del>1000</del></p>
                                        <p className="" id="size">Sizes-S,M,L,XL</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sm:hidden md:block col-span-1 ml-4">
                            <div className="bg-white">
                                <h1 className="uppercase p-4 font-bold text-lg">Filter</h1>
                                <div className="m-2">
                                    <p className="font-bold">Price Range</p>
                                    <input type="range" min="200" max="3000"></input>
                                </div>
                                <div className="m-2">
                                    <p className="font-bold">Customer Ratings</p>
                                    <input type="checkbox" className="inline-block" />
                                    <label className="ml-3 ">4 & above</label><br></br>
                                    <input type="checkbox" />
                                    <label className="ml-3 ">3 & above</label><br></br>
                                </div>
                                <div className="m-2">
                                    <p className="font-bold">Discount</p>
                                    <input type="checkbox" className="inline-block" />
                                    <label className="ml-3 ">30%</label><br></br>
                                    <input type="checkbox" />
                                    <label className="ml-3 ">40%</label><br></br>
                                    <input type="checkbox" />
                                    <label className="ml-3 ">50%</label><br></br>
                                </div>
                                <div className="m-2">
                                    <p className="font-bold">Brand</p>
                                    <input type="checkbox" className="inline-block" />
                                    <label className="ml-3 ">Puma</label><br></br>
                                    <input type="checkbox" />
                                    <label className="ml-3 ">Nike</label><br></br>
                                    <input type="checkbox" />
                                    <label className="ml-3 ">Adidas</label><br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-800 fixed bottom-0 right-0 left-0'>
            <span className='text-white flex justify-center'>&#169; 2023 ROTS; All rights reserved</span>
            </div>
        </>
    )
}