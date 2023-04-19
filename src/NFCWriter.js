import React, { useState } from 'react';

function NfcWriter() {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleWriteUrl = async () => {
    try {
      const nfc = navigator.nfc;
      await nfc?.requestPermission();
      const ndef = new window.NDEFWriter();
      const record = window.NDEFRecord.createUri(url);
      const message = [record];
      await ndef.write(message);
      alert('URL written to NFC tag successfully!');
    } catch (error) {
      console.error(error);
      alert('Error writing URL to NFC tag');
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleUrlChange} />
      <button onClick={handleWriteUrl}>Write URL to NFC tag</button>
    </div>
  );
}

export default NfcWriter;
