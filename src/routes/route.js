// Admin
import DashboardComponent from "../layouts/Admin/Dashboard/DashboardComponent";
import CategoriesComponent from '../layouts/Admin/Categories/CategoriesComponent';
import UserComponent from '../layouts/Admin/User/UserComponent';
import ProductComponent from '../layouts/Admin/Product/ProductComponent';
import ProductVariant from '../layouts/Admin/ProductVariant/ProductVariant';
import OrderComponent from '../layouts/Admin/Order/OrderComponent';
import OrderDetailComponent from '../layouts/Admin/OrderDetails/OrderDetailComponent';
import AnalyticsComponent from '../layouts/Admin/Analytics/AnalyticsComponent';
import DiscountComponent from '../layouts/Admin/Discount/DiscountComponent';
import PostComponent from '../layouts/Admin/Post/PostComponent';
import ReviewComponent from '../layouts/Admin/Review/ReviewComponent';
import InventoryManagement from '../layouts/Admin/Inventory/InventoryManagement';
// Client
import HomeComponent from '../layouts/Client/Home/HomeComponent';

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: DashboardComponent,
        exact: true
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
        exact: true
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
        exact: true
    },
    {
        path: '/admin/product',
        component: ProductComponent,
        exact: true
    },
    {
        path: '/admin/product/variant/:id/sku',
        component: ProductVariant,
        exact: true
    },
    {
        path: '/admin/inventory',
        component: InventoryManagement,
        exact: true
    },
    {
        path: '/admin/post',
        component: PostComponent,
        exact: true
    },
    {
        path: '/admin/user',
        component: UserComponent,
        exact: true
    },
    {
        path: '/admin/review',
        component: ReviewComponent,
        exact: true
    },
    {
        path: '/admin/order',
        component: OrderComponent,
        exact: true
    },
    {
        path: '/admin/order/detail',
        component: OrderDetailComponent,
        exact: true
    },
    {
        path: '/admin/analytics',
        component: AnalyticsComponent,
        exact: true
    },
    {
        path: '/admin/discount',
        component: DiscountComponent,
        exact: true
    }
];

export const clientRoutes = [
    {
        path: '/',
        component: HomeComponent,
        exact: true
    },
]