import React from 'react'

export default function ProductInfo() {
    return (
        <>
            <div className="product__middle">
                <div className="row">
                    <div className="product__middle--left col-lg-6">
                        <div className="product__middle--detail">
                            <h4>Details</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                        </div>
                        <div className="product__middle--feature">
                            <h4>Features</h4>
                            <ul>
                                <li>Capture 4K30 Video and 12MP Photos</li>
                                <li>Game-Style Controller with Touchscreen</li>
                                <li>View Live Camera Feed</li>
                                <li>Full Control of HERO6 Black</li>
                                <li>Use App for Dedicated Camera Operation</li>
                            </ul>
                        </div>
                    </div>
                    <div className="product__middle--right col-lg-6">
                        <div className="product__specification">
                            <h4>Specifications</h4>
                            <ul>
                                <li>Weight: <span>35.5oz (1006g)</span></li>
                                <li>Maximum <span>Speed: 35 mph (15 m/s)</span></li>
                                <li>Maximum Distance: <span>Up to 9,840ft (3,000m)</span></li>
                                <li>Operating Frequency: <span>2.4GHz</span></li>
                                <li>Manufacturer: <span>GoPro, USA</span></li>
                            </ul>
                        </div>
                        <div className="product__shipping">
                            <h4>Shipping Option</h4>
                            <ul>
                                <li>Courier: <span>2 - 4 days, $22.50</span></li>
                                <li>Local Shipping: <span>up to one week, $10.00</span></li>
                                <li>UPS Ground Shipping: <span>4 - 6 days, $18.00</span></li>
                                <li>Unishop Global Export: <span>3 - 4 days, $25.00</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
