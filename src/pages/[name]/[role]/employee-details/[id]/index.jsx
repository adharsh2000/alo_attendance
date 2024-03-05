import { Fragment } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import dynamic from "next/dynamic";


const EmProfileArea = dynamic(() => import('../component/EmProfileArea'), { ssr: false })
const EmAtTable = dynamic(() => import('./component/EmAtTable'), { ssr: false })




const ParticulaEmployeeAttendance = () => {

    return (
        <Fragment>
            <AdminLayout>
                <EmProfileArea />
                <EmAtTable />
            </AdminLayout>
        </Fragment>
    )
}
export default ParticulaEmployeeAttendance;