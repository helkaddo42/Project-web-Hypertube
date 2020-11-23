import React from 'react'
import axios from 'axios'
import './deleteAccount.css'
import Button from 'react-bootstrap/Button'
import { toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 

toast.configure();

function DeleteAccount() {

    const FIREBASE_API_KEY = 'AIzaSyCO-8B9Zx0Mdwpa7oyA6QWgD5m7bXdNGs4'

    const submit =()=>{

        const token = {"idToken" : localStorage.getItem('idToken')}
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FIREBASE_API_KEY}`,token)
        .then(res=>{
            toast.dark(`Bonne continuation :-(`, {position: "top-right",transition:Flip, autoClose: 3000, hideProgressBar: false,closeOnClick: true,pauseOnHover: false,progress: undefined});
            localStorage.clear()
            setTimeout(() => {
                window.location.reload()
            }, 2500);
            
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='DeleteAccount'>
            <div className='btnDelete'>
                <Button onClick={submit} variant="danger">Delete account</Button>
            </div>
        </div>
    )
}

export default DeleteAccount
