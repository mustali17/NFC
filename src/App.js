import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import NfcWriter from "./NFCWriter";
// import ndef from 'ndef';

function App() {
  return (
    <div className="App">
      <h1>Write URL to NFC tag test-1</h1>
      <main>
        <NfcWriter />
      </main>
    </div>
  );
}

export default App;
