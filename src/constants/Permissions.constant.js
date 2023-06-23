import AccountStatus from "../flow/AccountStatus/AccountStatus";

export const permissionsRoutes = [
    {
        path:'/account-status',
        component:<AccountStatus />,
        isShow: false 
    }
]