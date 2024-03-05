import { Fragment, useState } from "react";
import { SortAscendingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ImageTag from "@/helpers/ImageTag";
import Time from "@/assets/time.svg";
import Clock from "@/assets/clock.svg";
import Sun from "@/assets/sun.svg";
import Moon from "@/assets/moon.svg";
import LinkTag from "@/helpers/LinkTag";
import { Pagination, Tabs } from 'antd';
import { useRouter } from "next/router";
import { appTimeSheet, appTimeSheetAdmin } from "@/services/all/all";
import { useQuery } from "react-query";
import { formatDate, formatHours, formatTime } from "@/helpers/Common";
import Paginator from "@/components/Paginator";
import Loader from "@/components/Loader";


const EmAtTable = () => {
    const router = useRouter()
    const [page,setPage] = useState(1);

    const {id,username} = router.query
    // console.log(router,username)
    const { data, isLoading, isError } = useQuery(['admintimesheet',id,page], () =>appTimeSheetAdmin(id,page-1));

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Jan',
            // children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Feb',
            // children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'March',
            // children: 'Content of Tab Pane 3',
        },
    ];

    return (
        isLoading ? (
            <Loader message="Loading..." width="50vh" />
        ) : (
        <Fragment>
            <div className="admin-table">
                <div className="admin-table-parent">
                    <div className="admin-head">
                        <h1> <LinkTag href="/natarajan/employee/employee-details" label={<ArrowLeftOutlined />} />  {username} Attendance</h1>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </div>
                    <div className="admin-search">
                        <div>
                            <button>+ Download CSV</button>
                        </div>
                    </div>
                </div>

                <div className="table-module"><br></br>
                    <table className="myTable">
                        <thead>
                            <th>Date<SortAscendingOutlined /></th>
                            <th>Remarks<SortAscendingOutlined /></th>
                            <th>Login time <SortAscendingOutlined /></th>
                            <th>Break time <SortAscendingOutlined /></th>
                            <th>Logout time <SortAscendingOutlined /></th>
                            <th><ImageTag src={Time?.src} alt={Time?.src} />Working Hours <SortAscendingOutlined /></th>
                        </thead>
                        <tbody>
                            {data?.data?.data?.map((item, a) => (
                            <tr key={a}>
                                <td>{formatDate(item?.date)}</td>
                                <td className="red">Fever</td>
                                <td><ImageTag src={Sun?.src} alt={Sun?.src} />{formatTime(item?.inTime)}</td>
                                <td><ImageTag src={Clock?.src} alt={Clock?.src} className="clock-img" /> 10.00 am - 10.45 am</td>
                                <td><ImageTag src={Moon?.src} alt={Moon?.src} />{formatTime(item?.outTime)}</td>
                                <td><ImageTag src={Clock?.src} alt={Clock?.src} className="clock-img" />{formatHours(item?.totalWorkHours)}</td>
                            </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {/* <tr>
                                <td colSpan={5} className="txt-right total">Nishanth Last 10 Days Working Hours</td>
                                <td>59hrs 52min</td>
                            </tr> */}
                        </tfoot>
                    </table>
                    <Paginator page={page} setPage={setPage} totalRecords={data?.data?.totalCount} />
                </div>
            </div>
                
        </Fragment>
        )
    )
}
export default EmAtTable;