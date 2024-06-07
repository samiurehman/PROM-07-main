import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useIncident from "../../app/hooks/useIncident";
import { useEffect, useState } from "react";
import { Incident, Log } from "../../app/models/incident";
import { useParams } from "react-router-dom";
import { Button, ConfigProviderProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

interface dataObj {
  id: string | undefined;
  time: string | undefined;
  detailsOfPerson: string | undefined;
  reasonForAttendance: string | undefined;
  protectiveClothingWorn: string | undefined;
  officerCompletingLog: string | undefined;
}

interface incidentLog {
  id: number;
  nameOfPersonVisiting: string;
  reasonForAttendance: string;
  protectiveClothingWorn: string;
  officerCompletingLog: string;
}

type SizeType = ConfigProviderProps["componentSize"];

function createData(
  id: string,
  time: string,
  detailsOfPerson: string,
  reasonForAttendance: string,
  protectiveClothingWorn: string,
  officerCompletingLog: string
): dataObj {
  return {
    id,
    time,
    detailsOfPerson,
    reasonForAttendance,
    protectiveClothingWorn,
    officerCompletingLog,
  };
}

const LogPage = () => {
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'
  const { getIncident, isLoading } = useIncident();
  const [incident, setIncident] = useState<Incident | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getAllIncidents = async () => {
      const incidentData = await getIncident(id!);
      setIncident(incidentData);
    };

    getAllIncidents();
  }, []);

  const exportToExcel = (log: Log[], fileName: string) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(log);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
    toast.success("File has been exported successfully");
  };

  console.log(incident);

  return (
    <div>
      <div className="mb-[20px]">
        <div className="flex items-center">
          <Typography variant="h6" sx={{ marginRight: "7px" }} gutterBottom>
            Date:
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {incident?.date}
          </Typography>
        </div>

        <div>
          <Typography variant="h6" sx={{ marginRight: "7px" }} gutterBottom>
            Nature Of Incident:
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {incident?.natureOfIncident}
          </Typography>
        </div>

        <div className="flex items-center">
          <Typography variant="h6" sx={{ marginRight: "7px" }} gutterBottom>
            Weather Condition:
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {incident?.natureOfIncident}
          </Typography>
        </div>

        <div className="flex items-center">
          <Typography variant="h6" sx={{ marginRight: "7px" }} gutterBottom>
            Location Of Incident:
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {incident?.locationOfIncident}
          </Typography>
        </div>

        <div className="flex items-center">
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
            style={{ backgroundColor: "blue" }}
            onClick={() =>
              exportToExcel(incident!.Logs, incident!.natureOfIncident)
            }
          >
            Download
          </Button>
        </div>
      </div>
      <div>
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
              {incident?.Logs?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {String(row.date)}
                  </TableCell>
                  <TableCell align="right">
                    {row.nameOfPersonVisiting}
                  </TableCell>
                  <TableCell align="right">{row.reasonForAttendance}</TableCell>
                  <TableCell align="right">
                    {row.protectiveClothingWorn}
                  </TableCell>
                  <TableCell align="right">{row.weatherCondition}</TableCell>
                  <TableCell align="right">
                    {row.officerCompletingLog}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LogPage;
