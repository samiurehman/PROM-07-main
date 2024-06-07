import { Typography } from "@mui/material";
import { Card, Col, Row } from "antd";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";
import useIncident from "../../app/hooks/useIncident";
import { Incident } from "../../app/models/incident";
import useUser from "../../app/hooks/useUser";
import { User } from "../../app/models/auth";

const dataset = [
  { name: "January", code: "Jan", cases: 471 },
  { name: "February", code: "Feb", cases: 583 },
  { name: "March", code: "Mar", cases: 90.35 },
  { name: "April", code: "Apr", cases: 71.6 },
  { name: "May", code: "May", cases: 291 },
  { name: "June", code: "Jun", cases: 400 },
  { name: "July", code: "Jul", cases: 283 },
  { name: "August", code: "Aug", cases: 2779 },
  { name: "September", code: "Sep", cases: 4082 },
  { name: "October", code: "Oct", cases: 218 },
  { name: "November", code: "Nov", cases: 177 },
  { name: "December", code: "Dec", cases: 533 },
];

const chartParams: BarChartProps = {
  yAxis: [
    {
      label: "No Of Cases",
    },
  ],
  series: [
    {
      label: "Incidents",
      dataKey: "cases",
    },
  ],
  slotProps: { legend: { hidden: true } },
  dataset,
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const Dashboard = () => {
  const { getIncidents } = useIncident();
  const { getUser } = useUser();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      const incidentData = await getIncidents();
      const userData = await getUser();
      setIncidents(incidentData!);
      setUser(userData!);
    };

    fetchIncidents();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Typography variant="h6" gutterBottom>
            Welcome, {user?.firstName}
          </Typography>
        </Col>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <img
            src="/Durham-Police.png"
            alt="Durham Police"
            className="img-fluid"
            style={{ height: "70vh", width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <Card
            title="Incidents"
            bordered={false}
            style={{ backgroundColor: "burlywood" }}
          >
            <div className="flex justify-center items-center">
              <Typography variant="h3" gutterBottom>
                {incidents.length}
              </Typography>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Open Incidents"
            bordered={false}
            style={{ backgroundColor: "aquamarine" }}
          >
            <div className="flex justify-center items-center">
              <Typography variant="h3" gutterBottom>
                {incidents.filter((i) => i.closed == "0").length}
              </Typography>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Closed Incidents"
            bordered={false}
            style={{ backgroundColor: "darkgray" }}
          >
            <div className="flex justify-center items-center">
              <Typography variant="h3" gutterBottom>
                {incidents.filter((i) => i.closed == "1").length}
              </Typography>
            </div>
          </Card>
        </Col>
      </Row>
      {/* <Row gutter={16} style={{ paddingTop: "20px" }}>
        <Col span={12}>
          <Card title="Incidents by month" bordered={false}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "code",
                  valueFormatter: (code, context) =>
                    context.location === "tick"
                      ? code
                      : `Incidents: ${
                          dataset.find((d) => d.code === code)?.name
                        } (${code})`,
                },
              ]}
              {...chartParams}
            />
          </Card>
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard;
