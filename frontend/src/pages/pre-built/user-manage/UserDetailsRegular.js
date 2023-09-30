import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Card, Modal, ModalBody, Badge } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  OverlineTitle,
  Sidebar,
  UserAvatar,
} from "../../../components/Component";
import { useNavigate } from "react-router-dom";
import { currentTime, findUpper, monthNames, todaysDate } from "../../../utils/Utils";
import { UserContext } from "./UserContext";
import { notes } from "./UserData";
import { SpecialTable } from "../../../components/user/ClientDetailContacts";
import { ClientDetailProjects } from "../../../components/user/ClientDetailProjects";
import ClientDetailTasks from "../../../components/user/ClientDetailTasks";
import ClientDetailInvoices from "../../../components/user/ClientDetailInvoices";
import ClientDetailQuotations from "../../../components/user/ClientDetailQuotation";

const UserDetailsPage = () => {
  const { contextData } = useContext(UserContext);
  const [data] = contextData;
  const [sideBar, setSidebar] = useState(false);
  const [user, setUser] = useState();
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const [activeLink, setActiveLink] = useState("Company");
  const navigate = useNavigate();

  let { userId } = useParams();

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    const id = userId;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item.id === Number(id));
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [data]);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  useEffect(() => {
    sideBar ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [sideBar])

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${monthNames[todaysDate.getMonth()]} ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
};

  return (
    <>
      <Head title="Client Details"></Head>
      {user && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Client / <strong className="text-primary small">{user.name}</strong>
                </BlockTitle>
                
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate(-1)}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    navigate(-1);
                  }}
                  className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                >
                  <Icon name="arrow-left"></Icon>
                </a>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card>
              <div className="card-aside-wrap" id="user-detail-block">
              {activeLink === "Company" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>


                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Company Information</BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Name</span>
                            <span className="profile-ud-value">Name of the Company</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Registr Number</span>
                            <span className="profile-ud-value">1321121231</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">VTA</span>
                            <span className="profile-ud-value">FR12313212332</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Address</span>
                            <span className="profile-ud-value">12 rue de la Paix, 75008 Paris</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Mobile Number</span>
                            <span className="profile-ud-value">055546546545</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Email Address</span>
                            <span className="profile-ud-value">email@email.com</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Amount contacts</span>
                            <span className="profile-ud-value">2</span>
                          </div>
                        </div>
                      </div>
                    </Block>

                    <Block>
                      <BlockHead className="nk-block-head-line">
                        <BlockTitle tag="h6" className="overline-title text-base">
                          Additional Information
                        </BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Status</span>
                            <span className="profile-ud-value">Active</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Changing Status</span>
                            <span className="profile-ud-value">12/12/2023</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Last modification</span>
                            <span className="profile-ud-value">12/12/2023</span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Creation date</span>
                            <span className="profile-ud-value">12/12/2023</span>
                          </div>
                        </div>
                        
                      </div>
                    </Block>

                    <div className="nk-divider divider md"></div>

                    <Block>
                      <BlockHead size="sm">
                        <BlockBetween>
                          <BlockTitle tag="h5">Notes</BlockTitle>
                          <a
                            href="#addnote"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setAddNoteModal(true);
                            }}
                            className="link link-sm"
                          >
                            + Add Note
                          </a>
                        </BlockBetween>
                      </BlockHead>
                      <div className="bq-note">
                        {noteData.map((item) => (
                          <div className="bq-note-item" key={item.id}>
                            <div className="bq-note-text">
                              <p>{item.text}</p>
                            </div>
                            <div className="bq-note-meta">
                              <span className="bq-note-added">
                                Added on <span className="date">{item.date}</span> at{" "}
                                <span className="time">{item.time} PM</span>
                              </span>                              
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteNote(item.id);
                                }}
                                className="link link-sm link-danger"
                              >
                                Delete Note
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Block>
                  </div>
                </div>
                )}

              {activeLink === "Contacts" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>


                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Contacts</BlockTitle>
                      </BlockHead>
                      <div className="">
                        <SpecialTable action={true} />
                      </div>
                    </Block>




                    
                  </div>
                </div>
                )}

              {activeLink === "Projects" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>
                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Projects</BlockTitle>
                      </BlockHead>
                      <div className="">
                       <ClientDetailProjects />
                      </div>
                    </Block>
                  </div>

                </div>
                )}

{activeLink === "Tasks" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>


                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Tasks</BlockTitle>
                      </BlockHead>
                      <div className="">
                       <ClientDetailTasks />
                      </div>
                    </Block>
                  </div>
                </div>
                )}

{activeLink === "Invoices" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>


                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Invoices</BlockTitle>
                      </BlockHead>
                    <div><ClientDetailInvoices/></div>
                    </Block>

                    
                  </div>
                </div>
                )}

