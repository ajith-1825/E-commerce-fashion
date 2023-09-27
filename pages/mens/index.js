import { eventNames } from "process";
import React,{useState,useEffect} from "react"
import {BsFillCaretLeftFill,BsFillCaretRightFill} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'
import Data from "../data.json"
import Searchbar from "../searchbar";
import Link from "next/link";
import slides from "../slides_men.json"
import {useAuth} from "../context/AuthContext"
//import Router from 'next/router';
import 'firebase/firestore'
import firebase from "firebase";
export default function Mens(){

    const [error,setError] = useState('');
    const [user,setUser] = useState('');
    const [hide,setHide] =useState(false)
    const {currentUser,logout} = useAuth();


        async function handleLogout(){
            setError('');

            try{
                await logout();
            } catch{
                setError('Failed to logout')
            }
        }

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
      const show = event => {
        const x=document.getElementById("left");
        const y=document.getElementById("right");
        if(x.classList.contains('hidden')){
            console.log(x.classList);
            x.classList.remove('hidden');
        }
        else{
            x.classList.add('hidden')
        }
        if(y.classList.contains('hidden')){
            console.log(y.classList);
            y.classList.remove('hidden');
        }
        else{
            y.classList.add('hidden')
        }
      };
      const [currentState, setCurrentState] = useState(0);
      
      const prevSlide = () => {
        const isFirstSlide = currentState === 0;
        const newSlide = isFirstSlide? slides.length -1 : currentState-1;
        setCurrentState(newSlide);
        return () => clearInterval(intervalId);
      };
      const nextSlide = () => {
        const isLastSlide = currentState=== slides.length-1;
        const newSlide = isLastSlide? 0 : currentState+1;
        setCurrentState(newSlide);
        return () => clearInterval(intervalId);
      };
      const gotToSlide = (slideIndex) => {
        setCurrentState(slideIndex);
      };
      var i =0;
      useEffect(() => {
        const intervalId = setInterval(() => {
            i = (i+1)%slides.length;
            setCurrentState(i)
        }, 5000)
        
        return () => clearInterval(intervalId);
    }, [])

    useEffect(()=>{
        if(!currentUser){
            console.log("No current user");
            setHide(false)
        }
        else{
            setHide(true)
            //console.log("USer:",currentUser.email);
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
    })

    const hClick = (event) =>{
        const id = event.target.getAttribute("id");
        console.log(id);
      };
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
                <div className="bg-gray-200 md:col-span-5 h-full">
                {!hide && (
                    <div className='flex justify-center md:justify-end' id='b_log'>
                        <Link href='/login' className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Login</Link>
                        <Link href='/signup' className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Signup</Link>
                    </div>
                )
                }
                {hide && (
                    <div className='flex justify-center md:justify-end'>
                        <p className='m-2 p-5 border-2 bg-primary rounded-2xl hover:bg-primary text-white font-semibold py-1'>Welcome {user.firstname}</p>
                        <button onClick={handleLogout} className='m-2 border-primary border-2 rounded-2xl px-3 bg-gray-200 hover:bg-primary text-primary hover:text-white font-semibold py-1'>Logout</button>
                    </div>
                )
                }
                    <Searchbar placeholder={"Search."} data={Data}/>
                
                    <div className="sm:h-[300px] md:h-[500px] w-full m-auto px-4 py-10 relative group">
                        <div style={{backgroundImage: `url(${slides[currentState].url})`}} 
                        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"  onMouseOver={show}>
                        </div>
                    </div>  
                    <div id="left" className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] sm:mt-28 md:mt-10 ml-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsFillCaretLeftFill onClick={prevSlide} size={30} />
                    </div>
                    <div id="right" className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] sm:mt-28 md:mt-10 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsFillCaretRightFill onClick={nextSlide} size={30} />
                    </div>
                    <div className="flex justify-center">
                        {slides.map((slide, slideIndex) =>(
                            <div className="text-2xl cursor-pointer">
                                <RxDotFilled onClick={() => gotToSlide(slideIndex)}/>
                            </div>
                        ))}
                    </div>
                    <div className='grid md:grid-cols-3 m-10 justify-center'>
                    <Link href='/mens/tshirt' value="">
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/mens_shirt.jpeg" alt="Mens Page"/>
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16"><button id="1" onClick={hClick}>T-shirts</button></div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/mens/shirt'>
                    <div className="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img className="w-3/4 h-64 rounded-full flex justify-start" src="/shirt.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2 text-center pr-16">Shirts</div>
                        </div>
                    </div>
                    </Link>
                    <Link href="/mens/jeans">
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/jeans.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Jeans</div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/mens/trousers'>
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/trousers.jpeg" alt="Mens Page"/>
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Trousers</div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/mens/innerwear'>
                    <div className="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img className="w-3/4 h-64 rounded-full flex justify-start" src="/innerwear.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2 text-center pr-16">Innerwear</div>
                        </div>
                    </div>
                    </Link>
                    <Link href="/mens/shoes">
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/shoes.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Shoes</div>
                        </div>
                    </div>
                    </Link>
                    </div>
                </div>
            </div>
            <div className='bg-gray-800 fixed bottom-0 right-0 left-0'>
            <span className='text-white flex justify-center'>&#169; 2023 ROTS; All rights reserved</span>
            </div>
        </>
    )
}