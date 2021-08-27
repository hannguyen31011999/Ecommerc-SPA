const renderIcon = (icon) => {
    return (
        icon
    )
}

const categories = [
    {
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: renderIcon(<i className="fa fa-qrcode" />)
    },
    {
        name: 'Categories',
        url: '/admin/categories',
        icon: renderIcon(<i className="fa fa-list" />)
    },
    {
        name: 'Post',
        url: '/admin/post',
        icon: renderIcon(<i className="fa fa-edit" />)
    },
    {
        name: 'Product',
        url: '/admin/product',
        icon: renderIcon(<i className="fab fa-product-hunt" />)
    },
    {
        name: 'User',
        url: '/admin/user',
        icon: renderIcon(<i className="fa fa-user" />)
    },
    {
        name: 'Order',
        url: '/admin/order',
        icon: renderIcon(<i className="fa fa-shopping-cart" />)
    },
    {
        name: 'Order Details',
        url: '/admin/order/detail',
        icon: renderIcon(<i className="fab fa-cc-apple-pay" />)
    },
    {
        name: 'Analytics',
        url: '/admin/analytics',
        icon: renderIcon(<i className="fa fa-chart-bar" />)
    },
    {
        name: 'Discount',
        url: '/admin/discount',
        icon: renderIcon(<i className="fa fa-gift" />)
    },
    {
        name: 'Setting',
        url: '/admin/setting',
        icon: renderIcon(<i className="fa fa-cog" />)
    },
]

export default categories;