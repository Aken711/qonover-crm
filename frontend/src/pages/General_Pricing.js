import React from 'react';
import Navigations from '../components/Navigations';
import NavigationsFooter from "../components/NavigationsFooter"

const Pricing = () => {
    return (
        <div>
             <Navigations />
             <div className="pricing">
                <div className="pricing-text">
                    <div className="pricing-text-left">
                        <h1>Say goodbye to complicated pricing structures.</h1>
                        <h5>At Qonover, we believe in keeping things simple. That's why we offer only one solution at a fixed monthly price, with no commitments required. Our all-in-one plan includes all the features you need to manage your customer relationships effectively, without any hidden costs or surprises. With our straightforward pricing, you can budget and plan with confidence, knowing exactly what you're paying for each month. And if you ever need help, our dedicated support team is always here to assist you. So why complicate things with multiple pricing plans and complicated tiers? Choose Qonover for a straightforward, hassle-free CRM solution</h5>
                    </div>
                    <div className="pricing-text-right">
                        <img src="./img/Launch.svg" alt="" />
                    </div>
                </div>

                <div className="pricing-box">
                    <div className="pricing-box-head"><h4> One and only price</h4></div>
                    <div className="pricing-box-pricing"><h4> $ 30 </h4></div>
                    <div className="pricing-box-cta"><a href="/login"><button className='pricing-cta-btn'>Get started</button></a></div>
                    <div className="pricing-box-advantage">
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Get a real-time, comprehensive overview of your business performance with our customizable dashboard.</div>
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Never miss out on a lead again with our unlimited lead management, allowing you to easily keep track of all your prospects in one place.</div>
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Say goodbye to invoicing limitations and focus on growing your business with our unlimited, customizable invoicing system</div>
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Win more business with ease using our unlimited, professional-looking quotes and estimates that can be quickly converted into invoices.</div>
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Unlimited projects and tasks management: Stay organized and focused on your goals with our unlimited task and project management capabilities.</div>
                        <div className="pricing-boxes-advantages">
                            <div className="pricing-boxes-advantages-tick"><img src="./img/icons8-checkmark-512.svg" alt="" /></div>Find your next freelance opportunity easily with our job board, where you can discover a wide range of job openings across different industries and see what's available in the market.</div>
                    </div>

                </div>
             </div>
             <NavigationsFooter />
        </div>
    );
};

export default Pricing;