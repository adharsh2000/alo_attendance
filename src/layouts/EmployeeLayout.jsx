import { Fragment } from "react";
import EmployeeHeader from "./employee/Header";
import EmployeeFooter from "./employee/Footer";

const EmployeeLayout = (props) => {

    const { profileData } = props;

    return (
        <Fragment>
            <EmployeeHeader profileData={profileData} />
            {props.children}
            <EmployeeFooter />
        </Fragment>
    )
}
export default EmployeeLayout;