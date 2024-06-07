import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useIncident from "../../app/hooks/useIncident";
import { Incident } from "../../app/models/incident";
import moment from "moment";
import useUser from "../../app/hooks/useUser";
import { User } from "../../app/models/user";
import { toast } from "react-toastify";
import { UnlockOutlined, LockOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  date: string;
  nature: string;
  location: string;
}

const Incidents = () => {
  const { getIncidents, isLoading } = useIncident();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { getUser } = useUser();

  useEffect(() => {
    const fetchIncidents = async () => {
      const data = await getIncidents();
      const userData = await getUser();
      setIncidents(data!);
      setUser(userData!);
    };

    fetchIncidents();
  }, []);

  console.log(user);

  const navigate = useNavigate();

  const handleEditLog = (id: string) => {
    navigate(`/log/${id}/update`);
  };

  const handleViewLog = (id: string) => {
    navigate(`/log/${id}`);
  };

  const data: Incident[] = incidents;
  data.map((incident) => {
    incident.key = incident.id!.toString();
    incident.date = moment(incident.date).format("YYYY-MM-DD HH:mm A");
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nature Of Incident",
      dataIndex: "natureOfIncident",
      key: "natureOfIncident",
    },
    {
      title: "Location Of Incident",
      dataIndex: "locationOfIncident",
      key: "locationOfIncident",
    },
    {
      title: "Weather Condition",
      dataIndex: "weatherCondition",
      key: "weatherCondition",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined" onClick={() => handleViewLog(record.id)}>
            View
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              if (record.switchingOfficer == user?.email) {
                navigate(`/log/${record.id}/update`);
              } else {
                toast.error("Sorry, you are not allowed to view this incident");
              }
            }}
            disabled={record.closed == "1"}
          >
            Log
          </Button>
          {record.closed == "0" && <UnlockOutlined />}
          {record.closed == "1" && <LockOutlined />}
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

export default Incidents;
