import React, { useState, useEffect  } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from "../components/Navigation";
import ChartDashboard from "../components/UserApp/Dashboard/ChartDashboard";
import Tasks from "../components/UserApp/Dashboard/Tasks";
import Projects from "../components/UserApp/Dashboard/Projects";
import Invoices from "../components/UserApp/Dashboard/Invoices";
import Quotation from "../components/UserApp/Dashboard/Quotation";


const UserApp_Dashboard = () => {    

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
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear() ;

  let revenuesThisMonth = 0
  let clientThisMonth = 0
  let invoiceAcceptedThisMonth = 0
  let quotationAcceptedThisMonth = 0
  let projectCloseThisMonth = 0

  if (user._id) {
    const userInvoice = user.invoices
    const userClient = user.client
    const userQuotation = user.quote
    const userProject = user.project

    if (userInvoice){
      const paidInvoices = userInvoice.filter(invoice => {
        const paymentDate = new Date(invoice.date_payment);
        return invoice.status === "paid" &&
               paymentDate.getMonth() === currentMonth &&
               paymentDate.getFullYear() === currentYear;
      });      
      const sumPaidInvoices = paidInvoices.reduce((total, invoice) => {
        return total + invoice.total_tax_include_value;
      }, 0);
      revenuesThisMonth += sumPaidInvoices;

      const issuedInvoices = userInvoice.filter((invoice) => {
        const issueDate = new Date(invoice.date_issue);
        return invoice.status !== "draft" &&
               issueDate.getMonth() === currentMonth &&
               issueDate.getFullYear() === currentYear;
      });
  
      const numberOfIssuedInvoicesThisMonth = issuedInvoices.length;
      invoiceAcceptedThisMonth += numberOfIssuedInvoicesThisMonth
  }

  if(userQuotation){
    const acceptedQuote = userQuotation.filter(quote => {
      const issueDateQuote = new Date(quote.date_issue);
      return quote.status === "accepted" && issueDateQuote.getMonth() === currentMonth &&
      issueDateQuote.getFullYear() === currentYear;
    })
    const numberOfAcceptedQuoteThisMonth = acceptedQuote.length;
    quotationAcceptedThisMonth += numberOfAcceptedQuoteThisMonth
  }

  if (userClient) {
    const clientsThisMonth = userClient.filter(client => {
      const dateChangingStatus = new Date(client.date_changing_status);
      return client.status === "client" &&
             dateChangingStatus.getMonth() === currentMonth &&
             dateChangingStatus.getFullYear() === currentYear;
    });
    const numClientsThisMonth = clientsThisMonth.length;
    clientThisMonth += numClientsThisMonth;
  }

  if (userProject){
    const projectThisMonth = userProject.filter(project => {
      const dateChangingProject = new Date(project.status_date_change);;
      return project.status === "close" && 
            dateChangingProject.getMonth() === currentMonth &&
             dateChangingProject.getFullYear() === currentYear;
    });
    const numProjectThisMonth = projectThisMonth.length;
    projectCloseThisMonth += numProjectThisMonth;
  }

}

  return (
    
    <div className="userapp">
      <Navigation />
      <div className="userapp-dashboard">
        <div className="userapp-dashboard-cubes">
          <div className="userapp-dashboard-filter-title">This month </div>

          <div className="userapp-dashboard-cubes-box">
            <div className="userapp-dashboard-cubes-boxes">
              <div className="title-boxes">Revenues</div>
              <div className="main-boxes">{revenuesThisMonth}$</div>
            </div>
            <div className="userapp-dashboard-cubes-boxes">
              <div className="title-boxes">New clients</div>
              <div className="main-boxes">{clientThisMonth}</div>
             
            </div>
            <div className="userapp-dashboard-cubes-boxes">
              <div className="title-boxes">Invoices accepted</div>
              <div className="main-boxes">{invoiceAcceptedThisMonth}</div>
              
            </div>
            <div className="userapp-dashboard-cubes-boxes">
              <div className="title-boxes">Quotation accepted</div>
              <div className="main-boxes">{quotationAcceptedThisMonth}</div>
             
            </div>
            <div className="userapp-dashboard-cubes-boxes">
              <div className="title-boxes">Projects closed</div>
              <div className="main-boxes">{projectCloseThisMonth}</div>
              
            </div>
          </div>
        </div>
        <div className="userapp-dashboard-charts">
          <div className="userapp-dashboard-charts-first-line">
          <ChartDashboard />
            <div className="userapp-dashboard-charts-first-line-tasks">
              <div className="uscflt-title">Tasks of the day</div>
              <div className="uscflt-body">< Tasks /></div>
            </div>
          </div>
          <div className="userapp-dashboard-charts-second-line">
            <div className="userapp-dashboard-charts-second-line-project">
            <div className="udcslp-title">Projects of the week</div>
              <div className="udcslp-body">< Projects /></div>
              
            
            </div>
            <div className="userapp-dashboard-charts-second-line-invoices">
              <div className="udcsli-title">Invoices of the week</div>
              <div className="udcsli-body"><Invoices /></div>
              
            
            </div>
            <div className="userapp-dashboard-charts-second-line-quotation">
            <div className="udcslq-title">Quotation of the week</div>
              <div className="udcslq-body"><Quotation /></div>
              
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserApp_Dashboard;
