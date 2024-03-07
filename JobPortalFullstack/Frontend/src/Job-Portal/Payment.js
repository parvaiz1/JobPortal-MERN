import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";




function Payment() {
    let navigate = useNavigate()
    let params=useParams()
    // let profleId = params.id
    const location=useLocation()


       async function PhonePepaymentButton(amount){
        await axios.post("http://localhost:8080/paymentAPI/phonePayPayment",{amount})
        .then((res)=>{
            console.log(res.data)
            window.location.href=res.data
        })
        .catch((err)=>{
            console.log("backend error is ",err)
        })
        }
    
  return (
    <>
    <h2>welcome to payment page</h2>
    <button onClick={()=>{PhonePepaymentButton(100)}}>PAY 100rs by PhonePay</button>
    
    </>
  )
}

export default Payment
