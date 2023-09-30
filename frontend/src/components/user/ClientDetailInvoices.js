import {React, useState, Fragment, useEffect } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";
import Icon from "../icon/Icon";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavLink, NavItem, TabContent, TabPane, Form} from "reactstrap";
import {
    Col,
    RSelect,
    Row
  } from "../Component";
  import DatePicker from "react-datepicker";


const ClientDetailInvoices = () => {


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [items, setItems] = useState([{ id: 0, item: "", price: 0, quantity: 0 }]);


    const addItem = () => {
      const newItemId = items.length;
      setItems([...items, { id: newItemId, item: "", price: 0, quantity: 0 }]);
    };

    const deleteItem = (itemId) => {
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    };


    const calculatePretaxValue = () => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTaxIncludedValue = (pretaxValue, taxPercentage) => {
      if (taxPercentage > 0) {
        return pretaxValue * (1 + taxPercentage / 100);
      } else {
        return pretaxValue;
      }
    };
    

    const [isVATChecked, setIsVATChecked] = useState(false);
    const [taxPercentage, setTaxPercentage] = useState(20); // Initial value for tax percentage

    const taxIncludeValue = calculateTaxIncludedValue(
      calculatePretaxValue(),
      isVATChecked ? taxPercentage : 0
    );
    const handleItemChange = (index, field, value) => {
      const updatedItems = items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: parseFloat(value) };
        }
        return item;
      });
      setItems(updatedItems);
    };
    
    const [startDate, setStartDate] = useState(new Date());


    const orderData = [
        {
            number: "INV001",
            client: "Entreprise A",
            items: [
                {
                    wording: "Chaise de bureau",
                    price_unit: 100,
                    nb_unit: 2,
                    pretax_value: 200,
                    tax_include_value: 240
                },
                {
                    wording: "Table de réunion",
                    price_unit: 300,
                    nb_unit: 1,
                    pretax_value: 300,
                    tax_include_value: 360
                }
            ],
            total_pretax_value: 500,
            total_tax_include_value: 600,
            tva_checkbox: "Oui",
            tva_percentage: 20,
            date_issue: new Date("2023-01-10"),
            date_assumed: new Date("2023-01-17"),
            date_payment: new Date("2023-01-25"),
            status: "Paid"
        },
        {
            number: "INV002",
            client: "Entreprise B",
            items: [
                {
                    wording: "Ordinateur portable",
                    price_unit: 1000,
                    nb_unit: 3,
                    pretax_value: 3000,
                    tax_include_value: 3600
                }
            ],
            total_pretax_value: 3000,
            total_tax_include_value: 3600,
            tva_checkbox: "Oui",
            tva_percentage: 20,
            date_issue: new Date("2023-02-05"),
            date_assumed: new Date("2023-02-12"),
            date_payment: new Date("2023-03-05"),
            status: "Overdue"
        },
        {
            number: "INV003",
            client: "Entreprise C",
            items: [
                {
                    wording: "Souris sans fil",
                    price_unit: 50,
                    nb_unit: 10,
                    pretax_value: 500,
                    tax_include_value: 600
                }
            ],
            total_pretax_value: 500,
            total_tax_include_value: 600,
            tva_checkbox: "Oui",
            tva_percentage: 20,
            date_issue: new Date("2023-03-10"),
            date_assumed: new Date("2023-03-17"),
            date_payment: new Date("2023-03-24"),
            status: "Draft"
        },
        {
            number: "INV004",
            client: "Entreprise D",
            items: [
                {
                    wording: "Clavier mécanique",
                    price_unit: 120,
                    nb_unit: 5,
                    pretax_value: 600,
                    tax_include_value: 720
                }
            ],
            total_pretax_value: 600,
            total_tax_include_value: 720,
            tva_checkbox: "Oui",
            tva_percentage: 20,
            date_issue: new Date("2023-04-05"),
            date_assumed: new Date("2023-04-12"),
            date_payment: new Date("2023-05-05"),
            status: "Pending"
        },
        {
            number: "INV005",
            client: "Entreprise E",
            items: [
                {
                    wording: "Ecran 4K",
                    price_unit: 500,
                    nb_unit: 2,
                    pretax_value: 1000,
                    tax_include_value: 1200
                }
            ],
            total_pretax_value: 1000,
            total_tax_include_value: 1200,
            tva_checkbox: "Oui",
            tva_percentage: 20,
            date_issue: new Date("2023-05-01"),
            date_assumed: new Date("2023-05-08"),
            date_payment: new Date("2023-06-01"),
            status: "Paid"
        }
    ];

    const clientOptions = orderData.map(order => ({ value: order.client, label: order.client }));


      return (
        <div>
            <div className="buttonaddinvoice w-100 text-end">
                <Button color="primary" className="btn-sm" onClick={toggle}>Add Invoices</Button>
            </div>
        <table className="table table-orders">
          <thead className="tb-odr-head">
            <tr className="tb-odr-item">
              <th className="tb-odr-info">
                <span className="tb-odr-id">Invoice ID</span>
              </th>
              <th className="tb-odr-client">
                <span className="tb-odr-client">Client</span>
              </th>
              <th className="tb-odr-amout">
                <span className="tb-odr-total">Amount</span>
              </th>
              <th className="tb-odr-date">
                <span className="tb-odr-date">Due Date</span>
              </th>
              <th className="tb-odr-date">
                <span className="tb-odr-date">Status</span>
              </th>
              <th className="tb-odr-action">&nbsp;</th>
            </tr>
          </thead>
          <tbody className="tb-odr-body">
            {orderData.map((item) => {
              return (
                <tr className="tb-odr-item" key={item.number}>
                  <td className="tb-odr-info">
                    <span className="tb-odr-id">
                      <a href="#id" onClick={(ev) => { ev.preventDefault(); }} > {item.number} </a>
                    </span>
                  </td>
                  <td className="tb-odr-client">
                    <span className="tb-odr-client">
                        {item.client}
                    </span>
                  </td>
                  <td className="tb-odr-amount">
                    <span className="tb-odr-total">
                      <span className="amount">${item.total_tax_include_value}</span>
                    </span>
                    </td>
                    <td className="tb-odr-date">
                    <span className="tb-odr-date">
                        {item.date_assumed.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="tb-odr-status">
                    <span className="tb-odr-status">
                      <Badge
                        className="badge-dot"
                        color={
                          item.status === "Paid" ? "success" 
                          : item.status === "Pending" ? "warning" 
                          : item.status === "Draft" ? "light"
                          : "danger"
                        }
                      >
                        {item.status}
                      </Badge>
                    </span>
                  </td>
                  <td className="tb-odr-action">
                    <div className="tb-odr-btns d-none d-md-inline">
                      
                    </div>
                    <UncontrolledDropdown>
            <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
              <Icon name="more-h"></Icon>
            </DropdownToggle>
            <DropdownMenu end>
              <ul className="link-list-plain">
                <li> <DropdownItem tag="a" href={`/invoice-details/${item.id}`} > View </DropdownItem> </li>
                <li> <DropdownItem tag="a" href={`/invoice-print/${item.id}`}  > Download </DropdownItem> </li>
                <li> <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => { ev.preventDefault(); }} > Delete </DropdownItem> </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>


        <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader
                    toggle={toggle}
                    close={
                      <button className="close" onClick={toggle}>
                        <Icon name="cross" />
                      </button>
                    }
                  >
                    Create an invoice
                  </ModalHeader>
                  <ModalBody>
                  <Form className="row gy-4" > 
                   <Col md="12">
                    <div className="form-group">
                        <label className="form-label">Invoice ID</label>
                        <input
                            type="text"
                            placeholder="Enter invoice ID"
                            className="form-control" />
                    </div>
                   </Col>

                    

                    {items.map((item, index) => (
              <Row key={index} className="mb-1 mt-1">
                <Col md="12">
                  <div className="itemwrap d-flex justify-content-between mb-1">
                    <label className="form-label">Items</label>
                    {index === items.length - 1 && (
                      <Button type="button" color="primary" size="sm" onClick={addItem} > Add item </Button> )} 
                      {index !== 0 && ( <Button type="button" color="danger" size="sm" onClick={() => deleteItem(item.id)} > Delete </Button> )}
                      </div>
                  <input
                    type="text"
                    name={`item-${index}`}
                    id={`item-${index}`}
                    className="form-control"
                    placeholder="Enter name of the item"
                  />
                </Col>
                <Col md="6" className="mb-1 mt-1">
                  <label className="form-label">Price unit (tax excluded)</label>
                  <input
                    type="number"
                    name={`price-${index}`}
                    id={`price-${index}`}
                    className="form-control"
                    placeholder="Enter price"
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  />
                </Col>
                <Col md="6" className="mb-1 mt-1">
                  <label className="form-label">Nb unit</label>
                  <input
                    type="number"
                    name={`quantity-${index}`}
                    id={`quantity-${index}`}
                    className="form-control"
                    placeholder="Enter nb unit"
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </Col>
              </Row>
            ))}
                    <Col md="6">
                        <label className="form-label">Pretax Value</label>
                        <input type="number" value={calculatePretaxValue()} disabled name="" id="" className="form-control"  />
                    </Col>
                    <Col md="6">
                        <label className="form-label">Tax Included</label>
                        <input type="number" disabled  value={calculateTaxIncludedValue(calculatePretaxValue(), isVATChecked ? taxPercentage : 0).toFixed(2)} name="" id="" className="form-control"  />
                    </Col>

                    <Col md="6">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" defaultChecked id="customSwitch2"  checked={isVATChecked}
  onChange={() => setIsVATChecked(!isVATChecked)}/>
                      <label className="custom-control-label" htmlFor="customSwitch2"> VTA </label>
                    </div>
                    </Col>
                    <Col md="6">
                        <label className="form-label">Tax %</label>
                        <input type="number" onChange={(e) => setTaxPercentage(parseFloat(e.target.value))} name="" id="" className="form-control"  />
                    </Col>

                    <Col md="6">
                        <label className="form-label">Payment date assumed</label>
                        <DatePicker selected={startDate} onChange={setStartDate} className="form-control date-picker" dateFormat="dd/MM/yyyy" />

                    </Col>

                    <Col md="12">
                    <Button color="primary" className="w-100 justify-content-center">Save</Button>
                    </Col>
                  </Form>
                  </ModalBody>
                </Modal>
        
        

        

        </div>
      );
};

export default ClientDetailInvoices;