{activeLink === "Quotations" && (
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Company" ? "active" : ""}`} href="#company" onClick={() => handleNavLinkClick("Company")}>
                        <Icon name="building"></Icon>
                        <span>Company</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Contacts" ? "active" : ""}`}href="#contacts" onClick={() => handleNavLinkClick("Contacts")}>
                        <Icon name="contact"></Icon>
                        <span>Contacts</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}href="#projects" onClick={() => handleNavLinkClick("Projects")}>
                        <Icon name="folders"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Tasks" ? "active" : ""}`} href="#tasks" onClick={() => handleNavLinkClick("Tasks")}>
                        <Icon name="task"></Icon>
                        <span>Tasks</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Invoices" ? "active" : ""}`}href="#invoices" onClick={() => handleNavLinkClick("Invoices")}>
                        <Icon name="report-profit"></Icon>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeLink === "Quotations" ? "active" : ""}`}href="#quotations" onClick={() => handleNavLinkClick("Quotations")}>
                        <Icon name="reports-alt"></Icon>
                        <span>Quotations</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>


                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Quotations</BlockTitle>
                      </BlockHead>
                      <div> <ClientDetailQuotations/> </div>
                    </Block>
                  </div>
                </div>
                )}

                <Modal
                  isOpen={addNoteModal}
                  toggle={() => setAddNoteModal(false)}
                  className="modal-dialog-centered"
                  size="lg"
                >
                  <ModalBody>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setAddNoteModal(false);
                        setAddNoteText("");
                      }}
                      className="close"
                    >
                      <Icon name="cross-sm"></Icon>
                    </a>
                    <div className="p-2">
                      <h5 className="title">Add Admin Note</h5>
                      <div className="mt-4 mb-4">
                        <textarea
                          defaultValue={addNoteText}
                          className="form-control no-resize"
                          onChange={(e) => setAddNoteText(e.target.value)}
                        />
                      </div>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <Button color="primary" size="md" type="submit" onClick={submitNote}>
                            Add Note
                          </Button>
                        </li>
                        <li>
                          <Button onClick={() => setAddNoteModal(false)} className="link link-light">
                            Cancel
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </ModalBody>
                </Modal>
                {activeLink === "Company" && (
                <Sidebar toggleState={sideBar}>
                  <div className="card-inner">
                    <div className="user-card user-card-s2 mt-5 mt-xxl-0">
                      <UserAvatar className="lg" theme="primary" text={findUpper(user.name)} />
                      <div className="user-info">
                        <Badge color="outline-light" pill className="ucap">Favorite customer</Badge>
                        <h5>Name of customer</h5>
                        <span className="sub-text">email@email.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner card-inner-sm">
                    <ul className="btn-toolbar justify-center gx-1">
                      <li> <Button href="#edit" onClick={(ev) => { ev.preventDefault(); }} className="btn-trigger btn-icon " > <Icon name="edit"></Icon> </Button> </li>
                      <li> <Button href="#delete" onClick={(ev) => { ev.preventDefault(); }} className="btn-trigger btn-icon text-danger" title="delete"> <Icon name="na"></Icon> </Button> </li>
                    </ul>
                  </div>
                  <div className="card-inner">
                    <div className="overline-title-alt mb-2">This Account</div>
                    <div className="profile-balance">
                      <div className="profile-balance-group gx-4">
                        <div className="profile-balance-sub">
                          <div className="profile-balance-amount">
                            <div className="number">
                              2,500.00 <small className="currency currency-usd">USD</small>
                            </div>
                          </div>
                          <div className="profile-balance-subtitle">Paid</div>
                        </div>
                        <div className="profile-balance-sub">
                          <span className="profile-balance-plus text-soft">
                            <Icon className="ni-plus"></Icon>
                          </span>
                          <div className="profile-balance-amount">
                            <div className="number">15,000.00 <small className="currency currency-usd">USD</small></div>
                          </div>
                          <div className="profile-balance-subtitle">Forecasted</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner">
                    <Row className="text-center">
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">{user.tasks}</span>
                          <span className="sub-text">Total projets</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">{user.projects}</span>
                          <span className="sub-text">Complete</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">{user.performed}</span>
                          <span className="sub-text">Progress</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-inner">
                    <h6 className="overline-title-alt mb-2">Informations of the favorite contact</h6>
                    <Row className="g-3">
                      <Col size="6">
                        <span className="sub-text">Name :</span>
                        <span>Prénom Nom</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Email:</span>
                        <span>email@email.com</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Phone:</span>
                        <span>06 54564 564654</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Job position:</span>
                        <span>CEO</span>
                      </Col>
                    </Row>
                  </div>
                  
                </Sidebar> )}
                {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
                



              </div>
            </Card>
          </Block>
        </Content>
      )}
    </>
  );
};
export default UserDetailsPage;
