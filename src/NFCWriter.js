import React, { useState } from "react";

function NFCWriter() {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(
    "Web NFC is not available. Please make sure the 'Experimental Web Platform features' flag is enabled on Android."
  );

  const handleScanClick = async () => {
    setOutput("User clicked scan button");
    console.log('Scan Button Clicked');
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();
      setOutput("> Scan started");

      ndef.addEventListener("readingerror", () => {
        setOutput("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        setOutput(`> Serial Number: ${serialNumber}`);
        setOutput(`> Records: (${message.records.length})`);
      });
    } catch (error) {
      setOutput(`Argh! ${error}`);
    }
  };

  const handleWriteClick = async () => {
    setOutput("User clicked write button");
    console.log('write Button Clicked');
    try {
      const ndef = new window.NDEFReader();
      await ndef.write("Hello world!");
      setOutput("> Message written");
    } catch (error) {
      setOutput(`Argh! ${error}`);
    }
  };

  return (
    <div>
      <h3>Live Output</h3>
      <div id="output" className="output">
        <div id="content"></div>
        <div id="status">{status}</div>
        <pre id="log">{output}</pre>
      </div>
      <button id="scanButton" onClick={handleScanClick}>
        Scan
      </button>
      <button id="writeButton" onClick={handleWriteClick}>
        Write
      </button>
    </div>
  );
}

export default NFCWriter;
