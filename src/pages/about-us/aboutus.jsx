import React from "react";
import { Helmet } from "react-helmet";
import About from "src/section/aboutus/about-us";


export const AboutPage = () => {

    return (
        <>
            <Helmet>
                <title>About : Harvest Master</title>
            </Helmet>
            <About />
        </>
    );
};