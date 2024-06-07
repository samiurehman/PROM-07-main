import { Button, Typography } from "@mui/material";
import { Space, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import useUser from "../../app/hooks/useUser";
import { User } from "../../app/models/user";

const AllUsers = () => {
  const { getUsers, isLoading } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getUsers();
      setUsers(data!);
    };

    fetchAllUsers();
  }, []);

  const data: User[] = users;

  const columns: TableProps<User>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (i, text) => (
        <a>{Boolean(text) == true ? "Active" : "Inactive"}</a>
      ),
    },

    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      render: (i, text) => <a>{text.Role.name}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined">View</Button>
          <Button variant="outlined" color="warning">
            Lock
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Employee List
      </Typography>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default AllUsers;
