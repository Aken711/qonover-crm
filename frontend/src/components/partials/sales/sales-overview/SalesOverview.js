import React from "react";
import { LineChart } from "../../charts/sales/ChartsLineDashboard";

const SalesOverview = ({ timeframe = 'Last 30 days' }) => {
  return (
    <React.Fragment>
      <div className="card-title-group align-start gx-3 mb-3">
        <div className="card-title">
          <h6 className="title">Sales Overview</h6>
          <p>
            In {timeframe.toLowerCase()} sales.{" "}
          </p>
        </div>
        <div className="card-tools">
          
        </div>
      </div>
      <div className="nk-sale-data-group align-center justify-between gy-3 gx-5">
        <div className="nk-sale-data">
          <span className="amount">$82,944.60</span>
        </div>
        <div className="nk-sale-data">
          <span className="amount sm">
            1,937 <small>Clients</small>
          </span>
        </div>
      </div>
      <div className="nk-sales-ck large pt-4">
        <LineChart />
      </div>
    </React.Fragment>
  );
};
export default SalesOverview;
