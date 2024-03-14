
import { Fragment, useEffect, useState } from "react";
import ImageTag from "@/helpers/ImageTag";
import In from "@/assets/sign-in.svg";
import Out from "@/assets/sign-out.svg";
import One from "@/assets/two.svg";
import Two from "@/assets/one.svg";
import { Input, Modal, message } from "antd";
import { useLoginDashboard, useLogoutDashboard } from "@/hooks/all/all";
import { removeSessionStorageItem } from "@/helpers/SessionStorage";
import { useQueryClient } from "react-query";

const { TextArea } = Input;
const now = new Date();
// const format = new Date(now.getTime() + (5 * 60 + 30) * 60000)
const format = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)

const Time = ({ profileData }) => {
    const queryClient = useQueryClient()
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isBreakOpen, setIsBreakOpen] = useState(false);
    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(null);
    const [location, setLocation] = useState(null);
    const [remark, setRemark] = useState(null);
    const { mutate: login } = useLoginDashboard();
    const { mutate: logout } = useLogoutDashboard();

    const openLogin = () => {
        setIsLoginOpen(true);
    };

    const okLogin = () => {
        const val = {
            "inTime": format,
            "inLatitude": location?.latitude,
            "inLongitude": location?.longitude,
            "employeeId": profileData?._id
        }
        login(val, {
            onSuccess: (item) => {
                if (item.code === 200) {
                    message.success(item?.message);
                    queryClient.refetchQueries({
                        queryKey:["appEmployeeDashboard"]
                    })
                }
            },
            onError: (error) => {
                console.log(error)
            }
        });
        setIsLoginOpen(false);
    };

    const cancelLogin = () => {
        setIsLoginOpen(false);
    };

    useEffect(() => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);


    const openBreak = () => {
        setIsBreakOpen(true);
    };
    const okBreak = () => {
        setIsBreakOpen(false);
    };
    const cancelBreak = () => {
        setIsBreakOpen(false);
    };

    const openLogOut = () => {
        setIsLogOutOpen(true);
    };

    const textValue = (val) => {
        setRemark(val.target.value)
    }

    const okLogOut = () => {
        const val = {
            "outTime": format,
            "outLatitude": location?.latitude,
            "outLongitude": location?.longitude,
            "remarks": remark,
            "employeeId": profileData?._id,
            "_id": profileData?.log_id
        }
        logout(val, {
            onSuccess: (item) => {
                if (item.code === 200) {
                    message.success(item?.message);
                    removeSessionStorageItem("log_id");
                    setRemark(null);
                    queryClient.refetchQueries({
                        queryKey:["appEmployeeDashboard"]
                    })
                }
            },
            onError: (error) => {
                console.log(error)
            }
        });
        setIsLogOutOpen(false);
    };
    const cancelLogOut = () => {
        setIsLogOutOpen(false);
    };

    const updateDateTime = () => {
        const now = new Date();

        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        const timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // Use 12-hour clock
        };
        const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
        const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

        const currentDateTime = ` ${dateString} ${timeString}`;
        setCurrentDateTime(currentDateTime);
    };

    // useEffect(() => {
    //     setInterval(updateDateTime, 1000);
    // })
    // useEffect(() => {
    //     setInterval(updateDateTime);
    // }, [])

    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
    
        return () => clearInterval(intervalId); // Clear interval on unmount
    }, []); // Empty dependency array to run effect only once
    
    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
    
        return () => clearInterval(intervalId); // Clear interval on unmount
    }, []);

    return (
        <Fragment>
            <div className="time-module">
                <h1>{currentDateTime}</h1>
                <div className="session-module">
                    <div className="log-in">
                        <button onClick={openLogin} disabled={profileData?.loginStatus}><ImageTag src={In?.src} alt={In?.src} />Login</button>
                    </div>
                    {/* <div className="break">
                        <button onClick={openBreak}>Break Time</button>
                    </div> */}
                    <div className="log-out">
                        <button onClick={openLogOut} disabled={!profileData?.loginStatus}>Logout<ImageTag src={Out?.src} alt={Out?.src} /></button>
                    </div>
                </div>
            </div>

            {/*  Login */}
            <Modal open={isLoginOpen} onOk={okLogin} onCancel={cancelLogin}>
                <div className="popup">
                    <ImageTag src={One?.src} alt={One?.src} />
                    <h3>Hey {profileData?.userName}!</h3>
                    <h3> do you want to login now?</h3>
                    <div className="lg-btn">
                        <div className="lg-one">
                            <button onClick={cancelLogin}>No</button>
                        </div>
                        <div className="lg-two">
                            <button onClick={okLogin}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/*  Break */}
            <Modal open={isBreakOpen} onOk={okBreak} onCancel={cancelBreak}>
                <div className="popup">
                    <ImageTag src={One?.src} alt={One?.src} />
                    <h3>Hey {profileData?.userName}!</h3>
                    <h3> do you want to break now?</h3>
                    <div className="lg-btn">
                        <div className="lg-one">
                            <button onClick={cancelBreak}>No</button>
                        </div>
                        <div className="lg-two">
                            <button>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/*  Logout */}
            <Modal open={isLogOutOpen} onOk={okLogOut} onCancel={cancelLogOut}>
                <div className="popup">
                    <ImageTag src={Two?.src} alt={Two?.src} />
                    <h3>Hey {profileData?.userName}!</h3>
                    <h3> Are you sure? you want to logout now?</h3>
                    <br></br>
                    <TextArea showCount rows={4} placeholder="Remarks" maxLength={100} onChange={textValue} />
                    <div className="lg-btn">
                        <div className="lg-one">
                            <button onClick={cancelLogOut}>No</button>
                        </div>
                        <div className="lg-two">
                            <button onClick={okLogOut}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </Fragment>
    )
}

export default Time;