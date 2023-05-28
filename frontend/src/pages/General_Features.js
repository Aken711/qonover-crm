import React from 'react';
import Navigations from '../components/Navigations';
import NavigationsFooter from "../components/NavigationsFooter"

const Features = () => {
    return (
        <div>
             <Navigations />
             <div className="features">
                <div className="features-1 features-boxes">
                    <div className="features-text"><h2>Dashboard</h2>
                    <p>The dashboard is where you can view all the important information about your business at a glance. With this feature, you can keep track of your revenue, the number of projects in progress, tasks to be completed, upcoming appointments, and much more. At a glance, you can identify areas of your business that need more attention and make informed decisions for your business.</p></div>
                    <div className="features-img"><img src="./img/Analytics.svg" alt="" /></div>
                </div>
                <div className="features-2 features-boxes">
                    <div className="features-text"><h2>Customer / lead management</h2><p>Managing your customers and prospects is essential for any independent business. With our CRM, you can easily store all of your customers' and prospects' contact information, categorize them by industry, track them through every step of their journey, and even automate follow-up tasks. You can also use sales reports to understand your customers' buying behavior and improve your sales strategy.</p></div>
                    <div className="features-img"><img src="./img/Project.svg" alt="" /></div>
                </div>
                <div className="features-3 features-boxes">
                    <div className="features-text"><h2>Invoicing</h2><p>Invoicing is a crucial task for any independent business, but it can also be tedious and time consuming. With our CRM, you can create invoices in just a few clicks, including quotes and recurring invoices. You can also track payments, generate automatic payment reminders, and even integrate your CRM with accounting software to further simplify your invoice management.</p></div>
                    <div className="features-img"><img src="./img/Email.svg" alt="" /></div>
                </div>
                <div className="features-4 features-boxes">
                    <div className="features-text"><h2>Quotes</h2><p>Creating quotes for your customers is an important step in your sales process, but it can also be time consuming and error prone. With our CRM, you can create quotes in just minutes, customizing rates and options. You can also email them directly to your customers and track them in real time. This allows you to close sales faster and spend more time on other essential tasks.</p></div>
                    <div className="features-img"><img src="./img/Notes.svg" alt="" /></div>
                </div>
                <div className="features-5 features-boxes">
                    <div className="features-text"><h2>Project</h2><p>Project management is critical to the success of your freelance business. Our CRM allows you to create projects, assign tasks to different team members or yourself, set deadlines and track progress in real time. You can also collaborate with your clients on projects, sharing documents and feedback to ensure smooth and transparent communication throughout the process.</p></div>
                    <div className="features-img"><img src="./img/Complete.svg" alt="" /></div>
                </div>
             </div>
             <NavigationsFooter />
            
        </div>
    );
};

export default Features;


