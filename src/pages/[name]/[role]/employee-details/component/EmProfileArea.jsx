import { Fragment, useState } from "react";
import { Avatar } from "antd";
import ImageTag from "@/helpers/ImageTag";
import One from "@/assets/rect.svg";
import { Skeleton } from 'antd';

const EmProfileArea = () => {
    const [loading,setLoading] = useState(false)

    function showSkeleton () {
        return(
            <div style={{display:"flex",flexDirection:'column',gap:"10px"}}>
            <Skeleton.Avatar active size={"large"} shape="default" />
            <Skeleton.Input active size={"large"} shape="default"  />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="admin-module">
                <div className="sub-admin-module">
                    <ImageTag src={One?.src} alt={One?.src} className="bg-img" />
                </div>
                <div className="card-admin-module">
                    <div className="card">
                        <Avatar size={130} src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" />
                        <h1>Natarajan</h1>
                        <p>nataraj@alo groups.com</p>
                        <h2>CEO</h2>
                    </div>
                    <div className="count">
                        <div className="one">
                            {
                                loading ? 
                                showSkeleton()
                                :
                                <>
                                <h1>97</h1>
                                <p>Total Employees</p>
                                </>
                            }
                        </div>
                        <div className="two">
                            {
                                loading ? 
                                showSkeleton()
                                :
                                <>
                                <h1>97</h1>
                                <p>Active Employees</p>
                                </>
                            }
                        </div>
                        <div className="three">
                            {
                                loading ? 
                                showSkeleton()
                                :
                                <>
                                <h1>97</h1>
                                <p>InActive Employees</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EmProfileArea;