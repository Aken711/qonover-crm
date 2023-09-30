import React, { useEffect, useState } from "react";
import { CardTitle } from "reactstrap";
import { Icon } from "../../../Component";
import { BarChart } from "../../charts/sales/Charts";
import { useParams } from "react-router";
import axios from 'axios';

const SaleRevenue = ({ timeframe = 'Last 30 days' }) => {
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

  const [totalInvoicesMonth, setTotalInvoicesMonth] = useState(null);
  const [totalInvoicesWeek, setTotalInvoicesWeek] = useState(null);
  const [comparisonClassMonth, setComparisonClassMonth] = useState("");
  const [comparisonIconMonth, setComparisonIconMonth] = useState("");
  const [percentageChangeMonth, setPercentageChangeMonth] = useState(null);
  const [comparisonClassWeek, setComparisonClassWeek] = useState("");
  const [comparisonIconWeek, setComparisonIconWeek] = useState("");
  const [percentageChangeWeek, setPercentageChangeWeek] = useState(null);

  useEffect(() => {
    if (dataApi.invoices) {
      // Calcul de la somme des factures du mois
      const userInvoicesMonth = dataApi.invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date_payment);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return invoiceDate >= thirtyDaysAgo && invoice.status === "Paid";
      });
      const totalAmountMonth = userInvoicesMonth.reduce((acc, invoice) => {
        return acc + parseFloat(invoice.total_tax_include_value);
      }, 0);
      setTotalInvoicesMonth(totalAmountMonth.toFixed(2));

      // Calcul de la somme des factures de la semaine précédente
      const userInvoicesWeek = dataApi.invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date_payment);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return invoiceDate >= sevenDaysAgo && invoice.status === "Paid";
      });
      const totalAmountWeek = userInvoicesWeek.reduce((acc, invoice) => {
        return acc + parseFloat(invoice.total_tax_include_value);
      }, 0);
      setTotalInvoicesWeek(totalAmountWeek.toFixed(2));
    }
  }, [dataApi.invoices]);

  useEffect(() => {
    // Comparaison avec le mois précédent
    if (totalInvoicesMonth !== null && dataApi.lastMonthTotalInvoices !== undefined) {
      const lastMonthTotalInvoices = parseFloat(dataApi.lastMonthTotalInvoices);
      if (totalInvoicesMonth > lastMonthTotalInvoices) {
        setComparisonClassMonth("change up text-success");
        setComparisonIconMonth("arrow-long-up");
      } else if (totalInvoicesMonth < lastMonthTotalInvoices) {
        setComparisonClassMonth("change down text-danger");
        setComparisonIconMonth("arrow-long-down");
      } else {
        setComparisonClassMonth("");
        setComparisonIconMonth("");
      }

      // Calcul du pourcentage de changement
      const changePercentageMonth = ((totalInvoicesMonth - lastMonthTotalInvoices) / lastMonthTotalInvoices) * 100;
      setPercentageChangeMonth(changePercentageMonth.toFixed(2));
    }
  }, [totalInvoicesMonth, dataApi.lastMonthTotalInvoices]);

  useEffect(() => {
    // Comparaison avec la semaine précédente
    if (totalInvoicesWeek !== null && dataApi.lastWeekTotalInvoices !== undefined) {
      const lastWeekTotalInvoices = parseFloat(dataApi.lastWeekTotalInvoices);
      if (totalInvoicesWeek > lastWeekTotalInvoices) {
        setComparisonClassWeek("change up text-success");
        setComparisonIconWeek("arrow-long-up");
      } else if (totalInvoicesWeek < lastWeekTotalInvoices) {
        setComparisonClassWeek("change down text-danger");
        setComparisonIconWeek("arrow-long-down");
      } else {
        setComparisonClassWeek("");
        setComparisonIconWeek("");
      }

      // Calcul du pourcentage de changement
      const changePercentageWeek = ((totalInvoicesWeek - lastWeekTotalInvoices) / lastWeekTotalInvoices) * 100;
      setPercentageChangeWeek(changePercentageWeek.toFixed(2));
    }
  }, [totalInvoicesWeek, dataApi.lastWeekTotalInvoices]);

  // Fonction pour obtenir le symbole de la devise en fonction de la devise
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Sales Revenue</h6>
          <p>In {timeframe.toLowerCase()} revenue.</p>
        </CardTitle>
        <div className="card-tools">
        </div>
      </div>
      <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap justify-content-between">
        
          <div className="nk-sale-data">
            <span className={`amount ${comparisonClassMonth}`}>
              {totalInvoicesMonth !== null ? (`${getCurrencySymbol(dataApi.currency)} ${totalInvoicesMonth} `) : ('0 ')}
              <span className={comparisonClassMonth}>
                <Icon name={comparisonIconMonth} />
                {percentageChangeMonth !== null ? (`${Math.abs(percentageChangeMonth)}%`) : ('')}
              </span>
            </span>
            <span className="sub-title">This Month</span>
          </div>
          <div className="nk-sale-data">
            <span className={`amount ${comparisonClassWeek}`}>
              {totalInvoicesWeek !== null ? (`${getCurrencySymbol(dataApi.currency)} ${totalInvoicesWeek} `) : ('0 ')}
              <span className={comparisonClassWeek}>
                <Icon name={comparisonIconWeek} />
                {percentageChangeWeek !== null ? (`${Math.abs(percentageChangeWeek)}%`) : ('')}
              </span>
            </span>
            <span className="sub-title">This Week</span>
          </div>
      </div>
    </React.Fragment>
  );
};

export default SaleRevenue;
