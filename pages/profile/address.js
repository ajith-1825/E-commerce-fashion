import Head from 'next/head'
import React,{ useRef,useEffect,useState } from 'react';
import {useAuth} from "../context/AuthContext"
import Router from 'next/router';
import 'firebase/firestore'
import firebase from "firebase";
import { useRouter } from 'next/router';
function welcomePage(){

    const router = useRouter();

    const {currentUser,logout} = useAuth();
    const [loading,setLoading] = useState(false)

    const [hide,setHide] = useState('')
    const [error,setError] = useState('');
    const [user,setUser] = useState('');
    const [currval,setVal] = useState({
        address:"",
        pincode:"",
        city:""
    });

    const handleChange = event =>{
        console.log(event.target.name);
        setVal({ ...currval, [event.target.name]: event.target.value });
      };

    async function handleSubmit(event){
        event.preventDefault()
        console.log(currentUser.email);

        try{
            firebase
            .firestore()
            .collection('details')
            .doc(currentUser.email)
            .update({
                address: currval.address,
                pincode: currval.pincode,
                city: currval.city
            })
            .then(alert("Successfully added address"))
            Router.push("/profile")
        }catch(error){
            console.log(error);
            alert(error)
        }
    }

    async function handleLogout(){
        setError('');

        try{
            await logout();
            Router.push('/')
        } catch{
            setError('Failed to logout')
        }
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
        const getLocation = event =>{
            var x;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
              }
        };
        function showPosition(position) {
            var x;
            x = "Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude;
            console.log(x);
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
                        <div className='col-span-4 bg-white pl-10 mr-2'>{
                            !hide &&
                            <div>
                                <h1 className="text-xl font-bold mt-7">Manage Address</h1>
                                <div className='mt-3'>
                                <label for="address" className='align-top inline-block w-28'>Address:</label>
                                <textarea rows='10' cols='50' placeholder='Write your address here' id="address" className='border-black bg-gray-200 ml-3' name="address" value={currval.address} onChange={handleChange}></textarea>
                                </div>
                                <div className='my-3'>
                                    <label className='inline-block w-28'>Pincode:</label>
                                    <input type="text" pattern="[0-9]{6}" maxLength="6" className="bg-gray-200 ml-3" name="pincode" value={currval.pincode} onChange={handleChange}></input>
                                </div>
                                <div className='my-3'>
                                    <label className='inline-block w-28'>City/Town:</label>
                                    <input type="text" className="bg-gray-200 ml-3" name="city" value={currval.city} onChange={handleChange}></input>
                                </div>
                                <button type="submit" className='bg-primary text-white px-3 rounded-2xl inline-block my-2' onClick={handleSubmit}>Add</button>
                                {/* <div className='bg-primary text-white w-1/5 my-3 rounded-xl px-2 cursor-pointer' disabled={loading} onClick={getLocation}>
                                    Use Current Location
                                </div> */}
                            </div>
                        }
                        {
                            hide &&
                            <div>
                                <h1 className="text-xl font-bold mt-7">OOPS!! LOGIN TO CONTINUE</h1>
                            </div>
                        }
                        {
                            !hide&&
                            <div className='bg-primary mr-5 mb-5'>
                                <h1 className='text-white font-bold pl-3'>Current Address:<p>{user.address}</p><br></br></h1>
                                <h1 className='text-white font-bold pl-3'>Pincode : <p>{user.pincode}</p><br></br></h1>
                                <h1 className='text-white font-bold pl-3'>City/Town: <p>{user.city}</p><br></br></h1>
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
                                <div className='w-full hover:bg-gray-100 pt-3 pl-3 pb-3 hover:text-primary'>
                                    <a href="/profile">
                                    Personal Information
                                    </a>
                                </div>
                                <div className='w-full pt-3 pl-3 pb-3 bg-gray-100 text-primary font-bold'>
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
                            <div className='w-full'>
                            { !hide&&
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