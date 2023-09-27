import React,{useState,useEffect} from "react"
import {BsFillCaretLeftFill,BsFillCaretRightFill} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'
import Link from "next/link";
import slides from "../slides.json"
export default function Mens(){
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
                    <li><Link href='/contact' className="flex justify-center p-3 md:justify-start">Contact</Link></li>
                    <li><Link href='/profile' className="flex justify-center p-3 md:justify-start">Profile</Link></li>
                </ul>
                </div>
                <div className="bg-gray-200 md:col-span-5 h-full">
                    <div className='flex justify-center md:justify-end'>
                        <Link href='/login' className='m-2 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 text-white font-semibold'>Login</Link>
                        <Link href='/signup' className='m-2 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 text-white font-semibold'>Signup</Link>
                    </div>
                    <form className='w-full my-5 flex justify-center'>   
                        <div className="relative w-3/4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-red-500 dark:focus:ring-red-800">Search</button>
                        </div>
                    </form>
                
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
                    <Link href='/mens'>
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/mens_shirt.jpeg" alt="Mens Page"/>
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Tops</div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/womens'>
                    <div className="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img className="w-3/4 h-64 rounded-full flex justify-start" src="/womens.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2 text-center pr-16">Shirts</div>
                        </div>
                    </div>
                    </Link>
                    <Link href="/child">
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/mens.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Jeans</div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/mens'>
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/mens_shirt.jpeg" alt="Mens Page"/>
                        <div class="py-4">
                            <div class="font-bold text-xl text-center pr-16">Trousers</div>
                        </div>
                    </div>
                    </Link>
                    <Link href='/womens'>
                    <div className="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img className="w-3/4 h-64 rounded-full flex justify-start" src="/womens.jpeg" alt="Mens Page" />
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2 text-center pr-16">Innerwear</div>
                        </div>
                    </div>
                    </Link>
                    <Link href="/child">
                    <div class="w-5/6 shadow-g grid col-span-2 object-center m-auto">
                        <img class="w-3/4 h-64 rounded-full flex justify-start" src="/mens.jpeg" alt="Mens Page" />
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