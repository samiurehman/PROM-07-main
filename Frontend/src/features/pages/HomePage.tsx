import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  date: string;
  nature: string;
  location: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const data: DataType[] = [
    {
      key: "1",
      date: "5th February, 2020",
      nature:
        "minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      date: "20th November, 2015",
      nature:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
      location: "London No. 1 Lake Park",
    },
    {
      key: "3",
      date: "29th January, 2016",
      nature:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
      location: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      date: "1st January, 2018",
      nature:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
      location: "No 5. Forest Drive, Nottingham",
    },
    {
      key: "5",
      date: "23rd January, 2023",
      nature:
        "sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
      location: "Clanny House, Peacock Street",
    },
    {
      key: "6",
      date: "22nd December, 2022",
      nature:
        "voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidata...",
      location: "Woodvale Gardens, Indiana",
    },
  ];
  const handleEditLog = () => {
    navigate("/log/1/edit");
  };

  const handleViewLog = () => {
    navigate("/log/1");
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nature Of Incident",
      dataIndex: "nature",
      key: "nature",
    },
    {
      title: "Location Of Incident",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined" onClick={handleViewLog}>
            View
          </Button>
          <Button variant="outlined" color="warning" onClick={handleEditLog}>
            Log
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Typography variant="h6" gutterBottom>
        All Incident Logs
      </Typography>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default HomePage;
