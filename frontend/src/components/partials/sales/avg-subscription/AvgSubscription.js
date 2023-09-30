import React, { useEffect, useState } from "react";
import { CardTitle } from "reactstrap";
import axios from 'axios';
import { useParams } from "react-router";

const AvgSubscription = ({ timeframe = 'Last 30 days' }) => {
  const [dataApi, setDataApi] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/userinfo/${id}`)
      .then((response) => {
        setDataApi(response.data);
      })
      .catch((error) => {
        console.log("erreur :", error);
      });
  }, [id]);

  useEffect(() => {
    if (dataApi.tasks) {
      // Filtrer les tâches qui ne sont pas "Completed" ou "Cancelled"
      const activeTasks = dataApi.tasks.filter((task) => {
        return task.status !== "Completed" && task.status !== "Cancelled";
      });
      // Mettre à jour le nombre de tâches actives dans le state
      setActiveTasksCount(activeTasks.length);
    }
  }, [dataApi.tasks]);

  const [activeTasksCount, setActiveTasksCount] = useState(0);

  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Active Tasks</h6>
        </CardTitle>
        <div className="card-tools">
          
        </div>
      </div>
      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
        <div className="nk-sale-data">
          <span className="amount">{activeTasksCount}</span>
        </div>
      
      </div>
    </React.Fragment>
  );
};
export default AvgSubscription;
