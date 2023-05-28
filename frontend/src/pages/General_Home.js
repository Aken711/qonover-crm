import React from 'react';
import Navigations from '../components/Navigations';
import NavigationsFooter from "../components/NavigationsFooter"


const Home = () => {
    return (
        
        <div>
            <Navigations />
            <svg className='svghomepage' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#14213D1a" fill-opacity="1" d="M0,224L60,218.7C120,213,240,203,360,197.3C480,192,600,192,720,202.7C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>

                <div className="first-box-div main-boxes-homepage">
                    <div className="first-box-text">
                        <div className="first-box-h1"><h1> Save time, money and increase your productivity with our customized CRM for freelancers</h1></div>
                        <div className="first-box-cta"><button className='openaccount-btn'>open an account</button><button className='demo-btn'>watch  a demo</button></div>
                        </div>
                    <div className="first-box-img"><img src="./img/undraw_experience_design_re_dmqq.svg" alt="" /></div>
                </div>

                <h2 className='h2homepage'>Custom CRM for Freelancers: Improving Productivity and Simplifying Business Management</h2>

                <div className="second-box-div main-boxes-homepage">
                    <div className="second-box-img"><img src="./img/undraw_projections_re_ulc6.svg" alt="" /></div>
                    <div className="second-box-text">
                        
                        As a freelancer, you've probably already experienced the challenges of managing your business. Managing administrative tasks, invoices, payments, and billable hours can be a time-consuming task that keeps you from focusing on what you do best: working on projects for your clients. <br /><br />
                    That's where a custom CRM for freelancers comes in. Our CRM offers features specifically designed for freelancers, such as project management, automated invoicing and accounting. This allows freelancers to save time, be more productive and better manage their time and resources.<br /><br />
                    Our CRM provides a centralized platform for project management, billing and accounting, allowing you to stay organized and save time. In addition, our automated invoicing functionality allows you to create invoices, track payments and manage payment reminders all in one place, saving you from errors and delays.<br /><br />
                    But that's not all, our CRM also provides you with real-time data analysis, allowing you to better understand your cash flow and identify opportunities to increase your revenue.<br /><br />
                    In short, our custom CRM for freelancers is an essential tool to improve your productivity, increase your revenue and simplify the management of your business. Please contact us to learn more about our features and how our CRM can help you succeed as a freelancer.
                    </div>
                </div>

                <h2 className='h2homepage'>Centralize Your Business Management with Custom CRM for Freelancers</h2>

                <div className="third-box-div main-boxes-homepage">
                    <div className="third-box-text">
                    
                        Our custom CRM for freelancers is the ideal solution for freelancers looking to manage their clients and projects efficiently. Our tool offers a centralized platform for client management, invoicing, quotes, job board, dashboard, project and task management.<br /><br />
                    Centralizing all important information in one place allows freelancers to automate many tasks, saving them time and being more productive. In addition, our custom CRM is specifically designed to meet the needs of freelancers, unlike other tools that are often designed for large companies.<br /><br />
                    Compared to other project management tools, our custom CRM for freelancers is also much more affordable, offering a cost-effective solution for freelancers.<br /><br />
                    By using our custom CRM, freelancers can centralize all important information and automate many tasks to save time and be more productive. Our tool is also more affordable than other project management solutions, making it a wise choice for freelancers looking for a cost-effective solution to effectively manage their clients and projects.
                    </div>
                    <div className="third-box-img"><img src="./img/undraw_online_test_re_kyfx.svg" alt="" /></div>
                </div>

                <h2 className='h2homepage'>Benefits of Custom CRM for Freelancers: Saving Time, Increasing Productivity, and More</h2>

                <div className="fourth-box-div main-boxes-homepage">
                    <div className="fourth-box-img"><img src="./img/undraw_a_moment_to_relax_re_v5gv.svg" alt="" /></div>
                    <div className="fourth-box-text">
                        
                    Save time: Our CRM is specifically designed for freelancers. It simplifies the management of administrative tasks such as invoicing, client management, quote creation and project management. This allows you to save time and focus on the tasks that are most important to your business.
                    <br /><br />
                    Increase your productivity: With our CRM, you can centralize all your customer and project information in one place. This allows you to better organize your work and improve your productivity. You can easily follow the progress of your projects and identify the tasks that need to be done in priority.
                    <br /><br />
                    Save money: Business management tools are often expensive and difficult for freelancers to use. Our CRM is affordable and easy to use, allowing you to save money while benefiting from a powerful management tool.
                    <br /><br />
                    Facilitate collaboration: Our CRM facilitates collaboration with your clients and partners. You can easily share information and documents with them, allowing you to work more efficiently as a team.
                    <br /><br />
                    Increase efficiency: Our CRM is equipped with key features such as the job board and the dashboard that allow you to better organize your work and monitor the progress of your projects in real time. You can also automate certain recurring tasks to save time and improve your efficiency.
                    <br /><br />
                    Satisfy your customers: By using our CRM, you can provide your customers with superior service. You can track the progress of their projects in real time, respond quickly to their requests and offer them personalized service that meets their specific needs.
                    </div>
                </div>

            <NavigationsFooter />

        </div>
    );
};

export default Home;