import {
  Button as MatButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Incident, Log } from "../../app/models/incident";
import useIncident from "../../app/hooks/useIncident";
import moment from "moment";
import { toast } from "react-toastify";
import { RetweetOutlined } from "@ant-design/icons";
import useUser from "../../app/hooks/useUser";
import { User } from "../../app/models/user";

const UpdateLogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [openHandoverForm, setOpenHandoverForm] = useState(false);
  const [closeIncidentModal, setCloseIncidentModal] = useState(false);
  const [formError, setFormError] = useState(false);
  const [rows, setRows] = useState<Log[]>([]);
  const timeRef = useRef<HTMLInputElement>(null);
  const detailsOfPersonRef = useRef<HTMLInputElement>(null);
  const reasonForAttendanceRef = useRef<HTMLTextAreaElement>(null);
  const protectiveClothingWornRef = useRef<HTMLTextAreaElement>(null);
  const officerCompletingLogRef = useRef<HTMLInputElement>(null);
  const weatherConditionRef = useRef<HTMLInputElement>(null);
  const [incident, setIncident] = useState<Incident | null>(null);
  const officerEmailRef = useRef<HTMLInputElement>(null);
  const { getIncident, switchOfficerOnScene, closeIncident } = useIncident();
  const { addLog } = useIncident();
  const navigate = useNavigate();
  const { getUser, isLoading } = useUser();

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleHandoverOk = () => {
    setOpenHandoverForm(false);
  };

  const handleHandoverCancel = () => {
    setOpenHandoverForm(false);
  };

  // Close Incident Related Func
  const showCloseIncidentModal = () => {
    setCloseIncidentModal(true);
  };

  const handleCloseIncidentOk = async (id: string) => {
    // setCloseIncidentModal(false);
    try {
      await closeIncident(id!);
      toast.success("Incident has been closed successfully");
      navigate("/incidents");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseIncidentCancel = () => {
    setCloseIncidentModal(false);
  };

  ////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncident(id!);
      const userData = await getUser();

      setIncident(data || null);
      setUser(userData);
      setRows(data.Logs);
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = timeRef.current!.value;
    const identity = detailsOfPersonRef.current!.value;
    const reason = reasonForAttendanceRef.current!.value;
    const protective = protectiveClothingWornRef.current!.value;
    const officer = officerCompletingLogRef.current!.value;
    const weather = weatherConditionRef.current!.value;

    if (
      time == null ||
      identity == null ||
      reason == null ||
      protective == null ||
      officer == null ||
      weather == null
    ) {
      setFormError(true);
    } else {
      const data: Log = {
        nameOfPersonVisiting: identity,
        reasonForAttendance: reason,
        protectiveClothingWorn: protective,
        weatherCondition: weather,
        officerCompletingLog: officer,
        date: time,
      };

      try {
        const logData = await addLog(data, id!);
        setRows((prevState) => {
          return [...prevState, logData];
        });
      } catch (e) {
        toast.error("Log has not been added");
      }

      setOpen(false);

      timeRef.current!.value = "";
      detailsOfPersonRef.current!.value = "";
      reasonForAttendanceRef.current!.value = "";
      protectiveClothingWornRef.current!.value = "";
      officerCompletingLogRef.current!.value = "";
      weatherConditionRef.current!.value = "";
    }
  };

  const handleHandoverSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const email = officerEmailRef.current!.value;
    if (email == null) {
      setFormError(true);
    } else {
      try {
        await switchOfficerOnScene(id!, email);
        toast.success("Handover completed successfully");
        navigate("/incidents");
      } catch (e) {
        toast.error("Log has not been added");
      }
    }
  };

  if (user?.email !== incident?.switchingOfficer || incident?.closed === "1") {
    return <Navigate to="/incidents" />;
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <div>
              <Typography variant="body1" gutterBottom>
                <span className="font-bold">Date:</span>{" "}
                {moment(incident?.date).add(24, "hours").format("LLL")}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span className="font-bold">Location:</span>{" "}
                {incident?.locationOfIncident}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span className="font-bold">Nature of Incident:</span>{" "}
                {incident?.natureOfIncident}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h6" gutterBottom>
                  Major Incident Log
                </Typography>
                <Typography variant="body1" gutterBottom>
                  (Changes to be noted on log)
                </Typography>
              </div>
              <div>
                <MatButton
                  variant="contained"
                  color="success"
                  onClick={() => setOpen(true)}
                  style={{ marginRight: "10px" }}
                >
                  Add Log
                </MatButton>
                <MatButton
                  variant="contained"
                  color="error"
                  onClick={() => showCloseIncidentModal()}
                >
                  Close Incident
                </MatButton>
              </div>
            </div>
            <div>
              <Button
                type="primary"
                icon={<RetweetOutlined />}
                style={{ backgroundColor: "blue" }}
                onClick={() => setOpenHandoverForm(true)}
              >
                Handover to another officer
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-[100%] mt-[30px]">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>Time / Date</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      Name of Person visiting / Leaving scene / Contact Address
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      Reason for attendance / remarks
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      Protective Clothing Worn
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      Weather Condition
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      Officer Completing Log
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {String(row.date)}
                        </TableCell>
                        <TableCell align="right">
                          {row.nameOfPersonVisiting}
                        </TableCell>
                        <TableCell align="right">
                          {row.reasonForAttendance}
                        </TableCell>
                        <TableCell align="right">
                          {row.protectiveClothingWorn}
                        </TableCell>
                        <TableCell align="right">
                          {row.weatherCondition}
                        </TableCell>
                        <TableCell align="right">
                          {row.officerCompletingLog}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              title="Add Log"
              centered
              open={open}
              width={800}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={false}
            >
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Time / Date
                  </label>
                  <input
                    type="datetime-local"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="25th December, 2020 15:00"
                    name="time"
                    ref={timeRef}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Name Of Person Visiting / Leaving Scene / Contact Address
                  </label>
                  <input
                    type="text"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jay Palmer"
                    name="detailsOfPerson"
                    ref={detailsOfPersonRef}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Reason for attendance / Remarks
                  </label>
                  <textarea
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Investigated the scene to collect evidence..."
                    name="reasonForAttendance"
                    ref={reasonForAttendanceRef}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Protective Clothing Worn
                  </label>
                  <textarea
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Disposable Paper Suit, Gloves, Overshoes"
                    name="protectiveClothingWorn"
                    ref={protectiveClothingWornRef}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Weather Condition
                  </label>
                  <input
                    type="text"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Storny"
                    name="weatherCondition"
                    ref={weatherConditionRef}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    officer Completing Log
                  </label>
                  <input
                    type="text"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mason Wlader"
                    name="officerCompletingLog"
                    value={user?.firstName + " " + user?.lastName}
                    ref={officerCompletingLogRef}
                    readOnly
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[100%]"
                >
                  Add Log
                </button>
              </form>
            </Modal>

            <Modal
              title="Provide Email Address"
              centered
              open={openHandoverForm}
              width={800}
              onOk={handleHandoverOk}
              onCancel={handleHandoverCancel}
              footer={false}
            >
              <form onSubmit={handleHandoverSubmit}>
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-medium ">
                    Email of Officer taking over
                  </label>
                  <input
                    type="text"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="jakepalmer@team3.com"
                    name="officerEmail"
                    ref={officerEmailRef}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[100%]"
                >
                  Submit
                </button>
              </form>
            </Modal>

            <Modal
              title="Close Incident"
              open={closeIncidentModal}
              onOk={() => handleCloseIncidentOk(id!)}
              onCancel={handleCloseIncidentCancel}
              okButtonProps={{ style: { backgroundColor: "blue" } }}
            >
              <p>Are you sure that you want to close this incident?</p>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateLogPage;
