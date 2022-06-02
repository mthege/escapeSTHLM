import React from 'react';

import ('./Footer.css')

export function Footer(){

    return(

        <footer className="section bg-footer ">
        <div className="container ">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3">
                    <div className="">
                        <h6 className="footer-heading text-uppercase text-white">Information</h6>
                        <ul className="list-unstyled footer-link mt-4">
                            <li><a href="">Pages</a></li>
                            <li><a href="">Our Team</a></li>
                            <li><a href="">Feuchers</a></li>
                            <li><a href="">Pricing</a></li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="">
                        <h6 className="footer-heading text-uppercase text-white">Contact Us</h6>
                        <p className="contact-info mt-4">Contact us if need help withanything</p>
                        <p className="contact-info">+01 123-456-7890</p>
                        
                    </div>
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