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
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
    },
    {
        path: '/admin/product',
        component: ProductComponent,
    },
    {
        path: '/admin/product/variant/:id/sku',
        component: ProductVariant,
    },
    {
        path: '/admin/inventory',
        component: InventoryManagement,
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
    }
];

export const clientRoutes = [
    {
        path: '/',
        component: HomeComponent,
        exact: true
    },
]