import { Fragment, useState } from "react";
import { Avatar, Drawer } from "antd"
import ImageTag from "@/helpers/ImageTag";
import Logo from "@/assets/logo.svg";
import { LogoutOutlined } from "@ant-design/icons";
import { removeSessionStorageItem } from "@/helpers/SessionStorage";
import { useRouter } from "next/router";

const AdminHeader = () => {
    let router = useRouter();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        removeSessionStorageItem("role");
        removeSessionStorageItem("token");
        removeSessionStorageItem("id");
        removeSessionStorageItem("log_id");
        removeSessionStorageItem("user");
        router.push("/")
    }

    return (
        <Fragment>
            <div className="main-header">
                <div className="sub-header">
                    <div className="logo-area">
                        <ImageTag src={Logo.src} alt={Logo.src} className="logo" />
                    </div>
                    <div className="profile-area" onClick={showDrawer}>
                        <Avatar src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" />
                        <div className="split-profile">
                            <h1>Natarajan</h1>
                            <p>Proprietor</p>
                        </div>
                        <div className="logout"><LogoutOutlined onClick={logOut} /></div>
                    </div>
                </div>
            </div>

            {/* <Drawer placement="right" onClose={onClose} open={open}>
                <h1>Profile</h1>
            </Drawer> */}
        </Fragment>
    )
}
export default AdminHeader;