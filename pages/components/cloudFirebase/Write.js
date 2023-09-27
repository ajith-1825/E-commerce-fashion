import firebase from "firebase";
import 'firebase/firestore'
import {useAuth} from "../../context/AuthContext"

export default function WriteToCloud(){

    const {currentUser} = useAuth();

    const sendData = () =>{
        try{
            firebase
            .firestore()
            .collection('myCollection')
            .doc('my_document')
            .set({
                username: 'kdjdkwkj',
                firstname: 'djkjk',
                lastname: 'dkkjskjs',
                phone: 889989898,
                email: 'djkjdk@gmail.com'
            })
            .then(alert("Data was successfully send to cloud"))
        }catch(error){
            console.log(error);
            alert(error)
        }
    }
    return(
        <>
            <button onClick={sendData}>Click</button>
        </>
    )
}