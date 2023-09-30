import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SaleRevenue from "../components/partials/sales/sale-revenue/SaleRevenue";
import ActiveSubscription from "../components/partials/sales/active-subscription/ActiveSubscription";
import AvgSubscription from "../components/partials/sales/avg-subscription/AvgSubscription";
import SalesOverview from "../components/partials/sales/sales-overview/SalesOverview";
import TransactionTable from "../components/partials/sales/transaction/Transaction";
import RecentActivity from "../components/partials/sales/recent-activity/Activity";
import NewsUsers from "../components/partials/sales/new-users/User";
import Support from "../components/partials/sales/support-request/Support";
import Notifications from "../components/partials/sales/notification/Notification";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  PreviewAltCard,
  Icon,
  Button,
  Row,
  Col,
} from "../components/Component";
import axios from 'axios';


const SalesHome = () => {
  const [sm, updateSm] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Last 30 Days");
  const [dataApi, setDataApi] = useState([])
  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/userinfo/${id}`)
  .then((response) => {
    setDataApi(response.data);
  })
  .catch((error) => {console.log("erreur :",error)})
  })


  return (
    <React.Fragment>
      <Head title="Dashboard" />
      <Content>

        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Overview 
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">{buttonLabel}</span>
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setButtonLabel("Last 30 days");
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setButtonLabel("Last 6 months");
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setButtonLabel("Last year");
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last year</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                                            
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>

          <Row className="g-gs">

            <Col xxl="4">
              <Row className="g-gs">
                <Col lg="6" xxl="12">
                  <PreviewAltCard>
                    <SaleRevenue timeframe={buttonLabel}  />
                  </PreviewAltCard>
                </Col>
                <Col lg="6" xxl="12">
                  <Row className="g-gs">
                    <Col sm="6" lg="12" xxl="6">
                      <PreviewAltCard>
                        <ActiveSubscription timeframe={buttonLabel} />
                      </PreviewAltCard>
                    </Col>
                    <Col sm="6" lg="12" xxl="6">
                      <PreviewAltCard>
                        <AvgSubscription  timeframe={buttonLabel}  />
                      </PreviewAltCard>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xxl="8">
              <PreviewAltCard className="h-100">
                <SalesOverview timeframe={buttonLabel}  />
              </PreviewAltCard >
            </Col>

            <Col xxl="8">
              <Card className="card-full">
                <TransactionTable />
              </Card>
            </Col>

            <Col xxl="4" md="6">
              <Card className="card-full">
                <RecentActivity />
              </Card>
            </Col>

            <Col xxl="4" md="6">
              <Card className="card-full">
                <NewsUsers />
              </Card>
            </Col>

            <Col lg="6" xxl="4">
              <Card className="h-100">
                <Support />
              </Card>
            </Col>

            <Col lg="6" xxl="4">
              <Card className="h-100">
                <Notifications />
              </Card>
            </Col>
            
          </Row>

        </Block>
      </Content>
    </React.Fragment>
  );
};

export default SalesHome;
