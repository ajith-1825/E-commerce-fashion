import Searchbar from "../../searchbar";
import Data from "../../data.json"
import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"
//import Router from 'next/router';
import { useRouter } from "next/router";
import firebase from "firebase";
export default function Tshirt() {

    const router = useRouter();
    const [error, setError] = useState('');
    const {currentUser,logout} = useAuth();
    const [loading,setLoading] = useState(false)

    const [hide,setHide] = useState('')
    const [user,setUser] = useState('');

    async function handleLogout() {
        setError('');

        try {
            await logout();
        } catch {
            setError('Failed to logout')
        }
    }



    const handleClick = event => {
        const x = document.getElementById("left");
        const y = document.getElementById("select");
        if (x.classList.contains('hidden')) {
            console.log(x.classList);
            x.classList.remove('hidden');
        }
        else {
            x.classList.add('hidden')
        }
    };
    const size = () => {
        const x = document.getElementById("size");
        if (x.classList.contains('hidden')) {
            console.log(x.classList);
            x.classList.remove('hidden');
        }
    };
    const sizerm = () => {
        const x = document.getElementById("size");
        if (x.classList.contains('hidden')) {
            console.log(x.classList);
            x.classList.remove('hidden');
        }
        else {
            x.classList.add('hidden')
        }
    };
    const [price, setPrice] = useState(0);
    const handleInput = (e) => {
        document.getElementById("price").innerHTML = "Price Range: &#8377 " + e.target.value;
        setPrice(e.target.value)
    }
    const [rating, setRating] = useState(0);
    const handleRate = (e) => {
        var id = e.target.id;
        var checkbox = document.getElementById(`${id}`);
        if (e.target.checked) {
            //console.log(e.target.value);
            setRating(e.target.value)
        }
        else {
            setRating(0);
            console.log("Unclicked");
        }
        Data.filter(user => { return user.rating >= parseInt(e.target.value) }).map(user => {
            console.log(user);
        })
    }

    useEffect(()=>{
        if(!currentUser){
            console.log("No current user");
            setHide(true)
        }
        else{
            setHide(false)
            //console.log("User:",currentUser.email);
            {
                firebase
                    .firestore()
                    .collection('details')
                    .doc(currentUser.email)
                    .onSnapshot(function (doc){
                        setUser(doc.data())
                        //console.log(doc.data().firstname)
                    })
            }
        }
    },[router]);
    return (
        <>
            <div className="grid md:grid-cols-6 md:h-screen">
                <div className="md:col-span-1 md:border-r-4 sm:border-b-2 md:border-b-0 bg-primary text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="uppercase p-4 font-bold text-lg">ROTS Website</h1>
                        <div className="px-4 cursor-pointer md:hidden" id="select">
                            <svg className="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleClick} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </div>
                    </div>
                    <ul className="text-sm mt-6 inline sm:justify-start" id="menu">
                        <li><Link href='/' className="font-bold flex justify-center p-3 md:justify-start">Home</Link></li>
                        <li><Link href='#' className="flex justify-center p-3 md:justify-start">About</Link></li>
                        <li><Link href='/contact' className="flex justify-center p-3 md:justify-start">Contact</Link></li>
                        <li><Link href='/profile' className="flex justify-center p-3 md:justify-start">Profile</Link></li>
                    </ul>
                </div>
                <div className="bg-gray-200 md:col-span-5 h-full mb-10">
                    {hide && (
                        <div className='flex justify-center md:justify-end' id='b_log'>
                            <Link href='/login' className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Login</Link>
                            <Link href='/signup' className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Signup</Link>
                        </div>
                    )
                    }
                    {!hide && (
                        <div className='flex justify-center md:justify-end'>
                            <p className='m-2 p-5 border-2 bg-primary rounded-2xl hover:bg-primary text-white font-semibold py-1'>Welcome {user.firstname}</p>
                            <button onClick={handleLogout} className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Logout</button>
                        </div>
                    )
                    }
                    <Searchbar placeholder={"Search.."} data={Data} />
                    <div className="grid grid-cols-4 mr-4">
                        <div className="col-span-3 bg-white ml-3">
                            <h1 className="uppercase p-4 font-bold text-lg">T-shirts Catalouge</h1>
                            <div id="products" className="grid md:grid-cols-4 mb-4">
                                {Data.filter(data => { return data.price > parseInt(price) && data.rating >= parseInt(rating) }).map(data => {
                                    return (
                                        <Link href={`/mens/tshirt/${data.tshirtId}`}>
                                            <div className="sm:col-span-4 md:col-span-2 lg:col-span-1 mx-4 bg-gray-200" key={data.tshirtId}>
                                                <img src={`${data.image}`} alt={`${data.description}`}></img>
                                                <p>{data.description}</p>
                                                <p>Rating:{data.rating}/5</p>
                                                <p>&#8377;{data.price} <del>1000</del></p>
                                                <p className="" id="size">Sizes-S,M,L,XL</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="sm:hidden md:block col-span-1 ml-4">
                            <div className="bg-white">
                                <h1 className="uppercase p-4 font-bold text-lg">Filter</h1>
                                <hr></hr>
                                <div className="m-2">
                                    <p className="font-bold" id="price">Price Range</p>
                                    <input type="range" min="100" max="1000" onInput={handleInput}></input>
                                </div>
                                <hr></hr>
                                <div className="m-2">
                                    <p className="font-bold">Customer Ratings</p>
                                    <input type="checkbox" className="inline-block" id="check_4" onClick={handleRate} value="4" />
                                    <label className="ml-3">4 & above</label><br></br>
                                    <input type="checkbox" id="check_3" onClick={handleRate} value="3" />
                                    <label className="ml-3 ">3 & above</label><br></br>
                                </div>
                                <hr></hr>
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

// export async function getStaticProps(){
//     const resp = await fetch('')
// } 