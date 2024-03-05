import { Pagination } from "antd";
import React, { useState } from "react";

const Paginator = ({page=1,setPage,totalRecords}) => {
  // const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setPage(page);
  };

  return (
    <div style={{
        marginTop:"15px",
        display:"flex",
        justifyContent:'end'
    }}>
      <Pagination current={page} defaultPageSize={10} onChange={onChange}  total={totalRecords}  />
    </div>
  )
};

export default Paginator;
