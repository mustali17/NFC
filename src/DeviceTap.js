import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DeviceTap = (props) => {
  const [output, setOutput] = useState("");
  const [url, setURL] = useState(`https://www.linkedin.com/in/sayajishirke`);

  useEffect(() => {
    console.log(url);
    const writeURLToNFC = async () => {
      try {
        const ndef = new window.NDEFWriter();
        const message = [
          {
            records: [{ recordType: "url", data: url }],
          },
        ];
        await ndef.write(message);
        setOutput(`URL Written: ${url}`);
      } catch (error) {
        setOutput(`Write failed! ${error}`);
      }
    };

    if ("NDEFWriter" in window) {
      writeURLToNFC();
    } else {
      setOutput("NFC writing not supported in this browser.");
    }
  }, [url]);
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const [cardActivated, setCardActivated] = React.useState(false);
  const isAndroid = props.isAndroid;

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 24 },
      }}
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {!cardActivated ? (
        <div className="w-screen fixed left-0 bottom-0 bg-white px-5 py-6 rounded-t-2xl">
          <div className="flex gap-2">
            <h1 className="text-base xsm:text-lg font-semibold">
              Scan Your Tapop Device
            </h1>
            <span
              className="ms-auto text-lg pt-1"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            ></span>
          </div>
          <hr className="text-gray-400 mt-6" />
          <div
            className={`flex ${
              isAndroid ? "items-start top-10" : "items-center"
            } justify-center relative h-[300px]`}
          >
            {/* <img
              src={require("./images/card.png")}
              alt=""
              className="w-[161px] h-[92px]"
            />
            <img
              src={require(`./images/${isAndroid ? "android" : "iphone"}.png`)}
              alt=""
              className={`w-[120px] h-[245px] absolute right-0 ${
                isAndroid ? "top-0" : "top-[12%]"
              } device-iphone`}
            /> */}
          </div>
          <p className="font-medium text-center pt-2 text-sm xsm:text-base">
            To activate, place your Tapop device in the middle of the back of
            your phone, <br /> as shown in the image.
          </p>
          <p>{output}</p>
          <div className="flex justify-center mt-6" onClick={handleClose}>
            Cancel
          </div>
        </div>
      ) : (
        <div className="w-screen fixed left-0 bottom-0 bg-white px-5 py-6 rounded-t-2xl">
          <div className="flex gap-2">
            <h1 className="text-base xsm:text-lg font-semibold">
              Tapop Device Activated!
            </h1>
            <span
              className="ms-auto text-lg pt-1"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            ></span>
          </div>
          <hr className="text-gray-400 my-6" />
          <div className="flex flex-col justify-center items-center relative">
            {/* <img
              src={require("./images/tapopprofileactivated.png")}
              alt=""
              className=""
            /> */}
            <p className="font-medium text-center py-6">
              Hurray! <br /> Your Tapop device is activated successfully!
            </p>
            <div className="w-full">
              <button onClick={handleClose} width={"100%"}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default DeviceTap;
