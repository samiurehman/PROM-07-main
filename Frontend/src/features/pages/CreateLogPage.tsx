import { Paper, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import useIncident from "../../app/hooks/useIncident";

const CreateLogPage = () => {
  const dateRef = React.useRef<HTMLInputElement>(null);
  const natureRef = React.useRef<HTMLTextAreaElement>(null);
  const weatherRef = React.useRef<HTMLInputElement>(null);
  const locationRef = React.useRef<HTMLInputElement>(null);
  const { createIncident, error, isLoading } = useIncident();

  const handleIncidentCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = dateRef.current!.value;
    const nature = natureRef.current!.value;
    const weather = weatherRef.current!.value;
    const location = locationRef.current!.value;

    if (!date || !nature || !weather || !location) {
      toast.error("All fields are required");
      return;
    }

    const incident = {
      natureOfIncident: nature,
      locationOfIncident: location,
      weatherCondition: weather,
      date: new Date(date),
    };

    createIncident(incident);

    //console.log({ date, nature, weather, location });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h4" sx={{ fontWeight: "800" }} gutterBottom>
        Major Incident Log
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        As the officer in charge of the incident, it is your responsibility to
        accurately record all visits to/occurences at the scene of the incident.
        It should be borne in mind that scene preservation is of the utmost
        importance. It may be necessary at a later stage to account
        for/eliminate all visitors to the scene. If that if the case, the police
        investigation will only be as comprehensive as your log allows it to be.
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        Ensure that all visitors to the scene state their reason for entering.
        Unnecessary access must be refused. In cases of difficulty contact your
        duty supervisor, or the crime scene manager in attendance.
      </Typography>
      <Typography
        variant="overline"
        display="block"
        sx={{ color: "red" }}
        gutterBottom
      >
        Protective clothing consisting of a disposable paper suit, gloves and
        overshoes must be worn by all persons entering the crime scene at all
        times until the scene is released by the senior investigating officer.
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        This is an original document and should be passed on to the next officer
        detailed to complete the scene log, a record of this should be endorsed,
        as it occurs, on the scene log.
      </Typography>
      <div className="w-[60%] ">
        <Paper sx={{ padding: "15px" }}>
          <form onSubmit={handleIncidentCreation}>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium ">
                Date Of Incident
              </label>
              <input
                type="datetime-local"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Stormy Weather"
                required
                ref={dateRef}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium ">
                Nature Of Incident
              </label>
              <textarea
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
                ref={natureRef}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium ">
                Weather Condition
              </label>
              <input
                type="text"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Stormy Weather"
                ref={weatherRef}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium ">
                Location Of Incident
              </label>
              <input
                type="text"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nottingham, UK"
                ref={locationRef}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[100%]"
            >
              Create Incident
            </button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CreateLogPage;
