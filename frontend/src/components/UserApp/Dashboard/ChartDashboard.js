import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../../../Data";


const ChartDashboard = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/userinfo/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  
  if(user._id){
    const userInvoiceChart = user.invoices
    console.log(userInvoiceChart);
  }

  const [userDataChart, setDataChart] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "Revenues",
        data: UserData.map((data) => data.revenue),
        backgroundColor: ["rgb(252, 163, 17)"],
        borderColor: ["rgb(252, 163, 17)"],
        borderWidth: 1,
      },
    ],
  });

  


  return (
    <div className="userapp-dashboard-charts-first-line-chart">
      <div className="userapp-dashboard-charts-first-line-chart-filter">
        <select name="filter" id="filter-date-chart-dashboard">
          <option value="lastmonth">last month</option>
          <option value="last3months">last 3 months</option>
          <option value="last6months">last 6 months</option>
          <option value="thisyear">this year</option>
        </select>
      </div>
      <div className="userapp-dashboard-charts-first-line-chart-box">
        <Line
          data={userDataChart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  color: "white",
                  fontSize: 12,
                },
              },
              x: {
                ticks: {
                  color: "white",
                  fontSize: 12,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartDashboard;