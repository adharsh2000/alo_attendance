
import { Fragment, useState, useEffect } from "react";
import { Form, Input, Button, message } from 'antd';
import { useAppLogin } from "@/hooks/auth/auth";
import { useRouter } from "next/router";
import Logo from "@/assets/logo.svg";
import { setSessionStorageItem } from "@/helpers/SessionStorage";
import { setLocalStorageItem } from "@/helpers/LocalStorage";
import withPublicRoute from "@/helpers/PublicRoutes";

const Login = () => {

    const [form] = Form.useForm();
    const router = useRouter();
    const { mutate: appLogin, isLoading: loading } = useAppLogin();
    const [role, setRole] = useState(null);
    const [eName, setEname] = useState(null);

    const onFinish = (values) => {
        let formData = JSON.stringify(values)
        appLogin(formData, {
            onSuccess: (item) => {
                if (item.code === 200) {
                    message.success(item?.message);
                    setSessionStorageItem("role", item?.data?.data?.roleData?.role);
                    setSessionStorageItem("id", item?.data?.data?.userId);
                    setSessionStorageItem("token", item?.data?.token);
                    setRole(item?.data?.data?.roleData?.role);
                    setEname(item?.data?.data?.userName);
                    const userData = JSON.stringify(item?.data)
                    setSessionStorageItem("user",userData)
                }
            },
            onError: (error) => {
                message.error("Something went wrong..");
                console.log(error)
            }
        });
    }

    const validateMessages = {
        required: 'Enter Your Email Address!',
        types: {
            email: 'Enter valid Email Address!',
        }
    }

    const initialValues = {
        email: 'nishanth@gmail.com',
        password: 'nishanth@123',
    };

    useEffect(() => {
        if (role !== null) {
            if (role === "Admin") {
                router.push(`/${eName?.toLowerCase()}/${role?.toLowerCase()}/employee-details`)
            } else {
                router.push(`/${eName?.toLowerCase()}/${role?.toLowerCase()}/attendance`)
            }
        }
    }, [role])

    return (
        <Fragment>
            <div className="sign-in">
                <div className="sign-carousel txt-center">
                    <h1><span>Attendance</span> Made Easy </h1>
                    <h2>Productivity on Display</h2>
                </div>
                <div className="sign-form">
                    <img src={Logo?.src} alt={Logo?.src} className="people" />
                    <h5>Welcome back!</h5>
                    <p>Start managing your team</p>
                    <Form
                        form={form}
                        name="sign_in"
                        onFinish={onFinish}
                        autocomplete="off"
                        validateMessages={validateMessages}
                        initialValues={initialValues}
                        layout="vertical">
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input placeholder="Enter Your Email" maxLength={35} />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter Your Password!" }]}>
                            <Input.Password className="pass" placeholder="Password" maxLength={35} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>Lets go ! </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </Fragment>
    )
}
export default withPublicRoute(Login);