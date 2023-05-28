import React, { useState, useEffect } from "react";
import { NavLink , useParams} from "react-router-dom";

const Navigation = () => {
  const { id } = useParams();

  return (
    <div className="navigation_user">
      <div className="nav-link-user">
        <div className="nav-link-user-logo">
          <img src="/img/LogoNew.png" alt="logo Qonover" width={"75vw"} />
        </div>

        <div className="nav-link-user-btn">
          <NavLink to={`/app/dashboard/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M510 486V216h330v270H510ZM120 606V216h330v390H120Zm390 330V546h330v390H510Zm-390 0V666h330v270H120Zm60-390h210V276H180v270Zm390 330h210V606H570v270Zm0-450h210V276H570v150ZM180 876h210V726H180v150Zm210-330Zm180-120Zm0 180ZM390 726Z"/></svg>Dashboard
          </NavLink>
          <NavLink to={`/app/crm/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M474 570q26-32 38.5-66t12.5-79q0-45-12.5-79T474 280q76-17 133.5 23T665 425q0 82-57.5 122T474 570Zm216 326v-94q0-51-26-95t-90-74q173 22 236.5 64T874 802v94H690Zm110-289V507H700v-60h100V347h60v100h100v60H860v100h-60Zm-485-32q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM0 896v-94q0-35 18.5-63.5T68 696q72-32 128.5-46T315 636q62 0 118 14t128 46q31 14 50 42.5t19 63.5v94H0Zm315-381q39 0 64.5-25.5T405 425q0-39-25.5-64.5T315 335q-39 0-64.5 25.5T225 425q0 39 25.5 64.5T315 515ZM60 836h510v-34q0-16-8-30t-25-22q-69-32-117-43t-105-11q-57 0-104.5 11T92 750q-15 7-23.5 21.5T60 802v34Zm255-411Zm0 411Z" /></svg>CRM
          </NavLink>
          <NavLink to={`/app/invoices/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="m434 801 229-229-39-39-190 190-103-103-39 39 142 142ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg>Invoices
          </NavLink>
          <NavLink to={`/app/quotations/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M450 822h60V693h130v-60H510V503h-60v130H320v60h130v129ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg>Quotations
          </NavLink>
          <NavLink to={`/app/projects/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M140 896q-23 0-41.5-18.5T80 836V316q0-23 18.5-41.5T140 256h281l60 60h339q23 0 41.5 18.5T880 376H455l-60-60H140v520l102-400h698L833 850q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm0 0 84-340-84 340Zm-63-460v-60 60Z"/></svg>Projects
          </NavLink>
          <NavLink to={`/app/tasks/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M480 976q-85 0-158-30.5T195 861q-54-54-84.5-127T80 576q0-84 30.5-157T195 292q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140 576q0 145 97.5 242.5T480 916q145 0 242.5-97.5T820 576q0-30-4.5-58.5T802 462l46-46q16 37 24 77t8 83q0 85-31 158t-85 127q-54 54-127 84.5T480 976Zm-59-218L256 592l45-45 120 120 414-414 46 45-460 460Z"/></svg>Tasks
          </NavLink>
          <NavLink to={`/app/profile/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z"/></svg>Profile
          </NavLink>
        </div>

        <div className="nav-link-user-logout">
          <NavLink to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path className="icon-nav-bar" d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"/></svg>Log Out
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
