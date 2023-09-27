import Link from "next/link"
import React,{useEffect, useState} from "react"
import {useAuth} from "./context/AuthContext"
import {useRouter} from 'next/router';
import 'firebase/firestore'
import firebase from "firebase";
export default function Login(){

    const router = useRouter();
    const {signup,currentUser} = useAuth();
    useEffect(()=>{
        if(currentUser)
            router.push("/");
    },[router]);
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

    async function handleSubmit(event){
        const docRef=firebase.firestore().collection('cart').doc(currval.Email);
            console.log(docRef.get());
            const doc = await docRef.get();
            var val = doc.data['list'];
            console.log(val);
            docRef.set({
                    itemId: 0,
                    itemName: 0,
                    quantity: 0,
                    size: 0,    
                    price: 0,
            })

        event.preventDefault()
        console.log(currval);

        try{
            setError('');
            setLoading(true)
        await signup(currval.uname,currval.fname,currval.lname,currval.phone,currval.Email,currval.pass)
        try{
            firebase
            .firestore()
            .collection('details')
            .doc(currval.Email)
            .set({
                username: currval.uname,
                firstname: currval.fname,
                lastname: currval.lname,
                phone: currval.phone,
                email: currval.Email
            })
            .then(alert("Signup Successful"))
        }catch(error){
            console.log(error);
            alert(error)
        }
        router.push('/')
        } catch{
            setError("Failed to create account")
            setLoading(false)
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
            <label className="block text-white text-sm font-bold mb-2" for="username">Username</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="uname" type="text" placeholder="Username" value={currval.uname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label className="block text-white text-sm font-bold mb-2" for="fname">First Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" name="fname" type="text" placeholder="First Name" value={currval.fname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label className="block text-white text-sm font-bold mb-2" for="lname">Last Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lname" name="lname" type="text" placeholder="Last Name" value={currval.lname} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label className="block text-white text-sm font-bold mb-2" for="Phone">Phone Number</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Phone" name="phone" type="number" placeholder="Number" value={currval.phone} onChange={handleChange}/>
        </div>
        <div class="mb-4">
            <label className="block text-white text-sm font-bold mb-2" for="Email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" name="Email" type="email" placeholder="Mail" value={currval.Email} onChange={handleChange}/>
        </div>
        <div class="mb-6">
            <label className="block text-white text-sm font-bold mb-2" for="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="pass" name="pass" type="password" placeholder="Password" value={currval.pass} onChange={handleChange}/>
        </div>
        <div class="flex items-center justify-between">
            <button className="bg-primary hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" disabled={loading} onClick={handleSubmit}>Sign Up</button>
            <Link class="inline-block align-baseline font-bold text-sm text-primary hover:text-red-500" href="/login">Already Signed Up?</Link>
        </div>
    </form>
</div>
</div>
        </div>
    )
}