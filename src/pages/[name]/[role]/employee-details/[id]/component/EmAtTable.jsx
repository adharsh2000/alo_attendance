import { Fragment } from "react";
import { SortAscendingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ImageTag from "@/helpers/ImageTag";
import Time from "@/assets/time.svg";
import Clock from "@/assets/clock.svg";
import Sun from "@/assets/sun.svg";
import Moon from "@/assets/moon.svg";
import LinkTag from "@/helpers/LinkTag";
import { Pagination, Tabs } from 'antd';
import { useRouter } from "next/router";
import { appTimeSheet } from "@/services/all/all";
import { useQuery } from "react-query";
import { formatDate, formatHours, formatTime } from "@/helpers/Common";
import Paginator from "@/components/Paginator";


const EmAtTable = () => {
    const router = useRouter()

    const {id} = router.query
    console.log(id)
    const { data, isLoading, isError } = useQuery(['timesheet',id], () =>appTimeSheet(id));

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
        <Fragment>
            <div className="admin-table">
                <div className="admin-table-parent">
                    <div className="admin-head">
                        <h1> <LinkTag href="/natarajan/employee/employee-details" label={<ArrowLeftOutlined />} />  Nishanth Attendance</h1>
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
                            {data?.data?.map((item, a) => (
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
                            <tr>
                                <td colSpan={5} className="txt-right total">Nishanth Last 10 Days Working Hours</td>
                                <td>59hrs 52min</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
                
        </Fragment>
    )
}
export default EmAtTable;