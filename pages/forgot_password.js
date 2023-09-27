import Link from "next/link"
import React,{useState} from "react";
import {useAuth} from "./context/AuthContext"
import Router from 'next/router';
export default function ForgotPassword(){

    const {resetPassword} = useAuth();

    const [currval,setVal] = useState({
        Email:"",
    });
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")

    const handleChange = event =>{
        console.log(event.target.name);
        setVal({ ...currval, [event.target.name]: event.target.value });
      };

      async function handleSubmit(event){
        event.preventDefault()
        //console.log(currval);

        try{
            setMessage('')
            setError('');
            setLoading(true)
            await resetPassword(email)
            setMessage("Check your inbox for further messages")
        } catch{
            setError("Failed to Reset")
            setLoading(false)
        }
    }
    return(
        <div className=" bg-gray-200 ">
        <div className='flex md:justify-end'>
                    <Link href='/' className='m-4 border-primary border-2 rounded-2xl px-3 bg-primary hover:bg-red-500 hover:border-black text-white font-semibold'>Home</Link>
                </div>
            <div className="flex justify-center items-center">

<div class="w-full max-w-lg flex items-center justify-center h-screen m-0">
    <form class="bg-gray-800 shadow-md rounded-xl px-8 pt-6 pb-8  w-full">
    <h1  class="block text-primary text-lg font-bold mb-2">Password Reset</h1>
    {error}
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" name="Email" type="email" placeholder="Email" value={currval.Email} onChange={handleChange}/>
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-primary hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" disabled={loading} onClick={handleSubmit}>Reset Password</button>
            <Link class="inline-block align-baseline font-bold text-sm text-primary hover:text-white" href="/login">Back to Login</Link>
        </div>
    </form>
</div>
</div>
        </div>
    )
}