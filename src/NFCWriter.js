import React, { useState } from "react";
import axios from "axios";

function NFCWriter() {
  const [output, setOutput] = useState("");
  const [url, setURL] = useState(null);
  const [status, setStatus] = useState(() => {
    if (!("NDEFReader" in window)) {
      return "Web NFC is not available. Please make sure the 'Experimental Web Platform features' flag is enabled on Android.";
    } else {
      return null;
    }
  });

  const handleScanClick = async () => {
    setOutput("User clicked scan button");
    console.log("Scan Button Clicked");
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
    console.log("write Button Clicked");
    try {
      const ndef = new window.NDEFReader();
      await ndef.write("Hello world!");
      setOutput("> Message written");
    } catch (error) {
      setOutput(`Argh! ${error}`);
    }
  };

  const writeGoogle = async () => {
    const { data } = await axios.get(
      "https://nfc-backend1.onrender.com/link/google"
    );
    console.log(data[0].link);
    const ndef = new window.NDEFReader();
    ndef
      .write({
        records: [{ recordType: "url", data: data[0].link }],
      })
      .then(() => {
        console.log("Google link added.");
        setOutput("Google link added.");
      })
      .catch((error) => {
        console.log(`Write failed :-( try again: ${error}.`);
        setOutput(`Write failed :-( try again: ${error}.`);
      });
  };

  const writeLinkedIn = async () => {
    const { data } = await axios.get(
      "https://nfc-backend1.onrender.com/link/linkedin"
    );
    console.log(data[0].link);
    const ndef = new window.NDEFReader();
    ndef
      .write({
        records: [{ recordType: "url", data: data[0].link }],
      })
      .then(() => {
        console.log("LinkedIn link added.");
        setOutput("LinkedIn link added.");
      })
      .catch((error) => {
        console.log(`Write failed :-( try again: ${error}.`);
        setOutput(`Write failed :-( try again: ${error}.`);
      });
  };

  const writeWApp = async () => {
    const { data } = await axios.get(
      "https://nfc-backend1.onrender.com/link/whatsapp"
    );
    console.log(data[0].link);
    const ndef = new window.NDEFReader();
    ndef
      .write({
        records: [{ recordType: "url", data: data[0].link }],
      })
      .then(() => {
        console.log("WhatsApp link added.");
        setOutput("WhatsApp link added.");
      })
      .catch((error) => {
        console.log(`Write failed :-( try again: ${error}.`);
        setOutput(`Write failed :-( try again: ${error}.`);
      });
  };

  const writeURL = async () => {
    console.log(url);
    try {
      const ndef = new window.NDEFReader();
      const message = [
        {
          records: [{ recordType: "url", data: url }],
        },
      ];
      await ndef.write(message);
      setOutput(`URL Written ${url}`);
    } catch (error) {
      setOutput(`Write failed! ${error}`);
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
      {/* <button id="scanButton" onClick={handleScanClick}>
        Scan
      </button> */}
      {/* <button id="writeButton" onClick={handleWriteClick}>
        Write
      </button> */}
      <br />
      <button class="btn" onClick={writeGoogle}>
        Google
      </button>
      <button onClick={writeLinkedIn}>LinkedIn</button>
      <button onClick={writeWApp}>What'sApp</button>
      <h2>Write any URL</h2>
      <input type="url" onChange={(e) => setURL(e.target.value)}></input>
      <button onClick={writeURL}>Write</button>
    </div>
  );
}

export default NFCWriter;
