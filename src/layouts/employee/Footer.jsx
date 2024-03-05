import { Fragment } from "react";

const EmployeeFooter = () => {
    return (
        <Fragment>
            <div className="mini-footer">
                <p>&copy; {new Date().getFullYear()}, Alo groups Pvt. Ltd. All Rights Reserved</p>
            </div>
        </Fragment>
    )
}
export default EmployeeFooter;