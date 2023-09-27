import Head from 'next/head'
import React,{ useRef,useEffect,useState } from 'react';
import Profile from "../profile.json"
import {useAuth} from "../context/AuthContext"
//import Router from 'next/router';
import 'firebase/firestore'
import firebase from "firebase";
import { useRouter } from 'next/router';

// import imgs from '../styles/mens.jpeg'
//import {useRef, useState} from 'react';
function welcomePage(){

    const router = useRouter();
    const {currentUser,logout} = useAuth();

    const [hide,setHide] = useState('')
    const [error,setError] = useState('');
    const [user,setUser] = useState('');

    async function handleLogout(){
        setError('');

        try{
            await logout();
            router.push('/')
        } catch{
            setError('Failed to logout')
        }
    }
        const nameRef = useRef();
        const handleClick = event => {
            const x=document.getElementById("menu");
            const y=document.getElementById("select");
            if(x.classList.contains('hidden')){
                console.log(x.classList);
                x.classList.remove('hidden');
            }
            else{
                x.classList.add('hidden')
            }
          };

          useEffect(()=>{
            if(!currentUser){
                console.log("No current user");
                setHide(true)
            }
            else{
                setHide(false)
                {
                    firebase
                        .firestore()
                        .collection('details')
                        .doc(currentUser.email)
                        .onSnapshot(function (doc){
                            setUser(doc.data())
                            console.log(doc.data().firstname);
                        })
                }
            }
        },[router]);
    return(
        <>
        <Head>
        </Head>
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
                    <li><a href='/' className="flex justify-center p-3 md:justify-start">Home</a></li>
                    <li><a href='#' className="flex justify-center p-3 md:justify-start">About</a></li>
                    <li><a href='/contact' className="flex justify-center p-3 md:justify-start">Contact</a></li>
                    <li><a href='/profile' className="font-bold flex justify-center p-3 md:justify-start">Profile</a></li>
                </ul>
                </div>
                <div className="bg-gray-200 md:col-span-5 h-full">
                    <div className='grid grid-cols-5 m-10'>
                        <div className='col-span-4 bg-white pl-10'>
                        <div className='flex justify-center md:justify-end'>{
                            !hide &&
                            <a href='/profile/update' className='m-2 border-primary border-2 rounded-2xl px-3  hover:bg-primary text-primary hover:text-white font-semibold'>Edit</a>
                        }
                    </div>
                        {!hide &&
                            <div>
                                <h1 className="text-xl font-bold">Profile Info</h1>
                                <p className='inline-block w-32'>Name :</p> <span className='bg-gray-400 inline-block px-10 py-2 rounded-xl my-14'>{user.firstname}</span> <span className='bg-gray-400 inline-block px-10 py-2 rounded-xl '>{user.lastname}</span><br /><br />
                                <p className='inline-block w-32'>Phone Number :</p> <span className='bg-gray-400 inline-block px-10 py-2 rounded-xl mb-14'>{user.phone}</span><br /><br />
                                <p className='inline-block w-32'>Email :</p> <span className='bg-gray-400 inline-block px-10 py-2 rounded-xl mb-14'>{user.email}</span><br /><br />
                            </div>
                        }{
                            hide&&
                            <div>
                                <h1 className="text-xl font-bold mt-7">OOPS!! LOGIN TO CONTINUE</h1>
                            </div>
                        }
                        </div>
                        <div className='col-span-1 bg-white ml-2'>
                            <div className='w-full'>
                                <a href="#"><h1 className="text-xl font-bold mt-7 pl-3 pb-3 hover:text-primary">My Orders</h1></a>
                            </div><hr></hr>
                            <div className='w-full'>
                                <div className='h-1/4'>
                                    <h1 className="text-lg font-bold mt-3 pl-3 pb-3 text-gray-400">Account Information</h1>
                                </div>
                                <div className='w-full bg-gray-100 pt-3 pl-3 pb-3 text-primary font-bold'>
                                    <a href="/profile">
                                    Personal Information
                                    </a>
                                </div>
                                <div className='w-full pt-3 pl-3 pb-3 hover:bg-gray-100 hover:text-primary'>
                                <a href="/profile/address">
                                    Manage Address
                                </a>
                                </div>
                                {/* <div className='w-full pt-3 pl-3 pb-3 hover:bg-gray-100 hover:text-primary'>
                                    PAN Card Information
                                </div> */}
                            </div><hr></hr>
                            <div className='w-full'>
                                <div className='h-1/4'>
                                    <h1 className="text-lg font-bold mt-3 pl-3 pb-3 text-gray-400">My-cart</h1>
                                </div>
                                <a href="/profile/wishlist">
                                <div className='w-full hover:bg-gray-100 hover:text-primary pt-3 pl-3 pb-3'>
                                    Wishlist
                                </div>
                                </a>
                                {/* <div className='w-full pt-3 pl-3 pb-3 hover:bg-gray-100 hover:text-primary'>
                                    My Reviews
                                </div>
                                <div className='w-full pt-3 pl-3 pb-3 hover:bg-gray-100 hover:text-primary'>
                                    My Notifications
                                </div> */}
                            </div><hr></hr>
                            <div className='w-full'>{ !hide&&
                                <button onClick={handleLogout}><h1 className="text-lg font-bold pt-3 pl-3 pb-3 hover:text-primary text-gray-400">Log Out</h1></button>
                            }
                            </div><hr></hr>
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
export default welcomePage