
const cors = require("cors")
const express = require("express");
const app = express();
const https = require("https")
const StudentProfileRoutes = require("./Routes/StudentProfileRoutes");
const EmpProfileRoutes = require("./Routes/EmpProfileRoutes");
const jobpostRoutes = require("./Routes/JobpostsRoutes");
const adminRoutes =require("./Routes/AdminRout")
const PaymentRoute = require("./Routes/PaymentRout")
const path =require("path")
const fs = require("fs")

const { MongoClient } = require("mongodb")
const mongoose = require("mongoose");
const port = 8080;

//  mongoose.connect("mongodb+srv://blueimpluse:jobportal1234@cluster0.5dgcnm4.mongodb.net/jobportalMern")
mongoose.connect("mongodb://127.0.0.1:27017/Job-Portal-Database")

    .then((res) => { console.log("connected") })
    .catch(() => { console.log("failed") })

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use("/StudentProfile",StudentProfileRoutes)
app.use("/EmpProfile",EmpProfileRoutes)
app.use("/jobpost", jobpostRoutes)
app.use("/admin", adminRoutes)
app.use("/paymentAPI", PaymentRoute)

// app.get("/", (req,res,next)=>{
//     res.send("hello from nodejs check")
// })

app.use("*", (req, res) => {
    res.send(" Cannot get from backend with **")
})



app.listen(port, () => {
    console.log(`app running on port ${port} for booking`)
})
// const sslServer= https.createServer(
//     {
//         key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem') ),
//        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem') ),        
//     },
//     app
// )
// sslServer.listen(port ,()=>
//     console.log("app started running on port 8080")
// )