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
        name: 'Product',
        url: '/admin/product',
        icon: renderIcon(<i className="fab fa-product-hunt" />)
    },
    {
        name: 'User',
        url: '/admin/user',
        icon: renderIcon(<i class="fa fa-user" />)
    },
    {
        name: 'Order',
        url: '/admin/order',
        icon: renderIcon(<i className="fa fa-shopping-cart" />)
    },
    {
        name: 'Transport',
        icon: renderIcon(<i className="fa fa-truck" />),
        children: [
            {
                name: 'Province',
                url: '/admin/province'
            },
            {
                name: 'District',
                url: '/admin/ditrict'
            },
            {
                name: 'Shipping Price',
                url: '/admin/transport'
            }
        ]
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