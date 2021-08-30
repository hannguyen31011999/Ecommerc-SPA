// Admin
import DashboardComponent from "../layouts/Admin/Dashboard/DashboardComponent";
import CategoriesComponent from '../layouts/Admin/Categories/CategoriesComponent';
import UserComponent from '../layouts/Admin/User/UserComponent';
import OrderComponent from '../layouts/Admin/Order/OrderComponent';
import OrderDetailComponent from '../layouts/Admin/OrderDetails/OrderDetailComponent';
import AnalyticsComponent from '../layouts/Admin/Analytics/AnalyticsComponent';
import DiscountComponent from '../layouts/Admin/Discount/DiscountComponent';
import PostComponent from '../layouts/Admin/Post/PostComponent';
import ReviewComponent from '../layouts/Admin/Review/ReviewComponent';
import LoginAdminComponent from "../layouts/Admin/Login/LoginAdminComponent";

const routes = [
    // Admin
    {
        path: '/admin/dashboard',
        component: DashboardComponent,
        exact: true
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
    },
    {
        path: '/admin/post',
        component: PostComponent,
    },
    {
        path: '/admin/user',
        component: UserComponent,
    },
    {
        path: '/admin/review',
        component: ReviewComponent,
    },
    {
        path: '/admin/order',
        component: OrderComponent,
        exact: true
    },
    {
        path: '/admin/order/detail',
        component: OrderDetailComponent,
    },
    {
        path: '/admin/analytics',
        component: AnalyticsComponent,
    },
    {
        path: '/admin/discount',
        component: DiscountComponent,
    },
    {
        path: '/admin',
        component: LoginAdminComponent,
        exact: true
    },
];

export default routes;