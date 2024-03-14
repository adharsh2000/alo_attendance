import { Fragment, useEffect, useRef, useState } from "react";
import { QuestionCircleOutlined, SortAscendingOutlined } from '@ant-design/icons';
import ImageTag from "@/helpers/ImageTag";
import Time from "@/assets/time.svg";
import Del from "@/assets/del.svg";
import Edit from "@/assets/edit.svg";
import Clock from "@/assets/clock.svg";
import Search from "@/assets/sea.svg";
import { Avatar, Button, Input, Pagination, Popconfirm, message } from "antd";
import StaffForm from "./EmForm";
import StaffUpdateForm from "./EmUpdateForm"
import LinkTag from "@/helpers/LinkTag";
import Loader from "@/components/Loader";
import { deleteEmployee, getAllEmployees, getRoles } from "@/services/all/all";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Paginator from "@/components/Paginator";
import useDebounce from "@/hooks";

const EmTable = () => {
    const queryClient = useQueryClient();
    const [splitId, setSplitId] = useState(null);
    const [open, setOpen] = useState(false);
    const [editOpen,setEditopen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [empData,setEmpdata] = useState({})
    const [total,setTotal] = useState(0)
    const [search,setSearch] = useState("")
    const [page,setPage] = useState(1);

    const showModal = (e) => {
        setSplitId(e)
        setOpen(true);
    };

    const inputRef = useRef(null)

    useEffect(() => {
        if (search.trim() !== "") {
            inputRef.current.focus();
            // console.log(inputRef.current.getAttribute("data-time"));
        }
    }, [search]);
    
    const onClose = () => {
        setOpen(false);
    };

    const onEditClose = () => {
        setEditopen(false)
    }
    const debounceSearch = useDebounce(search,500)
    const { data, isLoading, isError } = useQuery(['employees',debounceSearch,page], () => getAllEmployees(search,page-1));
    const { data: rolesData, isLoading: isRolesLoading, isError: isRolesError } = useQuery('roles', getRoles);
    useEffect(() => {
        setTotal(data?.data?.length)
    },[data?.data])

    const mutation = useMutation((id) => deleteEmployee(id), {
        onSuccess: (data) => {
          // Invalidate the query cache after successful deletion
          queryClient.invalidateQueries({
            queryKey:["employees"]
          });
          console.log('Item deleted successfully');
          message.success(data?.message)
        },
        onError: (error) => {
          console.error('Error deleting item:', error);
          // Handle error, e.g., show an error message
        },
      });

    const handleDelete = (id) => {
        mutation.mutate(id)
    }

    return (
        isLoading ? 
                <Loader message="Loading..." height="50vh" />
                 : 
                    <Fragment>
                        <div className="admin-table">
                            <div className="admin-table-parent">
                                <div className="admin-head">
                                    <h1>Employees ({data?.data?.totalCount}) </h1>
                                </div>
                                <div className="admin-search">
                                    <div>
                                        <Input data-time="2000-cheking" ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} prefix={<ImageTag src={Search?.src} alt={Search?.src} />} />
                                    </div>
                                    <div>
                                        <button onClick={() => showModal("Add")} > + Add Employee</button>
                                    </div>
                                </div>
                            </div>
            
                            <table className="ad-table">
                                <thead>
                                    <th className="txt-center">Image</th>
                                    <th>Employee <SortAscendingOutlined /></th>
                                    <th>Position <SortAscendingOutlined /></th>
                                    <th>Date of Joining <SortAscendingOutlined /></th>
                                    <th>Salary <SortAscendingOutlined /></th>
                                    <th>Attendence <SortAscendingOutlined /></th>
                                    <th><ImageTag src={Time?.src} alt={Time?.src} />Action <SortAscendingOutlined /></th>
                                </thead>
                                <tbody>
                                    {data?.data?.data?.map((item, a) => (
                                        <tr key={a}>
                                            <td className="txt-center">  <Avatar size={35} src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" /> </td>
                                            <td>
                                                <span className="nam">{item?.userName}</span><br></br>
                                                <span className="pos">{item?.designation}</span>
                                            </td>
                                            <td className="red">{item?.designation}</td>
                                            <td><ImageTag src={Clock?.src} alt={Clock?.src} className="clock" />04 Jun 2021</td>
                                            <td>₹ 7.5 lPA</td>
                                            <td>
                                                <LinkTag href={`/natarajan/employee/employee-details/${item?._id}?username=${item?.userName}`} label={
                                                    <button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                            <g opacity="0.5">
                                                                <path d="M23.7049 11.745C22.8228 9.46324 21.2914 7.48996 19.3 6.06906C17.3086 4.64817 14.9445 3.84193 12.4999 3.75C10.0553 3.84193 7.69122 4.64817 5.69983 6.06906C3.70844 7.48996 2.17705 9.46324 1.29493 11.745C1.23535 11.9098 1.23535 12.0902 1.29493 12.255C2.17705 14.5368 3.70844 16.51 5.69983 17.9309C7.69122 19.3518 10.0553 20.1581 12.4999 20.25C14.9445 20.1581 17.3086 19.3518 19.3 17.9309C21.2914 16.51 22.8228 14.5368 23.7049 12.255C23.7645 12.0902 23.7645 11.9098 23.7049 11.745ZM12.4999 18.75C8.52493 18.75 4.32493 15.8025 2.80243 12C4.32493 8.1975 8.52493 5.25 12.4999 5.25C16.4749 5.25 20.6749 8.1975 22.1974 12C20.6749 15.8025 16.4749 18.75 12.4999 18.75Z" fill="black" />
                                                                <path d="M12.5 7.5C11.61 7.5 10.74 7.76392 9.99994 8.25839C9.25991 8.75285 8.68314 9.45566 8.34254 10.2779C8.00195 11.1002 7.91283 12.005 8.08647 12.8779C8.2601 13.7508 8.68869 14.5526 9.31802 15.182C9.94736 15.8113 10.7492 16.2399 11.6221 16.4135C12.495 16.5872 13.3998 16.4981 14.2221 16.1575C15.0443 15.8169 15.7471 15.2401 16.2416 14.5001C16.7361 13.76 17 12.89 17 12C17 10.8065 16.5259 9.66193 15.682 8.81802C14.8381 7.97411 13.6935 7.5 12.5 7.5ZM12.5 15C11.9067 15 11.3266 14.8241 10.8333 14.4944C10.3399 14.1648 9.95543 13.6962 9.72836 13.148C9.5013 12.5999 9.44189 11.9967 9.55765 11.4147C9.6734 10.8328 9.95912 10.2982 10.3787 9.87868C10.7982 9.45912 11.3328 9.1734 11.9147 9.05764C12.4967 8.94189 13.0999 9.0013 13.6481 9.22836C14.1962 9.45542 14.6648 9.83994 14.9944 10.3333C15.3241 10.8266 15.5 11.4067 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2957 15 12.5 15Z" fill="black" />
                                                            </g>
                                                        </svg>View
                                                    </button>} />
                                            </td>
                                            <td>
                                                <ImageTag src={Edit?.src} alt={Edit?.src} className="edit" onClick={() => {setEditopen(true);setEmpdata(item)}} />&nbsp;&nbsp;
                                                <Popconfirm
                                                    title="Remove the Employee"
                                                    description="Are you sure to remove this employee?"
                                                    icon={
                                                      <QuestionCircleOutlined
                                                        style={{
                                                          color: 'red',
                                                        }}
                                                      />
                                                    }
                                                    onConfirm={() =>handleDelete(item?._id)}
                                                >
                                                <ImageTag src={Del?.src} alt={Del?.src} className="delete" />
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginator page={page} setPage={setPage} totalRecords={data?.data?.totalCount} />
                        </div>
                        <StaffForm open={open} setOpen={setOpen} onClose={onClose} splitId={splitId} roles={rolesData?.data} empData={empData}/>
                        <StaffUpdateForm open={editOpen} setOpen={setEditopen} onClose={onEditClose} splitId={splitId} roles={rolesData?.data} empData={empData} />
                    </Fragment>
    )     
}
export default EmTable;