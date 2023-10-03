import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import NfcWriter from "./NFCWriter";
import Devices from "./Devices";
import DownloadVCF from "./DownloadVCF";
// import ndef from 'ndef';

function App() {
  return (
    <div className="App">
      <h1>VCF Download TEST-1</h1>
      <main>
        {/* <NfcWriter /> */}
        {/* <Devices /> */}
        <DownloadVCF />
      </main>
    </div>
  );
}

export default App;
