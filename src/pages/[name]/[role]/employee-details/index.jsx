
import { Fragment } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import dynamic from "next/dynamic";
import Seo from "@/helpers/Seo";

const EmProfileArea = dynamic(() => import('./component/EmProfileArea'), { ssr: false })
const EmTable = dynamic(() => import('./component/EmTable'), { ssr: false })


const Admin = () => {
    return (
        <Fragment>
            <Seo title="Employee Details" />
            <main>
                <AdminLayout>
                    <EmProfileArea />
                    <EmTable />
                </AdminLayout>
            </main>
        </Fragment>

    )
}
export default Admin;