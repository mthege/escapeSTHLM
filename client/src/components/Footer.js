import React from 'react';
import logo from '../images/icons8-detective-64.png';

import ('./Footer.css')

/**
 * 
 * @returns a component with only JSX
 */

export function Footer(){

    return(

        <footer className="section bg-footer ">
        <div className="container ">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3">
                    <div className="">
                        <h6 className="footer-heading text-uppercase text-white">Information</h6>
                        <ul className="list-unstyled footer-link mt-4">
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Partners</a></li>
                            <li><a href="/">Find us</a></li>
                            <li><a href="/">Pricing</a></li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="">
                        <h6 className="footer-heading text-uppercase text-white">Contact Us</h6>
                        <p className="contact-info mt-4">Contact us if need help withanything</p>
                        <p className="contact-info">08 123-456-7890</p>
                        
                    </div>
                    <img src={logo} alt="logo" />
                </div>

            </div>
        </div>

        <div className="text-center mt-5">
            <p className="footer-alt mb-0 f-14">2022 © escapeSTHLM - All Rights Reserved</p>
        </div>
    </footer>


        

    )
}

export default Footer;