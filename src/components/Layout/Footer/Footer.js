import { Typography } from '@material-ui/core';
import React from 'react';
import './styles/Footer.css';

{/* <a style={{color: "inherit"}} href="https://www.linkedin.com/in/anas-mohsen-1903911b2/" target="_blank" rel="noreferrer">Anas Mohsen</a> */}

const Footer = () => {
    return (
        <div className="footer">
            <Typography variant="subtitle1">
                StackedUP {new Date().getFullYear()}.
            </Typography>
        </div>
    )
}

export default Footer
