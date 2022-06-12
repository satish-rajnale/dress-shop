import { useEffect, useState } from "react";
const QRCode = require("qrcode")
export function $(sel:string){
    return document.getElementById(sel);
  }

  // function copyToClipboard() {
  //   // change btn text 
  //   var link = $('copyLink');
  //   link && (link.innerText = 'Copied!');
  //   setTimeout(()=>{
  //     // restore btn text
  //     link && (link.innerText = 'Copy Link')
  //   }, 1000)
  //   var input = $('sharelink');
  //   input && input.focus();
  //   input && input.select();
  //   document.execCommand('copy');
  // }

 const UPIQR = () => {
  const  upiString = 'upi://pay?pa=9136757599@upi&pn=SATISH RAJNALE&am=10&cu=INR';

  const [url, setUrl] = useState(upiString)

    var opts = {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale:8,
      color: {
        dark:"#000",
        light:"#fff"
      }
    }
    useEffect(()=>{
      QRCode.toDataURL(upiString, opts, function (err:any, dataUrl:string) {
        if(err){
          alert('Sorry, Something went wrong while generating QR code');
          return;
        }
        setUrl(dataUrl);
      })
    }, [])
   
   
  return (<>
   <img src={url} alt="" id="outputImg"/>
  </>)
  }
  export default UPIQR;