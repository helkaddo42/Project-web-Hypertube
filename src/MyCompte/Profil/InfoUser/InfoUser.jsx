import React ,{useState,useEffect}from 'react'
import {Form,Input,Button } from 'muicss/react'
import { toast} from 'react-toastify';
import './infoUser.css'
import axios from 'axios'
toast.configure();

function InfoUser() {
    const FIREBASE_API_KEY = 'AIzaSyCO-8B9Zx0Mdwpa7oyA6QWgD5m7bXdNGs4'

        const [uid, setUid] = useState('')
        const [idToken, setIdToken] = useState('')
        const [login, setLogin] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')

        useEffect(() => {

            setUid(localStorage.getItem('localId'))
            setIdToken(localStorage.getItem('idToken'))
            axios.get(`https://hypertube-6cd18.firebaseio.com/${localStorage.getItem('localId')}/users.json`)
            .then(response =>{
                if(response.data){
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setLogin(response.data.login);
                    setEmail(response.data.email)
                }else{
                    console.log('pas de donner')
                }
              
            })
        }, [])

        const handleSubmit =e=>{
            e.preventDefault()
                const Infos = {email, login, firstName, lastName}
                const authData = {idToken, email, returnSecureToken: true};

                axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,authData)
                .then(response=>{
                    
                    axios.put(`https://hypertube-6cd18.firebaseio.com/${uid}/users.json`,Infos).then(response=>{
                    toast.success(`${login}, vos informations ont été prise en compte `, {position: "top-center", autoClose: 3000, hideProgressBar: false,closeOnClick: true,pauseOnHover: false,progress: undefined})})
                    
                }).catch(err =>{
                    console.log('error =',err.message)
                        toast.error(`Pour réactualiser vos informations, veuillez vous reconnectez`, {position: "top-center", autoClose: 4000, hideProgressBar: false,closeOnClick: true,pauseOnHover: false,progress: undefined});
            })
        }

    return (
        <div className='blockInfos' >
            <div className='title'>
                <h4 style={{color:'white',fontFamily: 'Lexend Peta',fontSize:'22px'}}> Infos utilisateurs </h4>
            </div>
            <div className='contentForm' onSubmit={handleSubmit}>
                <Form>
                    <Input label="Login" minLength="3" maxLength="30" pattern="[A-Za-z]{1,30}" value={login} onChange={e=>setLogin(e.target.value)}  floatingLabel={true} required={true} />
                    <Input label="Nom" minLength="3" maxLength="30" pattern="[A-Za-z]{1,30}" value={firstName || ''} onChange={e=>setFirstName(e.target.value)}  floatingLabel={true} required={true} />
                    <Input label="Prénom" minLength="3" maxLength="30" pattern="[A-Za-z]{1,30}" value={lastName || ''} onChange={e=>setLastName(e.target.value)} floatingLabel={true} required={true} />
                    <Input label="Adresse Email" minLength="3" maxLength="30"  value={email} onChange={e=>setEmail(e.target.value)}  floatingLabel={true} required={true} />
                    <Button variant="raised">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default InfoUser