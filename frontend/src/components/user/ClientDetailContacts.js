import {React, useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, Alert, Modal,ModalBody,ModalHeader } from "reactstrap";
import Icon from "../icon/Icon";
import Button from "../button/Button";

export const SpecialTable = ({ action, isCompact, data }) => {

  const transactionData = [
      {
        id: "1",
        contact_first_name: "John",
        contact_last_name: "Doe",
        contact_job_position: "CEO",
        contact_email: "john@email.com",
        contact_tel: "04 5 054554656",
        favorite_contact: "Yes",
      },
      {
        id: "2",
        contact_first_name: "Jane",
        contact_last_name: "Doe",
        contact_job_position: "CTO",
        contact_email: "jane@email.com",
        contact_tel: "04 5 054554656",
        favorite_contact: "No",
      },
      {
        id: "3",
        contact_first_name: "John",
        contact_last_name: "Dah",
        contact_job_position: "CFO",
        contact_email: "john@email.com",
        contact_tel: "04 5 054554656",
        favorite_contact: "No",
      },
      
    ]
  ;

  const [contacts, setContacts] = useState(transactionData);
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
      lastname:"",
      jobposition:"",
      email:"",
      tel:"",    
  });

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname:"",
      jobposition:"",
      email:"",
      tel:"",    
    });
  };

  const closeModal = () => {
    setModal(false);
    resetForm();
  };

  const handleHeartClick = (clickedContactId) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === clickedContactId) {
        return { ...contact, favorite_contact: "Yes" };
      }
      return { ...contact, favorite_contact: "No" };
    });
    setContacts(updatedContacts);
  };

  const handleTrashClick = (contactIdToDelete) => {
    const contactToDelete = contacts.find(contact => contact.id === contactIdToDelete);
    if (contactToDelete.favorite_contact === "Yes") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
    }, 3000);
        return;
    }
    const updatedContacts = contacts.filter(contact => contact.id !== contactIdToDelete);
    setContacts(updatedContacts);
};





  return (
    <div className="">
       {showAlert && (
    <Alert className="alert-icon" color="danger">
        <Icon name="alert-circle" />
        <strong>Failed</strong>. You can't delete the favorite contact
    </Alert>
)}
    <div className="add-btn w-100 text-end ">
      <Button color="primary" onClick={() => setModal(true)}>Add</Button>
    </div>

    <Modal isOpen={modal} toggle={() => closeModal()}>
      <ModalHeader toggle={closeModal} close={ <button className="close" onClick={closeModal}> <Icon name="cross" /> </button> } >
        Add contact
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
          <label className="form-label" htmlFor="first-name"> First Name </label>
            <div className="form-control-wrap"> <input type="text" className="form-control" id="first-name" /> </div>
          </div>
          <div className="form-group">
          <label className="form-label" htmlFor="last-name"> Last Name </label>
            <div className="form-control-wrap"> <input type="text" className="form-control" id="last-name" /> </div>
          </div>
          <div className="form-group">
          <label className="form-label" htmlFor="job-position"> Job Position </label>
            <div className="form-control-wrap"> <input type="text" className="form-control" id="job-position" /> </div>
          </div>
          <div className="form-group">
          <label className="form-label" htmlFor="email"> Email </label>
            <div className="form-control-wrap"> <input type="text" className="form-control" id="email" /> </div>
          </div>
          <div className="form-group">
          <label className="form-label" htmlFor="phone"> Phone </label>
            <div className="form-control-wrap"> <input type="text" className="form-control" id="phone" /> </div>
          </div>
            <Button className="w-100 text-center" color="primary" type="submit" onClick={(ev) => ev.preventDefault()} size="lg">
              <span className='text-center w-100'>Save Information</span>
            </Button>
        </form>
      </ModalBody>
      
    </Modal>

    <table className={`table table-tranx ${isCompact ? "is-compact" : ""}`}>
      <thead>
        <tr className="tb-tnx-head">
          <th className="tb-tnx-id">
            <span className="">#</span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span>Name</span>
            </span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span>Job</span>
            </span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span>Email</span>
            </span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span>Phone</span>
            </span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span></span>
            </span>
          </th>
          
        </tr>
      </thead>
      <tbody>
        {transactionData
          ? contacts.map((item) => {
              return (
                <tr key={item.id} className="tb-tnx-item">
                  <td className="tb-tnx-id">
                    <span>{item.id}</span> 
                  </td>
                  <td className="tb-tnx-info">
                      <span className="title">{item.contact_first_name} {item.contact_last_name} </span>                    
                  </td>
                  <td className="tb-tnx-info">
                      <span className="title">{item.contact_job_position}</span>
                  </td>
                  <td className="tb-tnx-info">
                      <span className="title">{item.contact_email}</span>
                  </td>
                  <td className="tb-tnx-info">
                      <span className="title">{item.contact_tel}</span>
                  </td>
                  <td className="tb-tnx-info">
                      <span className="title"> 
                        {item.favorite_contact ==="Yes" ? (<Icon name="heart-fill" className="ms-1 me-1 text-danger " style={{ cursor: 'pointer' }}></Icon>) : 
                        (<Icon name="heart" className="ms-1 me-1 " style={{ cursor: 'pointer' }} onClick={() => handleHeartClick(item.id)}></Icon>)}
                      </span>
                      <span className="title"> <Icon name="trash-alt" className="ms-1 me-1" style={{ cursor: 'pointer' }} onClick={() => handleTrashClick(item.id)}></Icon> </span>
                  </td>

                </tr>
              );
            })
          : contacts.data.map((item) => {
              return (
                <tr key={item.id} className="tb-tnx-item">
                <td className="tb-tnx-id">
                  <a href="#id" onClick={(ev) => { ev.preventDefault(); }} > <span>{item.id}</span> </a>
                </td>
                <td className="tb-tnx-info">
                    <span className="title">{item.contact_first_name} {item.contact_last_name} </span>                    
                </td>
                <td className="tb-tnx-info">
                    <span className="title">{item.contact_job_position}</span>
                </td>
                <td className="tb-tnx-info">
                    <span className="title">{item.contact_email}</span>
                </td>
                <td className="tb-tnx-info">
                    <span className="title">{item.contact_tel}</span>
                </td>
                <td className="tb-tnx-info">
                      <span className="title"> 
                        {item.favorite_contact ==="Yes" ? (<Icon name="heart-fill" className="ms-1 me-1 text-danger " style={{ cursor: 'pointer' }}></Icon>) :
                         (<Icon name="heart" className="ms-1 me-1 " style={{ cursor: 'pointer' }} onClick={() => handleHeartClick(item.id)}></Icon>)}
                      </span>
                      <span className="title"> <Icon name="trash-alt" className="ms-1 me-1" style={{ cursor: 'pointer' }} onClick={() => handleTrashClick(item.id)}></Icon> </span>
                  </td>
               
              </tr>
              );
            })}
      </tbody>
    </table>
   
    </div>
    
  );
  
};