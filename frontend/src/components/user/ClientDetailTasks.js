import React, { useState } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, Progress, DropdownItem, Badge } from "reactstrap";
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Icon, Button, UserAvatar, PaginationComponent, PreviewAltCard, DataTableHead, DataTableRow, DataTableItem, } from "../Component";
import { tasksData } from "../../pages/pre-built/projects/ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../utils/Utils";
import FormModalClientDetails from "../../pages/pre-built/projects/FormModalClientDetails";
import FormModalClientDetailsTask from "../../pages/pre-built/projects/FormModalClientDetailsTask";

export const ClientDetailTasks = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(tasksData);
  const [formData, setFormData] = useState({
    name:"",
    description:"",
    due_date:"",
    status: "",
    client:"",
    project:"",
  });
  const [editFormData, setEditFormData] = useState({
    name:"",
    description:"",
    due_date:"",
    status: "",
    client:"",
    project:"",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  // function to reset the form
  const resetForm = () => {
    setFormData({
        name:"",
        description:"",
        due_date:"",
        status: "",
        client:"",
        project:"",
    });
  };

  const closeModal = () => {
    setModal({ add: false })
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false })
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    const { name, description, due_date, status, client,project } = sData;
    let submittedData = {
      id: data.length + 1,
      name: name,
      description: description,
      due_date: new Date(due_date),
      status: status,
      client: client,
      project: project,
    };
    setData((data) => [submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { name, description, due_date, status, client,project } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          name: name,
          description: description,
          due_date: new Date(due_date),
          status: status,
          client: client,
          project: project,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setEditFormData({
          name: item.name,
          description: item.description,
          due_date: item.due_date,
          status: item.status,
          client: item.client,
          project: item.project,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorCompleteProject = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.deadline = setDeadline(0);
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteProject = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the check property of selected item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Tasks List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filtered By</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li> <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => { ev.preventDefault(); }} > <span>All</span> </DropdownItem> </li>
                            <li> <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => { ev.preventDefault(); }} > <span>Open</span> </DropdownItem> </li>
                            <li> <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => { ev.preventDefault(); }} > <span>Closed</span> </DropdownItem> </li>
                            <li> <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => { ev.preventDefault(); }} > <span>Onhold</span> </DropdownItem> </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add Task</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <div className="nk-tb-list is-separate nk-tb-ulist">
            <DataTableHead className="nk-tb-item nk-tb-head">
              <DataTableRow className="nk-tb-col-check"> <div className="custom-control custom-control-sm custom-checkbox notext"> <input type="checkbox" className="custom-control-input" id="pid-all" onChange={(e) => selectorCheck(e)} /> <label className="custom-control-label" htmlFor="pid-all"></label> </div></DataTableRow>
              <DataTableRow> <span className="sub-text">Task Name</span> </DataTableRow>
              <DataTableRow size="xxl"> <span className="sub-text">Status</span> </DataTableRow>
              <DataTableRow size="md"> <span className="sub-text">Client</span> </DataTableRow>
              <DataTableRow size="md"> <span className="sub-text">Project</span> </DataTableRow>
              <DataTableRow size="mb"> <span className="sub-text">Deadline</span> </DataTableRow>
              <DataTableRow className="nk-tb-col-tools text-end">
                <UncontrolledDropdown>
                  <DropdownToggle tag="a" className="btn btn-xs btn-trigger btn-icon dropdown-toggle me-n1">
                    <Icon name="more-h"></Icon>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <ul className="link-list-opt no-bdr">
                      <li onClick={() => selectorCompleteProject()}> <DropdownItem tag="a" href="#markasdone" onClick={(ev) => { ev.preventDefault(); }} > <Icon name="check-round-cut"></Icon> <span>Mark As Done</span> </DropdownItem> </li>
                      <li onClick={() => selectorDeleteProject()}> <DropdownItem tag="a" href="#remove" onClick={(ev) => { ev.preventDefault(); }} > <Icon name="trash"></Icon> <span>Remove Tasks</span> </DropdownItem> </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </DataTableRow>
            </DataTableHead>
            {currentItems.length > 0
              ? currentItems.map((item) => {
                  var days = setDeadlineDays(item.due_date);
                  return (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check"> <div className="custom-control custom-control-sm custom-checkbox notext"> <input type="checkbox" className="custom-control-input" defaultChecked={item.checked} id={item.id + "pid-all"} key={Math.random()} onChange={(e) => onSelectChange(e, item.id)} /> <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label> </div> </DataTableRow>
                      <DataTableRow> 
                        <a href="#title" onClick={(ev) => { ev.preventDefault(); }} className="project-title" > 
                        <div className="project-info"><h6 className="title">{item.name}</h6></div></a>
                        </DataTableRow>
                      <DataTableRow size="xxl"> <span>{item.status}</span> </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.client}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.project}</span>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <Badge className="badge-dim" color={ days > 10 ? "light" : days <= 10 && days >= 2 ? "warning" : days === 1 ? "danger" : days <= 0 && "success" } >
                          <Icon name="clock"></Icon>
                          <span>{days <= 0 ? "Done" : days === 1 ? "Due Tomorrow" : days + " Days Left"}</span>
                        </Badge>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools text-end">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(item.id)}>
                                    <DropdownItem tag="a" href="#edit" onClick={(ev) => { ev.preventDefault(); }} > <Icon name="edit"></Icon> <span>Edit</span> </DropdownItem>
                                  </li>
                                  {days !== 0 && (
                                    <li onClick={() => completeProject(item.id)}>
                                      <DropdownItem tag="a" href="#markasdone" onClick={(ev) => { ev.preventDefault(); }} > <Icon name="check-round-cut"></Icon> <span>Mark As Done</span> </DropdownItem>
                                    </li>
                                  )}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
              : null}
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No tasks found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <FormModalClientDetailsTask modal={modal.add} modalType="add" formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} />
        <FormModalClientDetailsTask modal={modal.edit} modalType="edit" formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} />
      </Content>
    </React.Fragment>
  );
};

export default ClientDetailTasks;
