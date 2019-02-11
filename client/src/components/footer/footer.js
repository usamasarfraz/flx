import React, { Component } from "react";
import './footer.css';
class Footer extends Component{
    render(){
        return (
            <div>
                <div className="footer_copyrights_div">
                    &copy; CopyRights {new Date().getFullYear()} Flx.
                </div>
            </div>
        )
    }
}
export default Footer;