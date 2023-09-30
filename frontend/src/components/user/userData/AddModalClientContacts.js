import React, {useEffect} from "react";
import {
  Modal,
  ModalBody,
  Form,
} from "reactstrap";
import {
  Icon,
  Col,
  Button,
  RSelect,
} from "../../Component";
import { useForm } from "react-hook-form";


const AddModal = ({modal,closeModal,onSubmit, formData, setFormData,filterStatus}) => {
    useEffect(() => {
        reset(formData)
      }, [formData]);
  const {reset, register, handleSubmit, formState: { errors } } = useForm();
  return (

        <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                closeModal()
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Client</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('company', { required: "This field is required" })}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter company" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Registration Number</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('registrationnumber', { required: "This field is required" })}
                        value={formData.registrationnumber}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter regist. number" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">VTA Number</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('vta', { required: "This field is required" })}
                        value={formData.vta}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter VTA number" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('address', { required: "This field is required" })}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter Address" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Zipcode</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('zipcode', { required: "This field is required" })}
                        value={formData.zipcode}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter zipcode" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('city', { required: "This field is required" })}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter city" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('country', { required: "This field is required" })}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter country" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('firstname', { required: "This field is required" })}
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter first name" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('lastname', { required: "This field is required" })}
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter last name" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Job Position</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('jobposition', { required: "This field is required" })}
                        value={formData.jobposition}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter job position" />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Email </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register('email', {
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email" />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register('phone', { required: "This field is required" })}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                         />
                        
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          value={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add User
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            closeModal();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
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
export default AddModal;
