import React, { useEffect, useState } from "react";
import { CardTitle } from "reactstrap";
import axios from 'axios';
import { useParams } from "react-router";

const ActiveSubscription = ({ timeframe = 'Last 30 days' }) => {
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
    if (dataApi.project) {
      // Filtrer les projets qui ne sont pas "completed" ou "cancelled"
      const activeProjects = dataApi.project.filter((project) => {
        return project.status !== "Completed" && project.status !== "Cancelled";
      });
      // Mettre à jour le nombre de projets actifs dans le state
      setActiveProjectsCount(activeProjects.length);
    }
  }, [dataApi.project]);

  const [activeProjectsCount, setActiveProjectsCount] = useState(0);

  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Active Projects</h6>
        </CardTitle>
        <div className="card-tools">
         
        </div>
      </div>
      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
        <div className="nk-sale-data">
          <span className="amount">{activeProjectsCount}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActiveSubscription;
