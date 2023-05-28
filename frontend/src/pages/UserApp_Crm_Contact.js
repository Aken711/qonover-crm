import React, {useState} from 'react';
import Navigation from '../components/Navigation';

const data_user = {
    name: "Michel Lolo",
    email:"loerm@ipsum.com",
    company:"Dumb Company",
    address:"dum adress, 75100 paris",
    telephone:"0728282828",
}

const data_tasks = [
    { 
        name: "Lorem ipsum dolor sit amet.", 
        due_date: Date("2023-12-23")
    },
    { 
        name: "Lorem ipsum dolor sit amet.", 
        due_date: Date("2023-12-22")
    },
    { 
        name: "Lorem ipsum dolor sit amet.", 
        due_date:Date("2023-01-23")
    },
    { 
        name: "Lorem ipsum dolor sit amet.", 
        due_date: Date("2023-02-23")
    },
    { 
        name: "Lorem ipsum dolor sit amet.", 
        due_date: Date("2023-01-30")
    },
]

const pinned_document = [
    {
        name_pinned: "Lorem, ipsum.",
        date: Date("2023-01-30")
    },
    {
        name_pinned: "Lorem, ipsum.",
        date: Date("2023-01-30")
    },
    {
        name_pinned: "Lorem, ipsum.",
        date: Date("2023-01-30")
    },
]




const UserApp_Crm_Contact = () => {
    function TabDisplay() {
        const [selectedTab, setSelectedTab] = useState('Overview');
      
        const handleTabClick = (tabName) => {
          setSelectedTab(tabName);
        };
        TabDisplay()
    return (
        
        <div className="userapp">
            <Navigation />
            <div className="userapp-contact">
                <div className="userapp-contact-leftside">
                    <div className="userapp-contact-leftside-name"><h2>{data_user.name}</h2></div>
                    <div className="userapp-contact-leftside-contact-details">
                        <div className="userapp-contact-leftside-contact-details-company"><h3>Company</h3></div>
                        <div className="userapp-contact-leftside-contact-details-address">Lorem ipsum dolor sit amet.</div>
                        <div className="userapp-contact-leftside-contact-details-email">lorem@ipsum.com</div>
                        <div className="userapp-contact-leftside-contact-details-telephone">072727272727</div>
                        <div className="userapp-contact-leftside-contact-details-status"><select name="" id=""><option value="">Close</option><option value="">Open</option></select></div>
                    </div>
                </div>
                <div className="userapp-contact-rightside">

                                <div className="userapp-contact-rightside-tabs">
                                    <div className="userapp-contact-rightside-tabs-overview" onClick={() => handleTabClick('Overview')}>Overview</div>
                                    <div className="userapp-contact-rightside-tabs-tasks" onClick={() => handleTabClick('Tasks')}>Tasks</div>
                                    <div className="userapp-contact-rightside-tabs-appointments" onClick={() => handleTabClick('Appointments')}>Appointments</div>
                                    <div className="userapp-contact-rightside-tabs-biling" onClick={() => handleTabClick('Billing')}>Billing</div>
                                    <div className="userapp-contact-rightside-tabs-notes" onClick={() => handleTabClick('Notes')}>Notes</div>
                                    <div className="userapp-contact-rightside-tabs-documents" onClick={() => handleTabClick('Documents')}>Documents</div>
                                </div>
                                {selectedTab === 'Overview' && <div className="user-contact-rightside-overview"><div className="userapp-contact-rightside-lastest-tasks">
                                    <div className="userapp-contact-rightside-lastest-tasks-top">
                                        <span className="latesttasksname">Latest tasks</span> <span className="showallbutton">Show all</span>
                                    </div>
                                    <div className="userapp-contact-rightside-lastest-tasks-body">
                                        {data_tasks.map((task, index) => (
                                            <div key={index} className="userapp-contact-rightside-lastest-tasks-body-task-item">
                                                <div className="userapp-contact-rightside-lastest-tasks-body-tasks-checkbox"><input type="checkbox" name="" id="" /></div>
                                                <div className="userapp-contact-rightside-lastest-tasks-body-task-name">{task.name}</div>
                                                <div className="userapp-contact-rightside-lastest-tasks-body-task-due-date">{task.due_date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="userapp-contact-rightside-pinned-informations">
                                    {pinned_document.map((pinned, index)=>(
                                    <div key={index} className="userapp-contact-rightside-pinned-informations-box">
                                        <div className="userapp-contact-rightside-pinned-informations-box-title">{pinned.name}</div>
                                        <div className="userapp-contact-rightside-pinned-informations-box-duedate">{pinned.due_date}</div>
                                    </div>
                                    ))}
                                </div></div>}
                                {selectedTab === 'Tasks' && <div className="user-contact-rightside-tasks">Tasks Content</div>}
                                {selectedTab === 'Appointments' && <div className="user-contact-rightside-appointments">Appointments Content</div>}
                                {selectedTab === 'Billing' && <div className="user-contact-rightside-billing">Billing Content</div>}
                                {selectedTab === 'Notes' && <div className="user-contact-rightside-notes">Notes Content</div>}
                                {selectedTab === 'Documents' && <div className="user-contact-rightside-documents">Documents Content</div>}




                </div>

            </div>
        </div>
    );
}
};

export default UserApp_Crm_Contact;