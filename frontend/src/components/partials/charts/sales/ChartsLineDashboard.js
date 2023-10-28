import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Filler, Legend, } from "chart.js";
import axios from "axios";

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Filler, Legend,);



export const LineChart = () => {

  const [billingData, setBillingData] = useState(null);
  const [dataUnit, setDataUnit] = useState("USD"); // Par défaut

  useEffect(() => {
    // Effectuez la requête AJAX pour obtenir les données de l'utilisateur
    axios.get("http://localhost:5000/api/user/userinfo/63ad755b2020daa395e59d45")
      .then((response) => {
        const userData = response.data;
        // Mettez à jour le "dataUnit" en fonction de la devise de l'utilisateur
        setDataUnit(userData.currency);

        // Filtrer les clients en fonction de la période sélectionnée
        const currentDate = new Date();
        const clients = userData.client.filter((client) => {
          const creationDate = new Date(client.date_creation);
          if (isLast30Days(currentDate, creationDate)) {
            return true; // Client créé au cours des 30 derniers jours
          } else if (isLast6Months(currentDate, creationDate)) {
            return true; // Client créé au cours des 6 derniers mois
          } else if (isLast12Months(currentDate, creationDate)) {
            return true; // Client créé au cours des 12 derniers mois
          }
          return false;
        });

        // Calculez le montant total des factures par mois
        const totalAmountByMonth = calculateTotalAmountByMonth(clients, userData.invoices);

        // Mettez à jour le state avec les données de facturation
        setBillingData(totalAmountByMonth);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      });
  }, []);

  // Fonction utilitaire pour vérifier si une date est dans les 30 derniers jours
  const isLast30Days = (currentDate, date) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    return date >= thirtyDaysAgo && date <= currentDate;
  };

  // Fonction utilitaire pour vérifier si une date est dans les 6 derniers mois
  const isLast6Months = (currentDate, date) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    return date >= sixMonthsAgo && date <= currentDate;
  };

  // Fonction utilitaire pour vérifier si une date est dans les 12 derniers mois
  const isLast12Months = (currentDate, date) => {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);
    return date >= twelveMonthsAgo && date <= currentDate;
  };

  // Fonction utilitaire pour calculer le montant total des factures par mois
  const calculateTotalAmountByMonth = (clients, invoices) => {
    const currentDate = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totalAmountByMonth = Array(12).fill(0);

    clients.forEach((client) => {
      invoices.forEach((invoice) => {
        const invoiceDate = new Date(invoice.date_issue);
        if (invoice.client === client.id && invoiceDate <= currentDate) {
          const monthIndex = invoiceDate.getMonth();
          totalAmountByMonth[monthIndex] += invoice.total_tax_include_value;
        }
      });
    });

    return totalAmountByMonth;
  };

  const salesOverview = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dataUnit: dataUnit,
    datasets: [
      {
        label: "Sales Overview",
        color: "rgba(20, 66, 87, 0.25)",
        fill: true,
        backgroundColor: "rgba(20, 66, 87, 0.25)",
        borderColor: "rgba(20, 66, 87, 1)",
        barPercentage: 0.1,
        categoryPercentage: 0.1,
        borderWidth: 2,
        lineTension: 0.1,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBorderColor: "rgba(20, 66, 87, 1)",
        pointHoverBackgroundColor: "#fff",
        data: billingData,
      },
    ],
  };
  return (
    <Line
      className="sales-overview-chart"
      data={salesOverview}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#eff6ff",
              titleFont: {
                size: '13px',
              },
              titleColor: "#6783b8",
              titleMarginBottom: 6,
              bodyColor: "#9eaecf",
              bodyFont: {
                size: '12px',
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y:{
              display: true,
              ticks: {
                beginAtZero: true,
                color:"#9eaecf", 
                font: {
                  size: '11px',
                },
                callback: function (value, index, values) {
                  return "$ " + value;
                },
                padding: 10,
                min: 100,
                stepSize: 3000,
              },
              grid: {
                tickMarkLength: 0,
              },
            },
          x:{
              display: true,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '9px',
                },
                source: "auto",
                padding: 10,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "transparent",
              },
            },
        },
      }}
    />
  );
};
