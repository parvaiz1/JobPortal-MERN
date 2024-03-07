const express = require("express")
const router = express.Router()
const Razorpay = require('razorpay');
const keyId='rzp_test_h3n5NBOXNqdSAs'
const SecretKey = 'Po87Jfa74x4Saxjo2SCPz5zw'
const crypto = require("crypto")
const PaymentModel = require("../Schema/PaymentReceiptSchema")
const axios =require("axios")
var nodemailer = require('nodemailer');



router.post("/phonePayPayment", async(req,res)=>{
  // console.log(req.body.amount)
  const merchantTransactionId = 'MT7850590068188104'

  const data = {    
      merchantId: "PGTESTPAYUAT",
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID123",
      // name: req.body
      amount: req.body.amount*100,
      redirectUrl: `http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/paymentAPI/status/${merchantTransactionId}`,
      redirectMode: "POST",
      // callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE"      
    }
  };
  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');
  const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
  const keyIndex = 1;
  const string = payloadMain + '/pg/v1/pay' + key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;
  const axios = require('axios');

  const URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'
  // const URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay'
const options = {
  method: 'POST',
  url: URL,
  headers: {
    accept: 'application/json', 
  'Content-Type': 'application/json',
  'X-VERIFY': checksum
},
data:{
  request: payloadMain
}
};

axios
  .request(options)
  .then(function (response) {
    // console.log('line no 130',response.data.data.instrumentResponse.redirectInfo);
    // console.log('line no 131',response.data.data.instrumentResponse.redirectInfo.url);
    return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
    // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)

  })
  .catch(function (error) {
    // console.error(error);
  });
})

router.post("/status/:txid", async(req, res) => {
  console.log("line no 142", req.body)
  const merchantTransactionId = res.req.body.transactionId
  const merchantId = res.req.body.merchantId
  const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"

  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
  method: 'GET',

  url : `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,

  // url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
  headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
  }
  };

  // CHECK PAYMENT TATUS
  axios.request(options)
  .then(async(response) => {
    // console.log("line no 169",response.data)

      if (response.data.success === true) {
          const url = `http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/success`
          return res.redirect(url)
      } else {
          const url = `http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/failure`
          return res.redirect(url)
      }
  })
  .catch((error) => {
      // console.error("line no 181",error);
  });
});





module.exports=router