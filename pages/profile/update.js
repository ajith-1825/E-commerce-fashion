import Link from "next/link"
import React,{useState} from "react"
import {useAuth} from "../context/AuthContext"
import Router from 'next/router';
import 'firebase/firestore'
import firebase from "firebase";
export default function Login(){

    const {signup,currentUser} = useAuth();
    const [currval,setVal] = useState({
        uname:"",
        fname:"",
        lname:"",
        phone:"",
        Email:"",
        pass:"",
    });
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)

    const handleChange = event =>{
        console.log(event.target.name);
        setVal({ ...currval, [event.target.name]: event.target.value });
      };

    if(!currentUser)
      Router.push("/profile")
    async function handleSubmit(event){
        event.preventDefault()
        console.log(currval);

        try{
            firebase
            .firestore()
            .collection('details')
            .doc(currentUser.email)
            .update({
                username: currval.uname,
                firstname: currval.fname,
                lastname: currval.lname,
                phone: currval.phone
            })
            .then(alert("Successfully updated"))
            Router.push('/profile')
        }catch(error){
            console.log(error);
            alert(error)
        }
    }
    return(
        <div className="h-screen bg-gray-200 ">
        <div className='flex justify-end md:justify-end'>
                    <Link href='/' className='m-4 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 hover:border-black text-white font-semibold'>Home</Link>
                </div>
            <div className="flex justify-center items-center">

<div class="w-full max-w-lg h-fit">
    <form class="bg-gray-800 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
    {error}
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">Username</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="uname" type="text" placeholder="Username" value={currval.uname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="fname">First Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" name="fname" type="text" placeholder="First Name" value={currval.fname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="lname">Last Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" name="lname" type="text" placeholder="Last Name" value={currval.lname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="Phone">Phone Number</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Phone" name="phone" type="number" placeholder="Number" value={currval.phone} onChange={handleChange}/>
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-primary hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" disabled={loading} onClick={handleSubmit}>Update</button>
        </div>
    </form>
</div>
</div>
        </div>
    )
}