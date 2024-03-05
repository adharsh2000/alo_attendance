import { Fragment } from "react";

const AdminFooter = () => {
    return (
        <Fragment>
            <div className="mini-footer">
                <p>&copy; {new Date().getFullYear()}, Alo groups Pvt. Ltd. All Rights Reserved</p>
            </div>
        </Fragment>
    )
}
export default AdminFooter;