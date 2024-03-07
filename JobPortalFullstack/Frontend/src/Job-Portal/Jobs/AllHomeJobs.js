import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
// import graduation from "../img/icons8-graduation-64.png"



import useScreenSize from '../SizeHook';



function Home() {
  const [jobs, setJobs] = useState([])
  const [active, setactive] = useState(0)
  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [PageLoader, setPageLoader] = useState(false)
  const [Result, setResult] = useState(false)
  const [NotFound, setNotFound] = useState("")
  const screenSize = useScreenSize();

  let navigate = useNavigate()
  function changeActive(id){
    setactive(id)
  }

  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])
  useEffect(() => {
    let adminLogin = localStorage.getItem("AdMLog")
    if (adminLogin) {
      navigate("/BIAddmin@Profile")
    }
  }, [])



  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current && e.target !== imgRef.current) {
  //     setshowJobs(false)
  //   }
  // })
  async function getjobs() {
    setPageLoader(true)
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        setPageLoader(false)

        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);

        });
        setJobs(sortedate)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
    // window.open(`${Link}`)
  }
  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  // ...................search..........

  // async function search(e) {
  //   let key = e.target.value

  //   await axios.get(`http://localhost.com:8080/jobpost/searchJob/${key}`)
  //     .then((res) => {
  //       if (key) {
  //         setJobs(res.data)        
  //       } else {
  //         getjobs()
  //       }
  //     })
  // }

  const [keyV, setkeyV] = useState('')
  const [Filterjobs, setFilterjobs] = useState([])
  async function search(e) {
    setkeyV(e.target.value)
    let key=e.target.value
    console.log(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...jobs]
      const filteredItems = dubmyjobs.filter((user) =>{
        if(JSON.stringify(user).includes(key.toLowerCase())){
return user
        }
    })
    setFilterjobs(filteredItems)      
    } else {
      getjobs()
      setResult(false)
    }
  }



  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)

  }

  function sortbyNewjobs() {
    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })

    setJobs(newjobSort)

  }


  function SdescendingOrder() {
    let newJobs = [...jobs]
    // const desendSort = newJobs.sort(function (a, b) {
    //   return (
    //     b.salaryRange - a.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    // const AscendSort = newJObs.sort(function (a, b) {
    //   return (
    //     a.salaryRange - b.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    // const descend = newjob.sort(function (a, b) {
    //   return (
    //     b.experiance - a.experiance
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    // const Ascend = newjob.sort(function (a, b) {
    //   return (
    //     a.experiance - b.experiance
    //   )
    // })
    // setJobs(Ascend)
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }
  function checkEmpHalf(empId) {
    navigate(`/CheckEmpHalfProfile/${empId}`)
  }


  // const [jobTitle, setjobTitle] = useState("")
  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  // const [getJobTitle, setgetJobTitle] = useState(true)

  async function getjobTitleAll(all) {
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }
  async function getjobsAllLoc(all) {
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }

  async function JobtitleFilter(jobTitle) {
    await axios.get(`http://localhost:8080/jobpost/getjobTitle/${jobTitle}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  async function getLocation(jobLocation) {
    await axios.get(`http://localhost:8080/jobpost/getjobLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  async function getBothFiltered(jobTitle) {

    await axios.post(`http://localhost:8080/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  const [from, setfrom] = useState(0)
  const [to, setto] = useState(10)

  function changefrom(e) {
    console.log(e.target.value - 1)
    setfrom(e.target.value - 1)
  }
  function changeTo(e) {
    console.log(e.target.value)
    setto(e.target.value)
  }


  return (
    <>

      <div style={{ marginTop: "30px" }}>


        <p style={{ color: " red", marginLeft: "4%" }}>Note: this website is under development process</p>
        <div className={styles.searchBoth}>
          <p className={styles.p}>Search </p>
          <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />
        </div>
        {Result ?
          <h4 style={{ marginLeft: "18.5%", marginTop: "10px" }}> {Filterjobs.length} matching Result Found  </h4>
          : ""
        }
      </div>


        <div className={styles.dropdownWrapper}>
          <select className={styles.dropdownleft} onChange={(e) => { changefrom(e) }}>
            {
              jobs.map((items, i) => {
                return (
                  <>
                    <option> {i + 1} </option>
                  </>
                )
              })
            }
          </select>
          {/* <input value={from + 1} className={styles.inputtypeLeft} />
          <input value={to} className={styles.inputtypeRight} /> */}

          <select className={styles.dropdownright} onChange={(e) => { changeTo(e) }}>
            <option style={{backgroundColor:"blue", color:"white"}} > {to} </option>

            {
              jobs.map((items, i) => {
                return (
                  <>
                    <option > {i + 1} </option>
                  </>
                )
              })
            }
          </select>
          <p>Jobs shown from <b>{from + 1}</b> to <b>{to}</b></p>
        </div>



      {screenSize.width > 850 ?
        <>
          <div className={styles.JobtitleFilterWrapper}>

            <label> <input type="radio" name="location" checked={jobLocation === 'AllL'} className={styles.JobtitleFilter_} onClick={() => { getjobsAllLoc(); setjobLocation("AllL") }} />All</label>
            <label> <input type="radio" name="location" checked={jobLocation === 'banglore'} className={styles.JobtitleFilter_} onClick={() => { getLocation("banglore"); setjobLocation('banglore') }} />Banglore</label>
            <label> <input type="radio" name="location" disabled checked={jobLocation === 'chennai'} className={styles.JobtitleFilter_} onClick={() => { getLocation("chennai"); setjobLocation('chennai') }} />Chennai</label>
            <label> <input type="radio" name="location" disabled checked={jobLocation === 'hyderabad'} className={styles.JobtitleFilter_} onClick={() => { getLocation("hyderabad"); setjobLocation('hyderabad') }} />Hyderabad</label>
            <label> <input type="radio" name="location" disabled checked={jobLocation === 'mumbai'} className={styles.JobtitleFilter_} onClick={() => { getLocation("mumbai"); setjobLocation('mumbai') }} />Mumbai</label>
            <label> <input type="radio" name="location" disabled checked={jobLocation === 'delhi'} className={styles.JobtitleFilter_} onClick={() => { getLocation("delhi"); setjobLocation('delhi') }} />Delhi</label>
          </div>
          <br></br>

          <div className={styles.JobtitleFilterWrapper}>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { getjobTitleAll('all'); setjobTitle("all") }} />All</label>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('java') : JobtitleFilter('java') } }} />Java developer</label>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('full') : JobtitleFilter('full') } }} />Full Stack Developer</label>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('front') : JobtitleFilter('front') } }} />Frontend Developer</label>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('back') : JobtitleFilter('back') } }} />Backend developer</label>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('python') : JobtitleFilter('python') } }} />Python Developer</label>
          </div>

          {/* rgb(55, 16, 92) */}


          <div className={styles.AllHeadingSortWrapper}>

            {/* <div className={styles.AllradioWrapper} > */}
            <p className={`${styles.FilterHeading} ${styles.JobSorting}`} onClick={() => { setshowJobs((prev) => !prev) }}  ><b>Job Posted Date <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

            {showJobs ?
              <>
                <div className={`${styles.JobradioWrapper} ${styles.RadioWrapper}`}  >

                  <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyOldjobs} />Show old</label><br></br>
                  <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyNewjobs} />Show latest</label>

                </div>
              </>
              : ""
            }
            <p className={`${styles.FilterHeading} ${styles.ExpSorting}`} onClick={() => { setshowExperiance((prev) => !prev) }}><b>Experience Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

            {showExperiance ?
              <>

                <div className={`${styles.PackageradioWrapper} ${styles.RadioWrapper}`}>

                  <label><input className={styles.radio} type="radio" name="Package" onClick={EdescendingOrder} />High-Low</label><br></br>
                  <label><input className={styles.radio} type="radio" name="Package" onClick={EascendingOrder} />Low-High</label>
                </div>
              </>
              : ""
            }
            <p className={`${styles.FilterHeading} ${styles.PackageSorting}`} onClick={() => { setshowPackage((prev) => !prev) }}><b>Package Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

            {showPackage ?
              <>
                <div className={`${styles.ExperianceradioWrapper} ${styles.RadioWrapper}`}>
                  <label><input className={styles.radio} type="radio" name="Experiance" onClick={SdescendingOrder} />High-Low</label><br></br>
                  <label><input className={styles.radio} type="radio" name="Experiance" onClick={SascendingOrder} />Low-High</label>
                </div>
              </>
              : ""
            }
            {/* </div> */}
          </div>


          <div className={styles.Uiwarpper}>
            <ul className={styles.ul}>
              <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
              <li className={`${styles.li} ${styles.Source}`}><b>Source</b></li>
              <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
              <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

              <li className={`${styles.li} ${styles.HliDescription}`}><b>Job description</b></li>
              <li className={`${styles.li} ${styles.date}`}><b>Posted Date</b>

              </li>

              <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
              <li className={`${styles.li} ${styles.Package}`}><b>Package </b>

              </li>
              <li className={`${styles.li} ${styles.experiance}`}><b>Exp</b>

              </li>
              <li className={`${styles.li} ${styles.qualification}`}><b>Qualif</b></li>


              <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
              <li className={`${styles.li} ${styles.Apply}`}><b>Apply</b></li>

            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }
            {keyV?
              Filterjobs.length > 0 ?
              Filterjobs.map((items, i) => {
                  return (

                    <ul className={styles.ul} key={i}>                        
                  {
                  !items.Source?                 

                <li style={{cursor:"pointer", textDecoration:"underline"}} className={`${styles.li} ${styles.CompanyName}`}
               onClick={() => { navigate(`/CheckEmpHalfProfile/${items.empId}`)}}  >
                {items.Logo ?
                  < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                  : ""}<br></br>
                  {items.companyName}</li>
                  :
                  <a style={{cursor:"pointer", textDecoration:"underline"}} className={`${styles.li} ${styles.CompanyName}`} href= {items.SourceLink} target="_blank" >
                {items.Logo ?
                  < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                  : ""}<br></br>
              {items.Source}

                  </a>

                }
                    
                    
                    
                      {items.Source ?
                        <a className={`${styles.li} ${styles.Source}`} href={items.SourceCompanyLink} target="_blank">{items.Source}</a>
                        :
                        <li className={`${styles.li} ${styles.Source}`} >Itwalkin</li>

                      }

                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                      <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}>
                        {
                          items.jobDescription.map((descrip, di) => {
                            return (
                              <>
                                {
                                  // descrip.type == "unordered-list-item" ?

                                  //   <ul style={{ listStyleType: "disc" }}>
                                  //     <li>
                                  //       {descrip.text}

                                  //     </li>
                                  //   </ul>

                                  //   : descrip.type == "ordered-list-item" ?

                                  //     <ol >
                                  //       {/* <li> */}
                                  //       {descrip.text}

                                  //       {/* </li> */}
                                  //     </ol>
                                  //     :
                                  //     <>
                                  //       {descrip.text}
                                  //       <br></br>
                                  //     </>
                                  descrip.text.slice(0,50)
                                }
                              </>
                            )
                          }).slice(0, 1)
                        }

                        <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                          ...read more
                        </span>
                      </li>
                      <li className={`${styles.li} ${styles.date}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                      <li className={`${styles.li} ${styles.Apply}`}>
                        {items.SourceLink ?
                          <button title='this will take to Source page' className={styles.Applybutton} onClick={() => {
                            applyforOtherJob(items.SourceLink)
                          }}>Apply</button>
                          :
                          <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply</button>

                        }

                      </li>



                    </ul>
                  )
                }).slice(from, to)
                : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
                :
                jobs.length > 0 ?
                jobs.map((items, i) => {
                    return (
  
                      <ul className={styles.ul} key={i}>                        
                    {
                    !items.Source?                 
  
                  <li style={{cursor:"pointer", textDecoration:"underline"}} className={`${styles.li} ${styles.CompanyName}`}
                 onClick={() => { navigate(`/CheckEmpHalfProfile/${items.empId}`)}}  >
                  {items.Logo ?
                    < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                    : ""}<br></br>
                    {items.companyName}</li>
                    :
                    <a style={{cursor:"pointer", textDecoration:"underline"}} className={`${styles.li} ${styles.CompanyName}`} href= {items.SourceLink} target="_blank" >
                  {items.Logo ?
                    < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                    : ""}<br></br>
                {items.Source}
  
                    </a>
  
                  }
                      
                      
                      
                        {items.Source ?
                          <a className={`${styles.li} ${styles.Source}`} href={items.SourceCompanyLink} target="_blank">{items.Source}</a>
                          :
                          <li className={`${styles.li} ${styles.Source}`} >Itwalkin</li>
  
                        }
  
                        <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                        <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>
  
                        <li className={`${styles.li} ${styles.liDescription}`}>
                          {
                            items.jobDescription.map((descrip, di) => {
                              return (
                                <>
                                  {
                                    // descrip.type == "unordered-list-item" ?
  
                                    //   <ul style={{ listStyleType: "disc" }}>
                                    //     <li>
                                    //       {descrip.text}
  
                                    //     </li>
                                    //   </ul>
  
                                    //   : descrip.type == "ordered-list-item" ?
  
                                    //     <ol >
                                    //       {/* <li> */}
                                    //       {descrip.text}
  
                                    //       {/* </li> */}
                                    //     </ol>
                                    //     :
                                    //     <>
                                    //       {descrip.text}
                                    //       <br></br>
                                    //     </>
                                    descrip.text.slice(0,50)
                                  }
                                </>
                              )
                            }).slice(0, 1)
                          }
  
                          <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                            ...read more
                          </span>
                        </li>
                        <li className={`${styles.li} ${styles.date}`}>
                          {new Date(items.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </li>
                        <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                        <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                        <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                        <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                        <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
  
                        <li className={`${styles.li} ${styles.Apply}`}>
                          {items.SourceLink ?
                            <button title='this will take to Source page' className={styles.Applybutton} onClick={() => {
                              applyforOtherJob(items.SourceLink)
                            }}>Apply</button>
                            :
                            <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply</button>
  
                          }
  
                        </li>
  
  
  
                      </ul>
                    )
                  }).slice(from, to)
                  : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
            }
          </div>
        </>
        :
        <>


          <div style={{ display: "flex", marginLeft: "18px" }}>
            <div className={styles.JobtitleFilterWrapper_} style={{ width: "120px" }}>

              <label> <input type="radio" name="location" checked={jobLocation === 'AllL'} className={styles.JobtitleFilter_} onClick={() => { getjobsAllLoc(); setjobLocation("AllL") }} />All</label><br></br>
              <label> <input type="radio" name="location" checked={jobLocation === 'banglore'} className={styles.JobtitleFilter_} onClick={() => { getLocation("banglore"); setjobLocation('banglore') }} />Banglore</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'chennai'} className={styles.JobtitleFilter_} onClick={() => { getLocation("chennai"); setjobLocation('chennai') }} />Chennai</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'hyderabad'} className={styles.JobtitleFilter_} onClick={() => { getLocation("hyderabad"); setjobLocation('hyderabad') }} />Hyderabad</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'mumbai'} className={styles.JobtitleFilter_} onClick={() => { getLocation("mumbai"); setjobLocation('mumbai') }} />Mumbai</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'delhi'} className={styles.JobtitleFilter_} onClick={() => { getLocation("delhi"); setjobLocation('delhi') }} />Delhi</label>
            </div>
            <br></br>

            <div className={styles.JobtitleFilterWrapper_} style={{ width: "200px", marginLeft: "1px" }}>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { getjobTitleAll('all'); setjobTitle("all") }} />All</label>            <br></br>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('java') : JobtitleFilter('java') } }} />Java developer</label> <br></br>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('full') : JobtitleFilter('full') } }} />Full Stack Developer</label> <br></br>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('front') : JobtitleFilter('front') } }} />Frontend Developer</label><br></br>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('back') : JobtitleFilter('back') } }} />Backend developer</label> <br></br>
              <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('python') : JobtitleFilter('python') } }} />Python Developer</label>
            </div>
          </div>


          {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
          <div id={styles.JobCardWrapper} >
            { keyV?
              Filterjobs.length > 0 ?

              Filterjobs.map((job, i) => {
                  return (
                    <>
                      <div className={`${styles.JobCard}`} key={i} >
                        
                        <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} >{job.jobTitle.toUpperCase()} </p>                      
        <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
        } </p>       

        </div>
        
        {/* <br></br> */}
        <div className={styles.companyNameLocationWrapper}   >
          <img className={styles.logo} src={job.Logo} />
{!job.Source ?

         <> <span className={styles.companyName} onClick={()=>{checkEmpHalf(job.empId)}} >{job.companyName} </span><br></br></>
          :
        //  <> <span className={styles.companyName} onClick={()=>{checkEmpHalf(job.empId)}} >{job.companyName} </span><br></br></>
  <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>


}
          </div>

          
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase()+job.jobLocation.slice(1)} ,</span>
        <span className={styles.qualificationAndExperiance}>
        
        <  img className={styles.graduationImage} src={graduation}  /> 

          {job.qualification}, {job.experiance} Exp ,   {job.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br>
        
        <span className={styles.jobtypeAndDate}>Source</span> :

{job.Source ?
  <> <a className={`${styles.skills}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
  :
  <> <span className={styles.skills}>ItWalkin</span><br></br></>
}
                                     
                        <div className={styles.skillWrapper}>
                        <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>
                        <div className={styles.ApplyPackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange}</p>
                          {job.SourceLink ?
                            <button className={styles.ApplyMobile} onClick={() => {
                              applyforOtherJob(job.SourceLink)
                            }}>Apply</button>
                            :
                            <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
                          }
                        </div>

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {/* {job.jobDescription} */}
                        
                          {
                            job.jobDescription.map((descrip, di) => {
                              return (
                                <>                                      
                                         
                              {
                                    // descrip.type == "unordered-list-item" ?

                                      // <ul style={{ listStyleType: "disc" }}>
                                      //   <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>
                                      //     {descrip.text.slice(0,50)}

                                      //   </li>
                                      // </ul>

                                      // : descrip.type == "ordered-list-item" ?

                                      //   <ul style={{ listStyleType: "disc" }} >
                                      //     <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>

                                      //       {descrip.text}

                                      //     </li>
                                      //   </ul>
                                      //   :
                                      //   <>
                                          descrip.text.slice(0,50)
                                      //     <br></br>
                                      //   </>

                                  }
                                 
                                </>
                              )
                            }).slice(0,1)
                          }
<span onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} className={styles.seeMore}>
                          ...read more
                        </span>
                        </p>


                      </div>
                    </>
                  )
                }).slice(from, to)
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>

                :
                jobs.length > 0 ?

                jobs.map((job, i) => {
                  return (
                    <>
                      <div onClick={()=>{changeActive(i)}} className={`${styles.JobCard} ${active===i?styles.active: ""}  `} key={i} >
                        
                        <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} >{job.jobTitle.toUpperCase()} </p>                      
        <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
        } </p>       

        </div>
        
        {/* <br></br> */}
        <div className={styles.companyNameLocationWrapper}   >
          <img className={styles.logo} src={job.Logo} />
{!job.Source ?

         <> <span className={styles.companyName} onClick={()=>{checkEmpHalf(job.empId)}} >{job.companyName} </span><br></br></>
          :
        //  <> <span className={styles.companyName} onClick={()=>{checkEmpHalf(job.empId)}} >{job.companyName} </span><br></br></>
  <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
}
          </div>          
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase()+job.jobLocation.slice(1)} ,</span>
        <span className={styles.qualificationAndExperiance}>
        
        <  img className={styles.graduationImage} src={graduation}  /> 

          {job.qualification}, {job.experiance} Exp ,   {job.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br>
        
        <span className={styles.jobtypeAndDate}>Source</span> :

{job.Source ?
  <> <a className={`${styles.skills}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
  :
  <> <span className={styles.skills}>ItWalkin</span><br></br></>
}
                                     
                        <div className={styles.skillWrapper}>
                        <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>
                        <div className={styles.ApplyPackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange}</p>
                          {job.SourceLink ?
                            <button className={styles.ApplyMobile} onClick={() => {
                              applyforOtherJob(job.SourceLink)
                            }}>Apply</button>
                            :
                            <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
                          }
                        </div>

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {/* {job.jobDescription} */}
                        
                          {
                            job.jobDescription.map((descrip, di) => {
                              return (
                                <>                                      
                                         
                              {
                                    // descrip.type == "unordered-list-item" ?

                                      // <ul style={{ listStyleType: "disc" }}>
                                      //   <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>
                                      //     {descrip.text.slice(0,50)}

                                      //   </li>
                                      // </ul>

                                      // : descrip.type == "ordered-list-item" ?

                                      //   <ul style={{ listStyleType: "disc" }} >
                                      //     <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>

                                      //       {descrip.text}

                                      //     </li>
                                      //   </ul>
                                      //   :
                                      //   <>
                                          descrip.text.slice(0,50)
                                      //     <br></br>
                                      //   </>

                                  }
                                 
                                </>
                              )
                            }).slice(0,1)
                          }
<span onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} className={styles.seeMore}>
                          ...read more
                        </span>
                        </p>


                      </div>
                    </>
                  )
                }).slice(from, to)
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>


            }

          </div>

        </>
      }
    </>

  )
}

export default Home

// .......cards.......

{/* <div className={styles.carwrapper}>
              {jobs.map((items, i) => {
                return (
                  <div className={styles.card}>
                    <div className={styles.AlltexWrapper}>
                      <p className={styles.text}>Job Title :{items.jobTitle}</p>
                      <p className={styles.text}>Job Location:</p><a>{items.jobLocation.toUpperCase()}</a>
                      <p className={styles.text}> Package : {items.salaryRange}</p>
                      <p className={styles.text}> Experiance Required :{items.experiance}</p>
                      <p className={styles.text}> Skills Required :{items.skills}</p>
                      <div className={styles.descriptionAndApply}>
                        <p className={styles.description}>
                          ......... {items.jobDescription} ........
                          {items.jobDescription.slice(0, 60)}
                          <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>
                        <button className={styles.button} onClick={applyforJob}>Apply </button>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div> */}
