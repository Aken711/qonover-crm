import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Select from "react-select";
import ReactPaginate from "react-paginate";

const createDate = [
  {
    value: "thisweek",
    label: "Last week",
  },
  {
    value: "thismonth",
    label: "Last month",
  },
  {
    value: "thisyear",
    label: "Last year",
  },
];

const lastActivity = [
  {
    value: "thisweek",
    label: "Last week",
  },
  {
    value: "thismonth",
    label: "Last month",
  },
  {
    value: "thisyear",
    label: "Last year",
  },
];

const UserApp_Crm = () => {
  const clientUser = [];
  const statusClient = [];

  const [user, setUser] = useState({});
  const { id } = useParams();

  const [filters, setFilters] = useState({
    createdDate: null,
    lastActivity: null,
    statusLead: null,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/user/userinfo/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  if (user.client) {
    const userClientDB = user.client;
    const statusSet = new Set();

    userClientDB.forEach((client) => {
      const clientFavoriteContacts = client.contacts.filter(
        (contact) => contact.favorite_contact === "yes"
      );

      clientFavoriteContacts.forEach((contact) => {
        clientUser.push({
          id: client._id,
          company: client.company,
          address: client.hq_address,
          zipcode: client.hq_zipcode,
          city: client.hq_city,
          country: client.hq_country,
          vta: client.VTA,
          status: client.status,
          date_creation: client.date_creation,
          date_last_modification: client.date_last_modification,
          ...contact, // Ajouter les informations du contact favori
        });

        if (!statusSet.has(client.status)) {
          statusSet.add(client.status);
          statusClient.push({
            value: client.status,
            label: client.status,
          });
        }
      });
    });
  }

  const filteredClients = clientUser.filter((client) => {
    let passFilters = true;

    if (filters.createdDate && filters.createdDate.value) {
      const currentDate = new Date();
      let filterDate;

      if (filters.createdDate.value === "thisweek") {
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
      } else if (filters.createdDate.value === "thismonth") {
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
      } else if (filters.createdDate.value === "thisyear") {
        filterDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      }

      if (filterDate && new Date(client.date_creation) < filterDate) {
        passFilters = false;
      }
    }

    if (filters.lastActivity && filters.lastActivity.value) {
      const currentDate = new Date();
      let filterDate;

      if (filters.lastActivity.value === "thisweek") {
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
      } else if (filters.lastActivity.value === "thismonth") {
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
      } else if (filters.lastActivity.value === "thisyear") {
        filterDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
      }

      if (filterDate && new Date(client.date_last_modification) < filterDate) {
        passFilters = false;
      }
    }

    if (
      filters.statusLead &&
      !filters.statusLead.some((status) => status.value === client.status)
    ) {
      passFilters = false;
    }

    return passFilters;
  });

  const filteredClientsSearch = filteredClients.filter((client) => {
    const fullName = `${client.contact_first_name} ${client.contact_last_name}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const clientsToDisplay = filteredClientsSearch.slice(startIndex, endIndex);

  const handleDelete = () => {
    // Suppression des utilisateurs sélectionnés
    console.log("Utilisateurs sélectionnés :", selectedUsers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateContact = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseCreateInvoice = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    company: "",
    contacts: [
      {
        contact_first_name: "",
        contact_last_name: "",
        contact_job_position: "",
        contact_email: "",
        contact_tel: "",
        favorite_contact: "",
      },
    ],
    company_id_number: "",
    hq_address: "",
    hq_zipcode: "",
    hq_city: "",
    hq_country: "",
    VTA: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedContacts = [...prevFormData.contacts];
      updatedContacts[index][name] = value;
      return {
        ...prevFormData,
        contacts: updatedContacts,
      };
    });
  };

  const handleFavoriteContactChange = (index) => {
    setFormData((prevFormData) => {
      const updatedContacts = prevFormData.contacts.map((contact, i) => {
        if (i === index) {
          return {
            ...contact,
            favorite_contact: contact.favorite_contact === "yes" ? "no" : "yes",
          };
        }
        return {
          ...contact,
          favorite_contact: "no",
        };
      });
      return {
        ...prevFormData,
        contacts: updatedContacts,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const addContact = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contacts: [
        ...prevFormData.contacts,
        {
          contact_first_name: "",
          contact_last_name: "",
          contact_job_position: "",
          contact_email: "",
          contact_tel: "",
          favorite_contact: "",
        },
      ],
    }));
  };

  const removeContact = (index) => {
    setFormData((prevFormData) => {
      const updatedContacts = [...prevFormData.contacts];
      updatedContacts.splice(index, 1);
      return {
        ...prevFormData,
        contacts: updatedContacts,
      };
    });
  };
  return (
    <div className="userapp">
      <Navigation />

      <div className="userapp-crm">
        <div className="userapp-crm-addcontact">
          <div className="userappinvoices-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              className="invoices-icons-search"
            >
              <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
            </svg>
            <input
              type="text"
              className="invoices-search-input"
              placeholder="Search for a customer..."
              onChange={handleSearch}
            />
          </div>
          <div className="userapp-crm-addcontact-solo">
            <button className="btn btn-primary" onClick={handleCreateContact}>
              Create contact
            </button>
          </div>
        </div>

        <div className="userapp-crm-table">
          <div className="userapp-crm-table-filter">
            <div className="ucrtf-create-date">
              <Select
                placeholder="Created date"
                options={createDate}
                onChange={(selectedOption) =>
                  setFilters({ ...filters, createdDate: selectedOption })
                }
              />
            </div>
            <div className="ucrtf-last-activity">
              <Select
                placeholder="Last activity"
                options={lastActivity}
                onChange={(selectedOption) =>
                  setFilters({ ...filters, lastActivity: selectedOption })
                }
              />
            </div>
            <div className="ucrtf-status-client">
              <Select
                placeholder="Status lead"
                options={statusClient}
                isMulti
                className="basic-multi-select"
                onChange={(selectedOptions) =>
                  setFilters({ ...filters, statusLead: selectedOptions })
                }
              />
            </div>
          </div>
          <div className="userapp-crm-table-details">
            <div className="userapp-crm-table-details-action-button">
              <div
                className="userapp-crm-table-details-action-button-delete btn btn-primary"
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
            <div className="userapp-crm-table-details-table-div">
              <table className="userapp-crm-table-details-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Created date</th>
                    <th>Last Activity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clientsToDisplay.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${client.id}`}
                          value="option1"
                          checked={selectedUsers.includes(client.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedUsers((prevSelectedUsers) =>
                              checked
                                ? [...prevSelectedUsers, client.id]
                                : prevSelectedUsers.filter(
                                    (id) => id !== client.id
                                  )
                            );
                          }}
                        />
                      </td>
                      <td>{`${client.contact_first_name} ${client.contact_last_name}`}</td>
                      <td>{client.company}</td>
                      <td>{client.contact_email}</td>
                      <td>{client.contact_tel}</td>
                      <td>{client.status}</td>
                      <td>
                        {new Date(client.date_creation).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(
                          client.date_last_modification
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span>&#10148;</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="userapp-crm-table-details-slider">
              <ReactPaginate
                previousClassName="prev-paginate"
                nextLabel={"Next"}
                nextClassName="next-paginate"
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredClientsSearch.length / perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active-pagination"}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay-add-contact">
            <div className="modal-content-add-contact">
              <div className="modal-content-add-contact-header">
                <h3>Create a new contact</h3>
                <button className="" onClick={handleCloseCreateInvoice}>
                  X
                </button>
              </div>
              <div className="modal-content-add-contact-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Company registr N°</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company_id_number"
                        value={formData.company_id_number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">VTA</label>
                      <input
                        type="text"
                        className="form-control"
                        name="VTA"
                        value={formData.VTA}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">HQ Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hq_address"
                        value={formData.hq_address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">HQ Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hq_zipcode"
                        value={formData.hq_zipcode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">HQ City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hq_city"
                        value={formData.hq_city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">HQ Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="hq_country"
                      value={formData.hq_country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="prospect">Prospect</option>
                      <option value="contact">En Contact</option>
                      <option value="client">Client</option>
                      <option value="lead">Lead Froid</option>
                    </select>
                  </div>

                  {formData.contacts.map((contact, index) => (
                    <div key={index} className="mb-3">
                      <h6>Contact {index + 1}</h6>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contact_first_name"
                            value={contact.contact_first_name}
                            onChange={(e) => handleContactChange(e, index)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contact_last_name"
                            value={contact.contact_last_name}
                            onChange={(e) => handleContactChange(e, index)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Favorite Contact</label>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={contact.favorite_contact === "yes"}
                              onChange={() =>
                                handleFavoriteContactChange(index)
                              }
                            />
                            <label className="form-check-label">Favorite</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Job Position</label>
                        <input
                          type="text"
                          className="form-control"
                          name="contact_job_position"
                          value={contact.contact_job_position}
                          onChange={(e) => handleContactChange(e, index)}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="contact_email"
                            value={contact.contact_email}
                            onChange={(e) => handleContactChange(e, index)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Telephone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contact_tel"
                            value={contact.contact_tel}
                            onChange={(e) => handleContactChange(e, index)}
                          />
                        </div>
                      </div>

                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-delete-contact-form mt-2"
                          onClick={() => removeContact(index)}
                        >
                          Remove Contact
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-primary btn-add-contact-form"
                    onClick={addContact}
                  >
                    Add Contact
                  </button>
                        <div>
                  <button type="submit" onClick={handleSubmit} className="btn btn-success btn-save mt-3">
                    Save
                  </button>

                        </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApp_Crm;
