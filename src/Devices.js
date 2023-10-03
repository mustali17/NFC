import React, { useState, useEffect } from "react";
import axios from "axios";

import "./devices.css";

import DeviceTap from "./DeviceTap";

const Devices = () => {
  const [status, setStatus] = useState(() => {
    if (!("NDEFReader" in window)) {
      return "Web NFC is not available. Please make sure the 'Experimental Web Platform features' flag is enabled on Android.";
    } else {
      return null;
    }
  });

  const write = async () => {
    const url = "http://mustali.tapop.co";
    try {
      const ndef = new window.NDEFReader();
      ndef
        .write({
          records: [{ recordType: "url", data: url }],
        })
        .then(() => {
          console.log("Profile link added.");
        })
        .catch((error) => {
          console.log(`Write failed :-( try again: ${error}.`);
        });
    } catch (error) {
      console.log(`Write failed! ${error}`);
    }
  };

  // check device is whether android or iphone
  const [isAndroid, setIsAndroid] = useState(false);
  const [deviceTapOpen, setDeviceTapOpen] = useState(false);

  return (
    <div className="flex h-screen w-full first-container bg-white sm:bg-[#FAFAFA] relative">
      <div className="h-full"></div>
      <div className="w-full overflow-auto">
        <div className="m-5 sm:m-6 bg-white sm:bg-[#FAFAFA]">
          <div className="sm:hidden">
            <div className="mb-[1.5rem] text-lg md:text-xl font-[500] hidden md:block">
              Devices
            </div>
            <div className="font-semibold text-[#1A1A1A]">
              Choose a profile to activate
            </div>
          </div>
          <div className="hidden sm:block text-xl font-semibold mb-6">
            Your Profile
          </div>
          <div className="flex gap-10 [@media(max-width:1440px)]:flex-col [@media(max-width:1440px)]:gap-0">
            {/* <div className="block sm:hidden absolute left-0 bottom-0 mx-5 my-8" style={{width:'calc(100% - 40px)'}}><PrimaryButton2 text={`Activate Profile`} width={'100%'}/></div> */}
            {/* <div className="user_card">
                                <img className='w-[4rem] h-[4rem] rounded-full' src='https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80' />
                                <div className='ml-4'>
                                    <div className='text-base font-[600]'>{name}</div>
                                    <div className='card_tagbg-[#D8F6FF] text-[#2298BD]'>Portfolio</div>
                                </div>
                            </div> */}
            <div className="bg-white px-[2.5rem] py-[2rem] rounded-[0.5rem] h-fit w-full hidden sm:block">
              <div className="text-xl font-[600]">
                Connect your profile to Tapop device
              </div>
              <div className="[@media(max-width:825px)]:w-full w-[29rem] p-[1rem] mt-[2.5rem] bg-[#FAFAFA] rounded-[0.75rem]">
                <div className="text-base font-[400]">
                  To activate and connect your Tapop device with your profile.{" "}
                </div>
                <li className="text-base font-[500] ml-[0.5rem] mt-[1rem]">
                  Open this page on your NFC-enabled phone,
                </li>
                <div className="text-base font-[500] ml-[2rem] mb-[1rem]">
                  or copy and paste this URL into it.
                </div>
                <div className="copy_button">
                  <div className="text-[0.875rem] leading-[1.375rem] font-[400]">
                    https://tapop.co/devices/mustali
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    setDeviceTapOpen(true);
                  }}
                >
                  Activate
                </button>
              </div>
              {window.screen.width < 768 && (
                <DeviceTap
                  isAndroid={isAndroid}
                  open={deviceTapOpen}
                  setOpen={setDeviceTapOpen}
                  username="mustali"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
