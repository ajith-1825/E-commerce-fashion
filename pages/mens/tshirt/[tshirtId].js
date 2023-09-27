import { useRouter } from 'next/router'
import { use, useEffect,useState} from 'react';
import Data from "../../data.json"
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import firebase from "firebase";

export default function Tshirt() {
    const router = useRouter()
    const id = router.asPath.charAt(13);
    //console.log(router);
    const [hide,setHide] = useState(false)
    const {currentUser,logout} = useAuth();
    const [user,setUser] = useState('')
    const [error, setError] = useState('');
    const [quantity,setQuantity] = useState(1);
    const [productsize,setSize] = useState('');
    const [final_price,setPrice] = useState(0);
    const [currval,setVal] = useState({
        quantity:'',
        productsize:'',
    });
    const result = Data.filter(findData);

    function findData(d) {
        return d.tshirtId == id;
    }

    console.log(result);
    async function handleLogout() {
        setError('');

        try {
            await logout();
            router.push("/mens/tshirt")
        } catch {
            setError('Failed to logout')
        }
    }
    
    const handleChange = event =>{
        setVal({ ...currval, [event.target.name]: event.target.value });
        console.log(event.target.value);
        console.log(currval.quantity * result[0].price);
        setPrice(currval.quantity* result[0].price);
      };

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

    async function addCart(event){
        if(currentUser){
            
            console.log(currval);
        console.log("Final Price:"+final_price);
        try{
            const docRef=firebase.firestore().collection('cart').doc(user.email);
            console.log(docRef.get());
            const doc = await docRef.get();
            var val = doc.data['list'];
            console.log(val);
            docRef.update({
                    itemId: firebase.firestore.FieldValue.arrayUnion(result[0].tshirtId),
                    itemName: firebase.firestore.FieldValue.arrayUnion(result[0].productName),
                    quantity: firebase.firestore.FieldValue.arrayUnion(currval.quantity),
                    size: firebase.firestore.FieldValue.arrayUnion(currval.productsize),
                    price: firebase.firestore.FieldValue.arrayUnion(final_price),
            })
            .then(alert("Cart added"))
            router.push("/profile/wishlist")
        }catch(error){
            console.log(error);
            alert(error)
        }
        }
        if(!currentUser)
            alert("Login in to continue")
    }
    return (
        <>
            {error}
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
                    <div className="bg-gray-200 md:col-span-5 h-full mb-10">
                        <img src={`${result[0].image}`} alt={`${result[0].description}`} className="inline-block"></img>
                        <div className='inline-block align-top'>
                            <h1 className="uppercase p-4 font-bold text-xl">{result[0].productName}</h1>
                            <h2 className='p-4 text-lg'>&#8377;{result[0].price}</h2>
                            <label for="quantity" className='p-4'>Quanity:</label>
                            <select name="quantity" id="quantity" onChange={handleChange}>
                                <option value="" disabled selected>Select your option</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <br/><br/>
                            <label for="quantity" className='p-4'>Size:</label>
                            <select name="productsize" id="productsize" onChange={handleChange}>
                                <option value="" disabled selected>Select your option</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <br/><br/>
                            <button className='bg-primary text-white p-3 font-bold ml-4 rounded-xl' onClick={addCart}>Add to Cart</button>
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

export async function getStaticPaths() {
    // const {params}=context
    // const resp = await fetch(`../../data/${params.tshirtId}`)
    // const data = await resp.json()
    // console.log(data);
    // const paths = data.map(post=>{
    //     return {
    //         params:{
    //             postId:`${post.id}`
    //         }
    //     }
    // })
    return {
        paths: [
            {
                params: { tshirtId: '1' }
            }
        ],
        //paths:paths,
        fallback: true
    }
}
export function getStaticProps(context) {
    console.log(context);
    const { params } = context
    console.log(params.tshirtId);
    // const resp =  fetch(`http://localhost:3000/data.json/${params.tshirtId}`)
    // console.log(resp);
    // // const data = await resp.json()
    // // console.log(data);
    // // if(!data.id){
    // //     return{
    // //         notFound: true,
    // //     }
    // // }
    return {
        props: {
            product: ''
        },
        revalidate: 10,
    }
}