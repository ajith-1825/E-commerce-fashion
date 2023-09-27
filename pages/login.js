import Link from "next/link"
import React,{useState} from "react";
import {useAuth} from "./context/AuthContext"
import Router from 'next/router';
export default function Login(){

    const {login,currentUser} = useAuth();

    const [currval,setVal] = useState({
        Email:"",
        pass:"",
    });
    {currentUser}

    if(currentUser)
        Router.push("/")
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)

    const handleChange = event =>{
        console.log(event.target.name);
        setVal({ ...currval, [event.target.name]: event.target.value });
      };

      async function handleSubmit(event){
        event.preventDefault()
        console.log(currval);

        try{
            setError('');
            setLoading(true)
        await login(currval.Email,currval.pass)
        Router.push('/')
        } catch{
            setError("Failed to sign in")
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
    {error}
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" name="Email" type="email" placeholder="Email" value={currval.Email} onChange={handleChange}/>
        </div>
        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="pass" name="pass"  type="password" placeholder="Password"  value={currval.pass} onChange={handleChange}/>
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-primary hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" disabled={loading} onClick={handleSubmit}>Log In</button>
            <div>
                <Link href="/forgot_password" class="inline-block align-baseline font-bold text-sm text-primary hover:text-white">Forgot Password?</Link>
            </div>
            <Link class="inline-block align-baseline font-bold text-sm text-primary hover:text-white" href="/signup">Not Signed Up?</Link>
        </div>
    </form>
</div>
</div>
        </div>
    )
}