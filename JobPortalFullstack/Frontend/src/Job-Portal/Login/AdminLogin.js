import React from 'react'
import styles from "./login.module.css"
import { useState , useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'


function Admin() {
  const [email, setEmail ] = useState("")
  const [ password , setPassword ] = useState("")
  const [ Error , setError ] = useState("")
  let navigate = useNavigate()
  const [ showPassword , setshowPassword ] = useState(false)

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  })
  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
    if(adminLogin){
      navigate("/BIAddmin@Profile")
    }
  },[])
  
  async function Adminlogin(){
    await axios.post("http://localhost:8080/admin/adminLogin",{email, password})
    .then((res)=>{
      let result = res.data
      console.log(result)
      if(result.status=="success"){
        localStorage.setItem("AdMLog", JSON.stringify(result.token))
        navigate("/BIAddmin@Profile")
      }else if(result=="no user found"){
        setError("No user found")
      }else if(result=="incorrect password"){
        setError("incorrect password")
      }
      
    }).catch((err)=>{
        alert("some thing went wrong")
    })

  }
  
  async function AdminRegister(){
    await axios.post("http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/admin/adminRegister",{email, password})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
    <h3 id={styles.Loginpage}>Admin Login Page</h3>
    <div id={styles.inputWrapper}>
        <div  style={{marginTop:"90px", marginLeft:"43%" }}>
        <p style={{color:"red", fontStyle:"italic"}}>{Error}</p>

          <input className={styles.inputs} type="mail" placeholder='enter email id'
            value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} />
           <input className={styles.inputs} type={showPassword?"tex":"password"} placeholder='enter password'
           value={password} onChange={(e) => { setPassword(e.target.value) }} />


<label> <input  type="checkbox" value={showPassword} onClick={()=>{setshowPassword((prev)=>!prev)}}/><span>show password</span></label>
     

          <button className={`${styles.button} ${styles.inputs}`} onClick={Adminlogin}>Login</button>
          {/* <button className={`${styles.button} ${styles.inputs}`} onClick={AdminRegister}>Register</button> */}
        </div>
      </div>
    </>
  )
}

export default Admin