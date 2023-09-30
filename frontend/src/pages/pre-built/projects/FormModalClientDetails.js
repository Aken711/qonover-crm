import React, { useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {
  Icon,
  Button,
  Col,
  RSelect,
} from "../../../components/Component";
import { teamList } from "./ProjectData";
import {
  Modal,
  ModalBody,
  Form
} from "reactstrap";
import { useForm } from "react-hook-form";

const FormModalClientDetails = ({modal,closeModal,onSubmit, formData, setFormData, modalType}) => {

    useEffect(() => {
        reset(formData)
      }, [formData]);
  
  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const  [tasks, setTasks]  =useState( [
    { name: "Item 1 ", status: "Active", due_date: "2023-09-01" },
    { name: "Item 2", status: "Inactive", due_date: "2023-09-05" },
    { name: "Item 3", status: "Active", due_date: "2023-09-10" },
    { name: "Item 4", status: "Inactive", due_date: "2023-09-15" },
    { name: "Item 5", status: "Active", due_date: "2023-09-20" }
  ]);

  const addTask = () => {
    setTasks(prevTasks => [...prevTasks, { name: "", status: "", due_date: "", isNew: true }]);
};

const deleteTask = (index) => {
  const newTasks = [...tasks];
  newTasks.splice(index, 1);
  setTasks(newTasks);
};

const saveTask = (index) => {
  const newTasks = [...tasks];
  newTasks[index].isNew = false;  // This will mark the task as saved
  setTasks(newTasks);
};

const [startDate, setStartDate] = useState(new Date());

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="xl">
        <ModalBody>
          <a href="#cancel" onClick={(ev) => { ev.preventDefault(); closeModal(); }} className="close" >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">{modalType === "add" && "Add Project"} {modalType === "edit" && "Update Project"}</h5>
            <div className="mt-4">
              <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
                <Col md="8">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      {...register('title', { required: "This field is required" })}
                      value={formData.title}
                      placeholder="Enter Title"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="form-control" />
                    {errors.title && <span className="invalid">{errors.title.message}</span>}
                  </div>
                </Col>
                <Col md="4">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <RSelect 
                    options={[{ value: 'active', label: 'Active' }, { value: 'on hold', label: 'On hold' }, { value: 'close', label: 'Close' }]} 
                    value={[{ value: "active", label: "Active" }]} 
                    onChange={(e) => setFormData({ ...formData, lead: e.value })} />
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      {...register('description', { required: "This field is required" })}
                      value={formData.description}
                      placeholder="Your description"
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="form-control-xl form-control no-resize" />
                    {errors.description && <span className="invalid">{errors.description.message}</span>}
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Time estimated</label>
                    <input
                      type="number"
                      className="form-control" />
                    {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Time unit</label>
                    <RSelect 
                    options={[{ value: 'hour', label: 'Hour' }, { value: 'day', label: 'Day' }]} 
                     />
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Real time done</label>
                    <input
                      type="number"
                      className="form-control" />
                    {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Time unit</label>
                    <RSelect 
                    options={[{ value: 'hour', label: 'Hour' }, { value: 'day', label: 'Day' }]} 
                     />
                  </div>
                </Col>

                
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Deadline Date</label>
                    <DatePicker
                      selected={formData.date}
                      className="form-control"
                      onChange={(date) => setFormData({ ...formData, date: date })}
                      minDate={new Date()}
                    />
                  </div>
                </Col>
               
                <Col md="8">
                  <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control" />
                    {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                  </div>
                </Col>

                <Col md="4">
                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <RSelect 
                    options={[ { value: "EUR", label: "EUR" }, { value: "USD", label: "USD" }, { value: "JPY", label: "JPY" }, { value: "GBP", label: "GBP" }, { value: "AUD", label: "AUD" } ] } 
                     />
                  </div>
                </Col>

                <Col md="12">
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <div >
                      <label className="form-label">Tasks</label>
                    </div>
                    <div >
                      <Button color="primary" type="button" onClick={addTask}>Add Tasks</Button>
                    </div>
                  </div>
                  <table className="table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Status</th>
                              <th>Due Date</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {tasks.map((task, index) => (
                              <tr key={index}>
                                  <td>
                                      {task.name === "" ? (
                                          <input type="text"  className="form-control form-control-lg"  />
                                      ) : (
                                          task.name
                                      )}
                                  </td>
                                  <td>
                                      {task.status === "" ? (
                                          <RSelect 
                                             options={[{ value: 'active', label: 'active' }, { value: 'onhold', label: 'on hold' }]} 
                                              // ... [autres props pour RSelect si nécessaire]
                                          />
                                      ) : (
                                          task.status
                                      )}
                                  </td>
                                  <td>
                                      {task.due_date === "" ? (
                                          <DatePicker 
                                              selected={startDate}
                                             onChange={setStartDate}

                                              className="form-control date-picker" 
                                              // ... [autres props pour DatePicker si nécessaire]
                                          />
                                      ) : (
                                          task.due_date
                                      )}
                                  </td>
                                  <td>
                                      {task.isNew ? (
                                          <>
                                              <Button 
                                                  type="button" 
                                                  className="btn-round btn-icon" 
                                                  color="primary" 
                                                  size="sm"
                                                  onClick={() => deleteTask(index)}>
                                                  <Icon name="cross" />
                                              </Button>
                                              <Button 
                                                  type="button" 
                                                  className="btn-round btn-icon" 
                                                  color="primary" 
                                                  size="sm"
                                                  onClick={() => saveTask(index)}>
                                                  <Icon name="save" />
                                              </Button>
                                          </>
                                      ) : (
                                          <div className="custom-control custom-checkbox">
                                              <input type="checkbox" className="custom-control-input" id={`customCheck${index}`} />
                                              <label className="custom-control-label" htmlFor={`customCheck${index}`}></label>
                                          </div>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                </Col>

                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        {modalType === "add" && "Add Project"} {modalType === "edit" && "Update Project"}
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={(ev) => {
                          ev.preventDefault();
                          closeModal();
                        }}
                        className="link link-light"
                      >
                        Cancel
                      </Button>
                    </li>
                  </ul>
                </Col>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
  );
};
export default FormModalClientDetails;
