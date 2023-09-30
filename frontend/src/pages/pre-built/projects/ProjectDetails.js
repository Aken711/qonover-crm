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
  RSelect
} from "../../../components/Component";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";


const ProjectDetails = () => {

    const projectDetailsData = { 
        id: 1,
        name: "Projet fictif",
    description: "Ceci est une description fictive du projet.",
    status: "En cours",
    status_date_change: new Date('2023-09-01T10:00:00Z'),
    date_start: new Date('2023-08-15T08:30:00Z'),
    time_estimated_number: 10,
    time_estimated_format: "jour",
    time_real_number: 5,
    time_real_format: "heure",
    price_pre_tax: "2500.00",
    currency: "USD",
}

const startDate = new Date(projectDetailsData.date_start);
let endDate = new Date(startDate);
if (projectDetailsData.time_estimated_format === 'days') {
  endDate.setDate(startDate.getDate() + projectDetailsData.time_estimated_number);
} else if (projectDetailsData.time_estimated_format === 'weeks') {
  endDate.setDate(startDate.getDate() + projectDetailsData.time_estimated_number * 7);
} // Ajoutez d'autres cas en fonction de vos besoins

// Fonction pour formater la date au format "YYYY-MM-DD"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

useEffect(() => {
  // Vous pouvez effectuer des opérations supplémentaires ici, si nécessaire
}, []);

    return (
        <React.Fragment>
        <Head title="Project Details" />
        <Content>
        <BlockHead size="sm">
        <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Project / <strong className="text-primary small">{projectDetailsData.name}</strong>
                </BlockTitle>
                
              </BlockHeadContent>
        </BlockHead>
        <Block>
            <Card>
                <div className="card-inner">
                    
                <BlockHead>
                    <BlockTitle tag="h5">{projectDetailsData.name}</BlockTitle>
                </BlockHead>

             
                    <div className="project-ud-list">
                        <strong className="project-ud-label">Status: </strong>
                        <div className="select-status">
                            <RSelect options={[{ value: 'active', label: 'active' }, { value: 'onhold', label: 'on hold' } ,  { value: 'close', label: 'close' }]}
                            value={[{ value: projectDetailsData.status, label: projectDetailsData.status }]}  />
                        </div>
                    </div>
               
             
                <div className="project-ud-list">
                        <strong className="project-ud-label"> Start Date: </strong>
                        <div className="select-start-date">
                        <DatePicker selected={projectDetailsData.date_start} className="form-control date-picker" />
                        </div>
                    </div>
                <div className="project-ud-list">
                        <strong className="project-ud-label"> Estimated Due Date: </strong>
                        <div className="select-status">
                        {formatDate(endDate)}
                        </div>
                    </div>
             
               
                <div className="project-ud-list">
                      <strong className="project-ud-label">Description: </strong>
                     <textarea className="no-resize form-control">{projectDetailsData.description}</textarea>
                </div>
                </div>

                
                
            </Card>
        </Block>
        </Content>
      </React.Fragment>
    );
};

export default ProjectDetails;