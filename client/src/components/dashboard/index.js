import React from "react";
import DashboardLayout from "./dashboardLayout";


const UserDashboard = ({users}) => {

    return(
        <DashboardLayout title="Overview">
            <div className="user_nfo_panel">

                <div className="rectangle" style={{marginTop:"-30px"}}>
                    <span style={{marginTop:"8px"}}><strong>{users.data.firstname}</strong></span>
                    <span><strong>{users.data.lastname}</strong></span>
                    <span><strong>{users.data.email}</strong></span>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard;