import { Fragment, useEffect, useState } from "react";
import { Input, Modal, Select, message } from "antd";
import { Form, Button, TimePicker } from "antd";
// import { Option } from "antd/es/mentions";
import {  useMutation, useQueryClient } from "react-query";
import { addEmployee, updateEmployee } from "@/services/all/all";
import { PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const EmUpdateForm = (props) => {
  const { open, setOpen, onClose, splitId, roles, empData } = props;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftTiming, setShiftTiming] = useState("9.00AM to 06.00PM");
  const [selectedRole, setSelectedRole] = useState("");

  const [form] = Form.useForm();

  const { Option } = Select;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (empData !== undefined || empData !== null) {
        form.setFieldsValue(empData);
        setSelectedRole(empData.roleId);
        const { sTime, eTime } = parseTimeRange(empData.shiftTiming);
        setStartTime(sTime);
        setEndTime(eTime);
        console.log({sTime,eTime})
    }
}, [empData, form]);

useEffect(() => {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      setShiftTiming(`${formattedStartTime} to ${formattedEndTime}`);

  },[startTime, endTime])

  const parseTimeRange = (timeRange) => {
    if (!timeRange || typeof timeRange !== "string" || !timeRange.includes(" to ")) {
        return { startTime: null, endTime: null };
    }
    
    const [startTime, endTime] = timeRange.split(" to ");

    const parsedStartTime = moment(startTime, ["h:mmA", "hh:mmA"]).format("HH:mm");
    const parsedEndTime = moment(endTime, ["h:mmA", "hh:mmA"]).format("HH:mm");

    return { sTime: parsedStartTime, eTime: parsedEndTime };
};


  const formatTime = (time) => {
    if (!time) {
        return ""; 
      }
    const [hours, minutes] = time?.split(":");
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
    return `${formattedHours.toString().padStart(2, "0")}.${minutes}${period}`;
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeRole = (value) => {
    setSelectedRole(value);
  };

  const mutation = useMutation((formData) => updateEmployee(empData?._id,formData), {
    onSuccess: (data) => {
      console.log("Employee added successfully:", data);
      // Handle success, e.g., show a success message
      message.success("employee Updated Succesfully")
      // form.resetFields();
      // setStartTime("")
      // setEndTime("")
      queryClient.invalidateQueries({
        queryKey:["employees"]
      })
    },
    onError: (error) => {
      // message.error("error?.message")
      console.error("Error adding employee:", error);
      // Handle error, e.g., show an error message
    },
  });

  const onFinish = async (values) => {
    try {
      const formData = {
        ...values,
        shiftTiming: shiftTiming,
        roleId: selectedRole,
      };
      // await axios.post('http://localhost:3000/api/employee/register', values);
      // Handle success, e.g., show a success message
      mutation.mutate(formData);
      //   console.log("Employee added successfully:", formData);
    } catch (error) {
      // Handle error, e.g., show an error message
      //   console.error("Error adding employee:", error);
    }
  };

  return (
    <Fragment>
      <Modal open={open} onOk={onClose} onCancel={onClose}>
        <h1>
          Update Employee
        </h1>
        <Form
          form={form}
          name="add_employee"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{}} // Default value for shiftTiming
        >
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter User Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
            label="Mobile No"
            name="mobileNo"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Mobile No" />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Designation" />
          </Form.Item>
          {/* <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item> */}
          <Form.Item
            label="Shift Timing"
            name="shiftTiming"
            rules={[{ required: true, message: "Please select shift timing" }]}
            validateStatus={form.getFieldError("shiftTiming") ? "error" : ""}
            help={form.getFieldError("shiftTiming")?.[0]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ borderColor: "#d9d9d9", marginRight: 8 }}
              />
              <span>to</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ borderColor: "#d9d9d9", marginLeft: 8 }}
              />
            </div>
            {/* <TimePicker.RangePicker format={"HH:mm"} value={""} onChange={(values) => console.log("Start time:", values[0], "End time:", values[1])} /> */}
          </Form.Item>

          {/* <Form.Item label="Profile Picture URL" name="profilePicUrl">
                <Input placeholder="Enter Profile Picture URL" />
            </Form.Item> */}
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Blood Group" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roleId"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              style={{ width: 200 }}
              value={selectedRole}
              onChange={handleChangeRole}
              placeholder="Select a role"
              >
             {roles?.map((role) => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select> 
          </Form.Item>
          {/* <span>
            <PlusCircleOutlined
              style={{
                marginLeft: "5px",
                color: "#d9d9d9",
                fontSize: "18px",
              }}
            />
                </span> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
              Update Employee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EmUpdateForm;
