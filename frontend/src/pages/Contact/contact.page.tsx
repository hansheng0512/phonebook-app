import {Modal, Space, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {EditContactPage} from "./edit-contact.page";
import {Contact} from "../../models/dto/contact.dto";

export const ContactPage = () => {

    const [dataSource, setDataSource] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact>();

    const getContactList = () => {
        axios.get('/contact').then(res => {
            setDataSource(res.data);
        });
    }

    const onDeleteContact = () => {
        axios.delete(`/contact/${selectedContact?.id}`).then(res => { }).finally(() => {
            getContactList();
            setIsDeleteModalVisible(false);
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_no',
            key: 'phone_no',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: any, record: any) => {
                return (
                    <Space direction={"horizontal"} style={{ width: '100%' }}>
                        <a onClick={() => {
                            setSelectedContact(record);
                            setIsEditModalVisible(true);
                        }}>Edit</a>
                        <a onClick={() => {
                            setSelectedContact(record);
                            setIsDeleteModalVisible(true);
                        }}>Delete</a>
                    </Space>
                )
            },
        },
    ];

    const onCloseEditModal = () => {
        setIsEditModalVisible(false);
        getContactList()
    }

    useEffect(() => {
        getContactList()
    }, [])

    useEffect(() => {
        setSelectedContact(selectedContact)
    }, [selectedContact])

    return (
        <>
            <Table dataSource={dataSource} columns={columns} />

            <Modal title="Edit Contact" visible={isEditModalVisible} footer={null} onOk={() => setIsEditModalVisible(false)} onCancel={() => setIsEditModalVisible(false)}>
                <EditContactPage selectedContact={selectedContact} setIsModalVisible={() => onCloseEditModal()} />
            </Modal>

            <Modal title="Delete Contact" visible={isDeleteModalVisible} onOk={() => onDeleteContact()} onCancel={() => setIsDeleteModalVisible(false)}>
                <p>Are you sure want to delete {selectedContact?.name}?</p>
            </Modal>
        </>
    )
}