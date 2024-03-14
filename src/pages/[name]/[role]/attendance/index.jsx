
import { Fragment, useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import EmployeeLayout from "@/layouts/EmployeeLayout";
import Seo from "@/helpers/Seo";
import { useAppEmployeeDashboard, useAppEmployeeTimeSheet } from "@/hooks/all/all";
import { getSessionStorageItem } from "@/helpers/SessionStorage";
import withProtectedRoute from "@/helpers/ProtectedRoutes";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { appEmployeeDashboard, appTimeSheet } from "@/services/all/all";

const AtProfileArea = dynamic(() => import('./component/AtProfileArea'), { ssr: false })
const AtTable = dynamic(() => import('./component/AtTable'), { ssr: false })
const AtTime = dynamic(() => import('./component/AtTime'), { ssr: false })

const Attendance = () => {

    const id = getSessionStorageItem("id");
    const router = useRouter()
    const {userid} = router.query;
    const [empId,setEmpid] = useState(null)
    // const [profileData, setProfileData] = useState([]);
    // const [timeSheetData, setTimeSheetData] = useState([]);
    // const { data: profile, refetch: one } = useAppEmployeeDashboard(id);
    // const { data: timeSheet, refetch: two, isLoading: loadingTime } = useAppEmployeeTimeSheet(id);
    console.log({id:id,userid:userid})
    useEffect(() => {
        if(id === null || userid === null) return
        if (id) {
            setEmpid(id)
        }else{
            setEmpid(userid)
        }
    }, [])

    const { data:profileData , isLoading} = useQuery(["appEmployeeDashboard",userid],() => appEmployeeDashboard(userid))
    const { data:timeSheetData , isLoading:loadingTime} = useQuery(["appTimeSheet",userid],() => appTimeSheet(userid))
    
    // useEffect(() => {
    //     if (id) {
    //         one();
    //         two();
    //     }
    // }, [id])

    // useEffect(() => {
    //     if (profile || timeSheet) {
    //         setProfileData(profile?.data);
    //         setTimeSheetData(timeSheet?.data?.timeSheetDetails)
    //     }
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //           const latitude = position.coords.latitude;
    //           const longitude = position.coords.longitude;
    //           console.log("Latitude:", latitude);
    //           console.log("Longitude:", longitude);
    //         });
    //       } else {
    //         console.error("Geolocation is not supported by this browser.");
    //       }
    // }, [profile, timeSheet])

    return (
        <Fragment>
            <Seo title="Attedance" />
            <main>
                <EmployeeLayout profileData={profileData?.data}>
                    <AtProfileArea profileData={profileData?.data} isLoading={isLoading}/>
                    <AtTime profileData={profileData?.data} />
                    <AtTable profileData={profileData?.data} timeSheetData={timeSheetData?.data} loadingTime={loadingTime} />
                    <br></br> <br></br> <br></br>
                </EmployeeLayout>
            </main>
        </Fragment>
    )
}

export default withProtectedRoute(Attendance);