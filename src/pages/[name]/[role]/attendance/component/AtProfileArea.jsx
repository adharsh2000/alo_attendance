import { Fragment } from "react";
import { Avatar } from "antd";
import ImageTag from "@/helpers/ImageTag";
import One from "@/assets/rect.svg";
import Clock from "@/assets/clock.svg";

const AtProfileArea = ({ profileData,isLoading }) => {
    return (
        <Fragment>
            <div className="parent-module">
                <div className="sub-parent-module">
                    <ImageTag src={One?.src} alt={One?.src} className="bg-img" />
                </div>
                <div className="card-module">
                    {profileData?.profilePicUrl ? <Avatar size={130} src={profileData?.profilePicUrl} /> : <Avatar size={130} src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" />}
                    <div className="card">
                        <h1>{profileData?.userName || "Employee"}</h1>
                        <p>{profileData?.email || "employee@gmail.com"}</p>
                        <h2>{profileData?.designation || "FrontEnd Developer"}</h2>
                        <p><ImageTag src={Clock?.src} alt={Clock?.src} className="clock-img" />{profileData?.shiftTiming || "09.00AM to 08.00PM"}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AtProfileArea;