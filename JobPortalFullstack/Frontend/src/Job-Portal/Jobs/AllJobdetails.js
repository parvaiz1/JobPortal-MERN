import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"




import useScreenSize from '../SizeHook';

function Jobdetails() {
  const [jobs, setJobs] = useState([])
  // console.log("jobs are in ", jobs)
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)

  const [clickedJobId, setclickedJobId] = useState() //for single job loader
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  let empId = JSON.parse(localStorage.getItem("EmpIdG"))



  const navigate = useNavigate()

  let params = useParams();

  async function getjobs() {
    await axios.get(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/jobpost/getjobs/${params.id}`)
      .then((res) => {
        let result = (res.data)
        setJobs(result)
        // console.log("result are in ", result)

        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])
  function showless() {
    navigate(-1)
  }

  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  // .................delete function............
  async function deletejob(deleteid) {
    Swal.fire({
      title: 'Are you sure?',
      // icon: 'warning',
      width:"260",
      // position:"top",
      customClass:{
        popup:"alertIcon"
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/jobpost/deleteProduct/${deleteid}`)
          .then((res) => {
            navigate("/postedjobs")
            // getjobs()
          })
          .catch((err) => { alert("server error occured") })
      }
    })
  }
  
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }


  async function applyforJob(jobId) {

    setclickedJobId(jobId)
    setLoader(true)
    setTimeout(async () => {

      await axios.put(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/jobpost/updatforJobApply/${jobId}`, { jobSeekerId })
        .then((res) => {
          setLoader(false)
          getjobs()

        }).catch((err) => {
          alert("server issue occured", err)
        })
    }, 1000)
  }

  return (
    <>
      {screenSize.width>850 ?

        <>
          <div className={styles.dUiwarpper}>
            <ul className={styles.Hul}>
              <li className={styles.Hli}><b>Company Name</b></li>
              <li className={styles.Hli}><b>Job Title</b></li>
              <li className={styles.Hli}><b>Location</b></li>
              <li className={styles.Hli}><b>Package </b></li>
              <li className={styles.Hli}><b>Experience Required</b></li>
              <li className={styles.Hli}><b>Skills Required</b></li>
              <li className={styles.Hli}><b>Posted Date</b></li>
              <ul className={`${styles.DUIli}`}>
                <li className={`${styles.Dli}`}><b>Job Description:</b></li>
                <li className={`${styles.RDli} `}>
                   {/* {jobs.jobDescription} */}
                 {
                jobdescription.map((descrip, di) => {
                      return (
                        <>
                          {
                            descrip.type == "unordered-list-item" ?
            
                              <ul style={{ listStyleType: "disc" }}>
                                <li>
                                  {descrip.text}
            
                                </li>
                              </ul>
            
                              : descrip.type == "ordered-list-item" ?
            
                                <ol >
                                    {descrip.text}
            
                                </ol>
                                :
                                <>
                                  {descrip.text}
                                  <br></br>
                                </>            
                          }
                        </>
                      )
                    })} 
                   
                  <span className={styles.showLess} onClick={showless}>...show less</span></li>
              </ul>
            </ul>

            <ul className={styles.Rul}>
              <li className={styles.Rli}>{jobs.companyName ? jobs.companyName : <li style={{ display: "inline-block" }}>Company name</li>}</li>

              <li className={styles.Rli}>{jobs.jobTitle ? jobs.jobTitle : <li style={{ display: "inline-block" }}>job Title</li>}</li>
              <li className={styles.Rli}>{jobs.jobLocation ? jobs.jobLocation : <li style={{ display: "inline-block" }}>job Location</li>}</li>
              <li className={styles.Rli}>{jobs.salaryRange ? jobs.salaryRange : <li style={{ display: "inline-block" }}>Salary Range</li>}</li>
              <li className={styles.Rli}>{jobs.experiance ? jobs.experiance : <li style={{ display: "inline-block" }} >Experiance</li>}</li>
              <li className={styles.Rli}>{jobs.skills ? jobs.skills : <li style={{ display: "inline-block" }} >Skills</li>}  </li>
              <li className={styles.Rli}>
                {jobs.updatedAt ? new Date(jobs.updatedAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                ) : <li style={{ display: "inline-block" }}>Date</li>
                }
              </li>

            </ul>

          </div>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
                <div className={styles.JobCard} >
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} >{jobs.jobTitle}</p>
        <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p></div>

        <div className={styles.companyNameLocationWrapper}   >
          <img className={styles.logo} src={jobs.Logo} />
          {!jobs.Source ?

          <span className={styles.companyName} >{jobs.companyName}  </span> 
          :
  <> <a className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{jobs.Source}</a><br></br> </>


}  

        </div>
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{jobs.jobLocation}</span>                        
        <span className={styles.qualificationAndExperiance}>
        <  img className={styles.graduationImage} src={graduation}  /> 

          {jobs.qualification},   {jobs.experiance} Exp, {jobs.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br> 
        <span className={styles.jobtypeAndDate}>Source</span> :

{jobs.Source ?
  <> <a className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{jobs.Source}</a><br></br> </>
  :
  <> <span className={styles.skills}>ItWalkin</span><br></br></>
}

<div className={styles.skillWrapper}>
          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{jobs.skills}</span><br></br>
        </div>

            
            <div className={styles.ApplyPackage}>
            <p className={styles.salaryRange}><span>&#8377;</span>{jobs.salaryRange}</p>        


            {
    jobSeekerId?
(
            jobseekerid.find((jobseeker) => {
  return (
    jobseeker == jobSeekerId
  )
}) ?
  <button className={styles.MobileAppliedButton}  > Applied <span style={{ fontSize: '13.8px', marginBottom:"3px", marginLeft:"2px" }}>&#10004;</span></button>
  
  // job .isApproved?

    :
  <button className={styles.ApplyMobile} onClick={() => { applyforJob(jobs._id) }}>Apply
    <span className={styles.Loader} >{Loader && jobs._id == clickedJobId ?
      <TailSpin color="white" height={20} />
      : ""}</span></button>
)
      :
      empId?

  // <div className={styles.ApplyPackage}>
  //      <span className={styles.salaryRange} style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</span>
          <div className={Styles.MobileAcbuttons}>
          <button style={{marginTop:"-10px"}} onClick={() => { update(jobs._id) }} className={` ${Styles.MobileUpdate}`}>update</button>
          <button style={{marginTop:"-10px"}} onClick={() => { deletejob(jobs._id) }} className={` ${Styles.MobileDelete}`}>delete</button>
               </div>
        // </div>
        :  jobs.SourceLink?
        <button  className={styles.ApplyMobile} onClick={() => {
          applyforOtherJob(jobs.SourceLink) }}>Apply</button>
          :
      <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
      


}
                  </div>
            <p className={styles.jobDescriptionHeading}>Job Description:</p>
            <p className={styles.jobDescription}> 
            { jobdescription.map((descrip, di) => {
                      return (
                        <>
                          {
                            descrip.type == "unordered-list-item" ?
            
                              <ul style={{ listStyleType: "disc" }}>
                                <li style={{marginLeft:"-5px"}} className={styles.jobDescription}>
                                  {descrip.text}
            
                                </li>
                              </ul>
            
                              : descrip.type == "ordered-list-item" ?
            
                                <ul >
                                  <li style={{marginLeft:"-5px"}} className={styles.jobDescription}>
                                    {descrip.text}
            
                                  </li>
                                </ul>
                                :
                                <>
                                 <div className={styles.jobDescription}> {descrip.text}</div>
                                  <br></br>
                                </>           
                          }
                        </>
                      )
                    })}
                   


            <span onClick={() =>{
              window.scrollTo({
                top:0
              })
               navigate(-1)}} className={styles.showLess}>
                      ...show less
                    </span>
            
               </p>
                </div>
              </>

            </div>

          </>


              }
        </>

  )
}

      export default Jobdetails