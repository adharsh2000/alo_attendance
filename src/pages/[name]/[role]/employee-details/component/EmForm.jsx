import { Fragment, useEffect, useState } from "react";
import { Input, Modal, Select, message } from "antd";
import { Form, Button, TimePicker } from "antd";
// import { Option } from "antd/es/mentions";
import {  useMutation, useQueryClient } from "react-query";
import { addEmployee } from "@/services/all/all";
import { PlusCircleOutlined } from "@ant-design/icons";

const EmForm = (props) => {
  const { open, setOpen, onClose, splitId, roles, empData } = props;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftTiming, setShiftTiming] = useState("9.00AM to 06.00PM");
  const [selectedRole, setSelectedRole] = useState("");

  const [form] = Form.useForm();

  const { Option } = Select;
  const queryClient = useQueryClient();

  useEffect(() => {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    setShiftTiming(`${formattedStartTime} to ${formattedEndTime}`);
  }, [startTime, endTime, splitId, empData, form]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
    return `${formattedHours.toString().padStart(2, "0")}.${minutes}${period}`;
  };


  const handleChangeRole = (value) => {
    setSelectedRole(value);
    console.log(selectedRole);
  };

  const mutation = useMutation((formData) => addEmployee(formData), {
    onSuccess: (data) => {
      console.log("Employee added successfully:", data);
      // Handle success, e.g., show a success message
      message.success("employee Added Succesfully")
      form.resetFields();
      setStartTime("")
      setEndTime("")
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
        profilePicUrl:
          "https://i.pinimg.com/1200x/36/ce/cf/36cecfb5367b10187d0b2ca80f0e037d.jpg",
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
          Add Employee
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
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
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
            <Button type="primary" htmlType="submit">
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EmForm;
