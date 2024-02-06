import React, {useState } from 'react'
import'./QRCode.css';
function QRCode() {
 const[img,setImg]=useState("");
 const[loading,setLoading]=useState(false);
 const[qrdata,setQrdata]=useState("");
 let[qrsize,setQrsize]=useState("150");

 async function generateQRCode(){
    setLoading(true)
    qrsize=qrsize>300 ? 300 : qrsize
    try{
      const QR=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
      setImg(QR)
    }
    catch(e){
      console.error(`error while generating the QR Code ${e}`)
    }
    finally{
      setLoading(false)
    }
 }

 const downloadQR=()=>{
  try{
    fetch(img)
  .then((response)=>response.blob())
  .then((blob)=>{
    const link=document.createElement("a")
    link.href=URL.createObjectURL(blob)
    link.download=`${qrdata}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
  }
  catch(e){ 
    console.error(`Error while download the image : ${e}`)
  }
 }
  return (
    <div className="AppContainer">
        <h1 className="head">QR Code Generator</h1>
        {img && <img src={img} alt="" className='QRImage' />}
        {loading && <p>Please Wait!</p>}
        <div>
            <label htmlFor="
            dataInput" className="input-label">Data For QR Code : </label>
        <input type="text"  value={qrdata} id="dataInput" placeholder='enter data for QR code'onChange={(e)=>setQrdata(e.target.value)} required=''/>
        <label htmlFor="sizeInput" className="input-label">Image Size(e.g., 200) : </label>
        <input type="text" id="sizeInput" placeholder='enter size for QR code' onChange={(e)=>setQrsize(e.target.value)}/>
        <button className='genBtn' onClick={()=>generateQRCode()} disabled={loading}>Generate QR code</button>
        <button className='downBtn' onClick={downloadQR}>Download QR code</button>
        <p className='Footer'>2024 &#169; Reserved By Akash</p>
        </div>

    </div>
  )
}

export default QRCode