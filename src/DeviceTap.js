import React, { useState, useEffect } from "react";
import axios from "axios";

import "./devices.css";

import DeviceTap from "./DeviceTap";

const Devices = () => {
  const [dataUnshared, setDataUnshared] = useState([]);
  const [dataShared, setDataShared] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [link, setlink] = useState("");
  const profile = useParams();
  const navigate = useNavigate();
  const fetchProfileData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/profile/profile/${profile.profile}`,
        config
      );
    } catch (error) {
      console.log(error.response.data.error);
      navigate("/login");
    }
  };
  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        `${serverUrl}/device/infoall/${profile.profile}`
      );
      setName(result.data.user[0].name);
      setUserName(result.data.user[0].userName);
      setDataUnshared(result.data.profileUnshared);
      setDataShared(result.data.profileShared);
    }
    fetchProfileData();
    getData();
  }, []);

  const [status, setStatus] = useState(() => {
    if (!("NDEFReader" in window)) {
      return "Web NFC is not available. Please make sure the 'Experimental Web Platform features' flag is enabled on Android.";
    } else {
      return null;
    }
  });

  const write = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/device/link/${profile.profile}`
      );
      // console.log(data[0].link);
      const ndef = new window.NDEFReader();
      ndef
        .write({
          records: [{ recordType: "url", data: data[0].link }],
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

  // profile image
  const { checkVariable, userFullName, username } = useContext(UserContext);
  const [type, setType] = useState("");
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile.profile}`
      );
      if (res.data.length !== 0) {
        setType(res.data[0]._id);
      } else {
        setType("");
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [checkVariable]);

  const [activeUserName, setActiveUserName] = useState("");
  const [image, setImage] = useState("");
  const getData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/connect/getDetail/${profile.profile}/${type}`,
        config
      );
      if (data.length !== 0) {
        setImage(data[0].profileimage);
        setActiveUserName(data[0].firstName);
      } else {
        setImage("");
        setActiveUserName("");
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    if (type) {
      getData();
    } else {
      setImage("");
      setActiveUserName("");
    }
    console.log("ajhadf", type, activeUserName, image, name);
  }, [type, checkVariable]);

  // check device is whether android or iphone
  const [isAndroid, setIsAndroid] = useState(false);
  const [deviceTapOpen, setDeviceTapOpen] = useState(false);

  return (
    <div className="flex h-screen w-full first-container bg-white sm:bg-[#FAFAFA] relative">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text={"Devices"} />
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
            <div className="bg-white md:px-5 pt-6 sm:p-[2.5rem] rounded-[0.5rem] w-full flex flex-col justify-between left-device-container">
              <div>
                {true ? (
                  <div>
                    {dataShared.map((obj, index) => (
                      <div className="active_user_card p-4 sm:p-5" key={index}>
                        <div className="flex justify-center absolute top-[-1rem] w-full text-sm xsm:text-base">
                          <div className="active_tag text-xs">
                            Currently Active
                          </div>
                        </div>
                        <img
                          className="w-[3rem] h-[3rem] xsm:w-[4rem] xsm:h-[4rem] rounded-full"
                          src={image ? image : Pimage}
                        />
                        <div className="ml-4">
                          <div className="text-base font-[600]">
                            {activeUserName ? activeUserName : userFullName}
                          </div>
                          <div className="card_tag bg-[#E5E2FC] text-[#5440D0] text-xs">
                            {obj.type}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="info_card">
                      <div className="w-[1.25rem] h-[1.25rem] flex items-center">
                        <HiInformationCircle />
                      </div>
                      <div className="ml-[1.125rem] text-xs xsm:text-[0.875rem] leading-[1.375rem] font-[500]">
                        To change or deactivate this profile from your Tapop
                        card, scan the following QR code or copy and paste the
                        link into your phone.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="buy_card">
                    <div className="text-base font-[400] mb-[1.25rem]">
                      Don’t have a Tapop device? Explore and buy Tapop devices,
                      and many other products.
                    </div>
                    <PrimaryButton2 text={`Buy Tapop Device`} />
                  </div>
                )}
                {dataUnshared.map((obj, index) => (
                  <div className="user_card p-4 sm:p-5" key={index}>
                    <img
                      className="w-[3rem] h-[3rem] xsm:w-[4rem] xsm:h-[4rem] rounded-full"
                      src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=594&q=80"
                    />
                    <div className="ml-4">
                      <div className="text-base font-[600]">{name}</div>
                      <div className="card_tag bg-[#FDE4FF] text-[#AC3FB6] text-xs">
                        {obj.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="block sm:hidden w-full mt-4">
                <PrimaryButton2
                  text={`Activate Profile`}
                  width={"100%"}
                  onClick={() => {
                    setDeviceTapOpen(true);
                  }}
                />
              </div>
            </div>
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
                    https://tapop.co/devices/{userName}
                  </div>
                  <HiOutlineDocumentDuplicate
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://tapop.co/devices/${userName}`
                      )
                    }
                    className="w-[1.25rem] h-[1.25rem] hover:cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-3">
                <PrimaryButton2
                  text="Activate Profile"
                  color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                  onClick={write}
                />
              </div>
              {window.screen.width < 768 && (
                <DeviceTap
                  isAndroid={isAndroid}
                  open={deviceTapOpen}
                  setOpen={setDeviceTapOpen}
                  username={username}
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
