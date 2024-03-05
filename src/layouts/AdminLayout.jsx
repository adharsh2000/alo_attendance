import { Fragment } from "react";
import AdminHeader from "./admin/Header";
import Adminfooter from "./admin/Footer";


const AdminLayout = (props) => {
    return (
        <Fragment>
            <AdminHeader />
            {props.children}
            <Adminfooter />
        </Fragment>
    )
}
export default AdminLayout;