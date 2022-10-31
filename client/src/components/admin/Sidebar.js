import React from 'react'
import '../../css/sidebar.css'
import { Link } from 'react-router-dom'


const Sidebar = () => {

    return (
        <>
            <div className="col-md-2 col-sm-1 display-table-cell v-align box" id="navigation">
                <div className="logo">
                </div>
                <div className="navi">
                    <ul>
                        <li><Link to="/admin/dashboard"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Transaction Books</span></Link></li>
                        <li><Link to="/admin/create"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Add Books</span></Link></li>
                        <li><Link to="/admin/books"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">All Books</span></Link></li>
                        <li><Link to="/admin/req"><i className="fa fa-plus" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Books Requests</span></Link></li>
                        <li><Link to="/admin/ret"><i className="fa fa-plus" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Return Requests</span></Link></li>
                    </ul>
                </div>
            </div>


        </>
    )
}

export default Sidebar