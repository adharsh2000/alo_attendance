import { Fragment, Suspense } from "react";
import EmployeeHeader from "./employee/Header";
import EmployeeFooter from "./employee/Footer";
import Loader from "@/components/Loader";

const EmployeeLayout = (props) => {

    const { profileData } = props;

    return (
        <Suspense fallback={<Loader height="100vh" />}>
        <Fragment>
            <EmployeeHeader profileData={profileData} />
            {props.children}
            <EmployeeFooter />
        </Fragment>
        </Suspense>
    )
}
export default EmployeeLayout;

// import { Fragment, useState, useEffect } from "react";
// import EmployeeHeader from "./employee/Header";
// import EmployeeFooter from "./employee/Footer";
// import Loader from "@/components/Loader";

// const EmployeeLayout = (props) => {
//     const { profileData } = props;
//     const [isLoading, setIsLoading] = useState(true); 

//     useEffect(() => {
//         setTimeout(() => {
//             setIsLoading(false); 
//         }, 2000); 
//     }, []);

//     return (
//         isLoading ? (
//             <Loader height="100vh" /> 
//             ) : (
//                 <Fragment>
//                     <EmployeeHeader profileData={profileData} />
//                         {props.children} 
//                     <EmployeeFooter />
//                 </Fragment>
//             )
//     );
// };

// export default EmployeeLayout;
