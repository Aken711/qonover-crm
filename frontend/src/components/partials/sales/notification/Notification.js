import React from "react";
import { newUserData } from "./UserData";
import Icon from "../../../icon/Icon";
import { DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, CardTitle } from "reactstrap";

const Notifications = () => {
  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger me-n1">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu end>
          <ul className="link-list-opt no-bdr">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="setting"></Icon>
                <span>Participate</span>
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  return (
    <div className="card-inner-group">
      <div className="card-inner">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">Job board</h6>
          </CardTitle>
          <div className="card-tools">
            <a  href="/jobboard" className="link" onClick={(ev) => { ev.preventDefault();}}> View All </a>
          </div>
        </div>
      </div>
      <div className="card-inner card-inner-md text-center">No more job for the moment</div>
     
    </div>
  );
};
export default Notifications;
