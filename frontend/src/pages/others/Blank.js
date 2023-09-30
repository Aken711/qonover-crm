import React from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";

const BlankPage = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Job Board" />
      <Content>
        <div className="d-inline-block w-100 m-auto text-center">
          <span className=" fs-16px fw-bold">No Job for you at the moment, come back later.</span>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default BlankPage;
