import {useEffect} from "react";
import {Form, Input, Button, Checkbox, notification} from 'antd';
import axios from "axios";

export const EditContactPage = ({ selectedContact, setIsModalVisible }: any) => {

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(values => {
            axios.patch(`/contact/${selectedContact.id}`, values).then((res) => {
                notification["success"]({
                    message: 'Success',
                    description: res.data.message,
                });
                form.resetFields();
                setIsModalVisible(false);
            }).catch((err) => {
                notification["error"]({
                    message: 'Error',
                    description: err.response.data.message,
                });
            });
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: selectedContact.name,
            phone_no: selectedContact.phone_no,
        });
    }, [selectedContact]);

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phone_no"
                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
                <Input />
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    Edit
                </Button>
            </div>
        </Form>
    )
}