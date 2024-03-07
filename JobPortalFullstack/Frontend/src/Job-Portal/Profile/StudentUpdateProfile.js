import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import useScreenSize from '../SizeHook';


function StudentUpdateProfile() {
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState()
const screenSize = useScreenSize();


  const [image, setimage] = useState()

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [Aadhar, setAadhar] = useState("")
  const [panCard, setpanCard] = useState("")
  const [NoticePeriod, setNoticePeriod] = useState("")
  const [ExpectedSalary, setExpectedSalary] = useState("")
  const [currentCTC, setcurrentCTC] = useState("")
  const [age, setage] = useState("")
  const [Qualification, setQualification] = useState("")
  const [Skills, setSkills] = useState("")
  const [Experiance, setExperiance] = useState("")
  const [loader, setLoader] = useState(false)

  let navigate = useNavigate()

  let studId = JSON.parse(localStorage.getItem("StudId"))

  const [topMessage, settopMessage] = useState("")

  async function getUser() {

    await axios.get(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/getProfile/${studId}`)
      .then((res) => {
        let result = res.data.result
        if (result) {
          setname(result.name)
          setemail(result.email)
          setimage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setNoticePeriod(result.NoticePeriod)
          setExpectedSalary(result.ExpectedSalary)
          setcurrentCTC(result.currentCTC)
          setQualification(result.Qualification)
          setSkills(result.Skills)
          setExperiance(result.Experiance)
          setage(result.age)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])


  // ...............upload Image.....................
   async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)
    
    // console.log(formdata)
    await axios.put(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/uploadImage/${studId}`, formdata)
      .then((res) => {
    window.location.reload()


      }).catch((err) => {
      })
  }
  async function saveUpdate(e) {
    // e.preventDefault()
    await axios.put(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/updatProfile/${studId}`, { name, email, phoneNumber, Aadhar, panCard, NoticePeriod, ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance })
      .then( async (res) => {
        let result = res.data
        if (result == "success") {
          
          settopMessage("Success! Profile updated successfully")
        } else if (result == "feilds are missing") {
          settopMessage("Alert!..name, emailAddress, NoticePeriod, phoneNumber, Qualification, Skills and Experiance should not be empty")
        }
        
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function prevewImage(e) {
    setLoader(true)
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    setimage(compressedFile)
    setLoader(false)

  } catch (error) {
  }
  }
async function deletePic(){
  await axios.put(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/deleteImage/${studId}`,{image})
  .then((res) => {
    window.location.reload()
  }).catch((err)=>{
    alert("server issue occured")
  })
}

const AadharhandleChange = (event) => {
  const value = event.target.value;
  const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
  setAadhar(sanitizedValue);
 };
 
const PanCardhandleChange = (event) => {
  const value = event.target.value;
  const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
  setpanCard(sanitizedValue);
 };

 
window.addEventListener('keypress', function(event){
    
  // Get the key code
  let keycode = event.which || event.keyCode;
  
  // Check if key pressed is a special character
  if(keycode < 32 || 
   (keycode > 32 && keycode < 44) || 
   (keycode > 44 && keycode < 46) || 
   (keycode > 46 && keycode < 48) || 
   (keycode > 57 && keycode < 64) || 
   (keycode > 90 && keycode < 97) ||
   keycode > 122
  ){
      // Restrict the special characters
      event.preventDefault();  
      // alert("special characters are not allowed")
      return false;
  }
}); 


  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper}>
          <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profile</h3>
          <div className={styles.imageViewWrapper}>

          <img className={styles.imageView} src={image?image :profileDp} />
            <img className={styles.fileView} src={file} />

            <div className={styles.addfileDiconwrapper}>
          <input className={`${styles.addfile} ${styles.addfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage}/>
          <div className={styles.loader}> { loader?<TailSpin height={"40px"}/> : ""} </div>
         
          {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}      
          </div>

          </div>
          <div className={styles.saveDelete}>
          {file?<button className={styles.saveImage} onClick={uploadImage}>Save</button>:""}
         {image?<button className={styles.DeleteImage} onClick={deletePic}>Delete</button>:""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
          {screenSize.width>850?

          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Name:</h4>
              <input maxLength="22" className={styles.input} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Email Address:</h4>
              <input maxLength="25" className={styles.input} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Age:</h4>
              <input maxLength="3" className={styles.input} value={age} onChange={(e) => { setage(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Phone number:</h4>
              <input maxLength="15" className={styles.input} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Aadhaar number:</h4>
              <input maxLength="16" className={styles.input} value={Aadhar} onChange={(e) => {AadharhandleChange(e)}} type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Pan Card Number:</h4>
              <input maxLength="16" className={styles.input} value={panCard} onChange={(e) => {PanCardhandleChange(e)} } type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Notice Period in days: </h4>
              <input maxLength="7" className={styles.input} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Expected Salary:</h4>
              <input maxLength="5" className={styles.input} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Current CTC:</h4>
              <input maxLength="5" className={styles.input} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Qualification:</h4>
              <input maxLength="12" className={styles.input} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Skills:</h4>
              <input maxLength="100" className={styles.input} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Experience:</h4>
              <input maxLength="5" className={styles.input} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
            </label>

            <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button>

          </div>
          :
          <>
                   
<label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Name:</h4>
              <input maxLength="20" className={styles.Mobileinput} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Email Address:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Age:</h4>
              <input maxLength="3" className={styles.Mobileinput} value={age} onChange={(e) => { setage(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Phone number:</h4>
              <input maxLength="15" className={styles.Mobileinput} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Aadhaar number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Pan Card Number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Notice Period in days: </h4>
              <input maxLength="10" className={styles.Mobileinput} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Expected Salary:</h4>
              <input maxLength="5" className={styles.Mobileinput} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Current CTC:</h4>
              <input  maxLength="15" className={styles.Mobileinput} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Qualification:</h4>
              <input maxLength="10" className={styles.Mobileinput} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Skills:</h4>
              <input maxLength="100" className={styles.Mobileinput} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Experience:</h4>
              <input maxLength="5" className={styles.Mobileinput} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
            </label>

            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>

          </>
        
}
        </div>

      </div>

    </>
  )
}
export default StudentUpdateProfile