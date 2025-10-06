"use client"

import Benefits from "@/components/LandingPage/Benefits";
import Contact from "@/components/LandingPage/Contact";
import Feature from "@/components/LandingPage/Feature";
import Footer from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/HeroSection";
import Navbar from "@/components/LandingPage/Navbar";
import Success from "@/components/LandingPage/Succes";

const LandingPage=()=>{
    return(
        <>
        <Navbar/>
        <HeroSection/>
        <Feature/>
        <Benefits/>
        <Success/>
        <Contact/>
        <Footer/>
        </>
    )
}
export default LandingPage;