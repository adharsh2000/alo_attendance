import { Fragment } from "react";
import { SortAscendingOutlined } from '@ant-design/icons';
import ImageTag from "@/helpers/ImageTag";
import Time from "@/assets/time.svg";
import Clock from "@/assets/clock.svg";
import Sun from "@/assets/sun.svg";
import Date from "@/assets/clocks.svg";
import Moon from "@/assets/moon.svg";
import { formatDate, formatHours, formatTime } from "@/helpers/Common";

const AtTable = ({ timeSheetData, profileData, loadingTime }) => {
    return (
        <Fragment>
            <div className="table-module">
                <table className="myTable">
                    <thead>
                        <th><ImageTag src={Date?.src} alt={Date?.src} />Date <SortAscendingOutlined /></th>
                        <th>Login Time <SortAscendingOutlined /></th>
                        {/* <th>Break Time <SortAscendingOutlined /></th> */}
                        {/* <th>Break Time Permission Remarks</th> */}
                        <th>Logout Time <SortAscendingOutlined /></th>
                        <th>Log out Remarks <SortAscendingOutlined /></th>
                        <th><ImageTag src={Time?.src} alt={Time?.src} />Working Hours <SortAscendingOutlined /></th>
                    </thead>
                    <tbody>
                        {loadingTime ? (
                            <div className="table-loading">loading...</div>
                        ) : timeSheetData === null || timeSheetData === undefined || timeSheetData?.length === 0 ? (
                            <div>
                                <h1 className="no-data">No Data Found</h1>
                            </div>
                        ) : timeSheetData?.map((item, a) => (
                            <tr key={a}>
                                <td>{formatDate(item?.date)}</td>
                                <td><ImageTag src={Sun?.src} alt={Sun?.src} /> {item?.inTime === "Invalid date" ? "-" : formatTime(item?.inTime)}</td>
                                {/* <td><ImageTag src={Clock?.src} alt={Clock?.src} className="clock-img" /> dummy</td> */}
                                {/* <td>-</td> */}
                                <td><ImageTag src={Moon?.src} alt={Moon?.src} /> {item?.outTime === null ? "-" : formatTime(item?.outTime)}</td>
                                <td className="red">{item?.remarks || "-"}</td>
                                <td><ImageTag src={Clock?.src} alt={Clock?.src} className="clock-img" /> {formatHours(item?.totalWorkHours) || "-"} </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="txt-right total">{profileData?.userName} Last {timeSheetData?.length} Days Working Hours</td>
                            <td>-</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </Fragment>
    )
}
export default AtTable;