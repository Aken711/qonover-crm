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

const FormModalClientDetailsTask = ({modal,closeModal,onSubmit, formData, setFormData, modalType}) => {

    useEffect(() => {
        reset(formData)
      }, [formData]);
  
  const { reset, register, handleSubmit, formState: { errors } } = useForm();


const [startDate, setStartDate] = useState(new Date());

const [selectedClient, setSelectedClient] = useState(null);
const [projectOptions, setProjectOptions] = useState([]);

const clientsData = [
  { 
    value: 'client1', 
    label: 'Client A', 
    projects: [
      { value: 'projectX', label: 'Project X' },
      { value: 'projectY', label: 'Project Y' }
    ]
  },
  { 
    value: 'client2', 
    label: 'Client B', 
    projects: [
      { value: 'projectZ', label: 'Project Z' }
    ]
  },
  { 
    value: 'client3', 
    label: 'Client C', 
    projects: []
  }
];

const handleClientChange = (option) => {
  setSelectedClient(option.value);
  const client = clientsData.find(client => client.value === option.value);
  setProjectOptions(client ? client.projects : []);
};

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="xl">
        <ModalBody>
          <a href="#cancel" onClick={(ev) => { ev.preventDefault(); closeModal(); }} className="close" >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">{modalType === "add" && "Add Task"} {modalType === "edit" && "Update Task"}</h5>
            <div className="mt-4">
              <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
                <Col md="8">
                  <div className="form-group">
                    <label className="form-label">Task name</label>
                    <input
                      type="text"
                      {...register('name', { required: "This field is required" })}
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
                    <label className="form-label">Priority</label>
                    <RSelect 
                    options={[{ value: 'low', label: 'Low' }, { value: 'mid', label: 'Mid' }, { value: 'high', label: 'High' }]} 
                     />
                  </div>
                </Col>
                
                <Col md="6">
      <div className="form-group">
        <label className="form-label">Client</label>
        <RSelect 
          options={clientsData.map(client => ({ value: client.value, label: client.label }))}
          onChange={handleClientChange}
        />
      </div>
    </Col>

    <Col md="6">
      <div className="form-group">
        <label className="form-label">Project</label>
        <RSelect 
          options={projectOptions}
          isDisabled={!selectedClient || projectOptions.length === 0}
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
               

                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        {modalType === "add" && "Add Task"} {modalType === "edit" && "Update Task"}
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
export default FormModalClientDetailsTask;
