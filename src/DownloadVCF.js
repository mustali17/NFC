import React, { useState } from "react";

export default function DownloadVCF() {
  function generateVCard(name, mobile, email) {
    let vCard = `BEGIN:VCARD
          VERSION:3.0
          FN:${name}
          TEL;TYPE=cell:${mobile}
          EMAIL;TYPE=INTERNET:${email}
          END:VCARD`;

    return new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  }
  const [name, setName] = useState("Mustali");
  const [mobileNumber, setMobileNumber] = useState("8238588952");
  const [email, setEmail] = useState("mustalichunawala@gmail.com");
  async function handleButtonClick() {
    const vCardBlob = generateVCard(name, mobileNumber, email);
    const blobUrl = URL.createObjectURL(vCardBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = `${name}.vcf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  return (
    <>
      <p>{name}</p>
      <p>{email}</p>
      <p>{mobileNumber}</p>
      <button onClick={handleButtonClick}> Download Contact </button>
    </>
  );
}
