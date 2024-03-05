
import { Fragment, useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import EmployeeLayout from "@/layouts/EmployeeLayout";
import Seo from "@/helpers/Seo";
import { useAppEmployeeDashboard, useAppEmployeeTimeSheet } from "@/hooks/all/all";
import { getSessionStorageItem } from "@/helpers/SessionStorage";

const AtProfileArea = dynamic(() => import('./component/AtProfileArea'), { ssr: false })
const AtTable = dynamic(() => import('./component/AtTable'), { ssr: false })
const AtTime = dynamic(() => import('./component/AtTime'), { ssr: false })

const Attendance = () => {

    const id = getSessionStorageItem("id");
    const [profileData, setProfileData] = useState([]);
    const [timeSheetData, setTimeSheetData] = useState([]);
    const { data: profile, refetch: one } = useAppEmployeeDashboard(id);
    const { data: timeSheet, refetch: two, isLoading: loadingTime } = useAppEmployeeTimeSheet(id);

    useEffect(() => {
        if (id) {
            one();
            two();
        }
    }, [id])

    useEffect(() => {
        if (profile || timeSheet) {
            setProfileData(profile?.data);
            setTimeSheetData(timeSheet?.data)
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);
            });
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
    }, [profile, timeSheet])

    return (
        <Fragment>
            <Seo title="Attedance" />
            <main>
                <EmployeeLayout profileData={profileData}>
                    <AtProfileArea profileData={profileData} />
                    <AtTime profileData={profileData} />
                    <AtTable profileData={profileData} timeSheetData={timeSheetData} loadingTime={loadingTime} />
                    <br></br> <br></br> <br></br>
                </EmployeeLayout>
            </main>
        </Fragment>
    )
}

export default Attendance;