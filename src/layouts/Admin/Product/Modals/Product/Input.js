import {
    Form,
    Input,
    Select,
    Upload
} from 'antd';
import React from 'react';
import { init } from '../../../../../utils/getImage';
import { Editor } from '@tinymce/tinymce-react';
const { Option } = Select;
const { TextArea } = Input;
let styled = {
    marginBottom: "12px",
}

export const steps = [
    {
        title: 'Product',
        content: (categories, discount) => {
            return (
                <>
                    <Form.Item
                        name="categories_id"
                        label="Categories"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Categories is empty!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select categories"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categories?.map(cate => {
                                return (
                                    <Option value={cate.id} key={cate.id}>{cate.categories_name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="discount_id"
                        label="Discount"
                        style={styled}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select gender"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {discount?.map(dis => {
                                return (
                                    <Option value={dis.id} key={dis.id}>{dis.discount_name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="product_name"
                        label="Product name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Product name is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example Iphone 8" />
                    </Form.Item>
                </>
            )
        }
    },
    {
        title: 'Option',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="screen"
                        label="Screen"
                        style={styled}>
                        <Input placeholder="Example IPS LCD6.1 'Liquid Retina' " />
                    </Form.Item>
                    <Form.Item
                        name="screen_resolution"
                        label="Screen resolution"
                        style={styled}>
                        <Input placeholder="Example 828 x 1792 Pixels" />
                    </Form.Item>
                    <Form.Item
                        name="operating_system"
                        label="Operating System"
                        style={styled}>
                        <Input placeholder="Example iOS 14" />
                    </Form.Item>
                    <Form.Item
                        name="cpu"
                        label="Cpu"
                        style={styled}>
                        <Input placeholder="Example Apple A13 Bionic" />
                    </Form.Item>
                    <Form.Item
                        name="gpu"
                        label="Gpu"
                        style={styled}>
                        <Input placeholder="Example Apple GPU 4 nhân" />
                    </Form.Item>
                    <Form.Item
                        name="ram"
                        label="Ram"
                        style={styled}>
                        <Input type="number" placeholder="Example 4gb" />
                    </Form.Item>
                    <Form.Item
                        name="camera"
                        label="Camera"
                        style={styled}>
                        <Input placeholder="Example 2 camera 12 MP" />
                    </Form.Item>
                    <Form.Item
                        name="pin"
                        label="Pin"
                        style={styled}>
                        <Input placeholder="Example 3110 mAh" />
                    </Form.Item>
                </>
            )
        }
    },
    {
        title: 'Variant',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="product_variant_name"
                        label="Variant name"
                        style={styled}
                        rules={[
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}
                    >
                        <Input placeholder="Example Iphone 8 plus 64gb" />
                    </Form.Item>
                    <Form.Item
                        name="product_variant_rom"
                        label="Rom"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Rom is empty!"
                            },
                            {
                                max: 4,
                                message: "Maximum 4 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 128GB" />
                    </Form.Item>
                </>
            )
        }
    },
    {
        title: 'Sku',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="sku_unit_price"
                        label="Price unit"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Price unit is empty!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 8.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="sku_promotion_price"
                        label="Price promotion"
                        style={styled}
                        rules={[
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 6.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="sku_qty"
                        label="Quantity"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Quantity is empty!"
                            },
                            {
                                max: 4,
                                message: "Maximum 4 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 17" />
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Color sku"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Color sku is empty!"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character!"
                            }
                        ]}
                    >
                        <Input placeholder="Example color red" />
                    </Form.Item>
                </>
            )
        }
    }
];

export const editSteps = [
    {
        title: 'Product',
        content: (categories, discount) => {
            return (
                <>
                    <Form.Item
                        name="categories_id"
                        label="Categories"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Categories is empty!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select categories"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categories?.map(cate => {
                                return (
                                    <Option value={cate.id} key={cate.id}>{cate.categories_name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="discount_id"
                        label="Discount"
                        style={styled}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select gender"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {discount?.map(dis => {
                                return (
                                    <Option value={dis.id} key={dis.id}>{dis.discount_name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="product_name"
                        label="Product name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Product name is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example Iphone 8" />
                    </Form.Item>
                </>
            )
        }
    },
    {
        title: 'Option',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="screen"
                        label="Screen"
                        style={styled}>
                        <Input placeholder="Example IPS LCD6.1 'Liquid Retina' " />
                    </Form.Item>
                    <Form.Item
                        name="screen_resolution"
                        label="Screen resolution"
                        style={styled}>
                        <Input placeholder="Example 828 x 1792 Pixels" />
                    </Form.Item>
                    <Form.Item
                        name="operating_system"
                        label="Operating System"
                        style={styled}>
                        <Input placeholder="Example iOS 14" />
                    </Form.Item>
                    <Form.Item
                        name="cpu"
                        label="Cpu"
                        style={styled}>
                        <Input placeholder="Example Apple A13 Bionic" />
                    </Form.Item>
                    <Form.Item
                        name="gpu"
                        label="Gpu"
                        style={styled}>
                        <Input placeholder="Example Apple GPU 4 nhân" />
                    </Form.Item>
                    <Form.Item
                        name="ram"
                        label="Ram"
                        style={styled}>
                        <Input type="number" placeholder="Example 4gb" />
                    </Form.Item>
                    <Form.Item
                        name="camera"
                        label="Camera"
                        style={styled}>
                        <Input placeholder="Example 2 camera 12 MP" />
                    </Form.Item>
                    <Form.Item
                        name="pin"
                        label="Pin"
                        style={styled}>
                        <Input placeholder="Example 3110 mAh" />
                    </Form.Item>
                </>
            )
        }
    },
]

export const createVariant = [
    {
        title: 'Variant',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="product_variant_name"
                        label="Variant name"
                        style={styled}
                        rules={[
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}
                    >
                        <Input placeholder="Example Iphone 8 plus 64gb" />
                    </Form.Item>
                    <Form.Item
                        name="product_variant_rom"
                        label="Rom"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Rom is empty!"
                            },
                            {
                                max: 4,
                                message: "Maximum 4 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 128GB" />
                    </Form.Item>
                </>
            )
        }
    },
    {
        title: 'Sku',
        content: () => {
            return (
                <>
                    <Form.Item
                        name="sku_unit_price"
                        label="Price unit"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Price unit is empty!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 8.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="sku_promotion_price"
                        label="Price promotion"
                        style={styled}
                        rules={[
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 6.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="sku_qty"
                        label="Quantity"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Quantity is empty!"
                            },
                            {
                                max: 4,
                                message: "Maximum 4 number!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 17" />
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Color sku"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Color sku is empty!"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character!"
                            }
                        ]}
                    >
                        <Input placeholder="Example color red" />
                    </Form.Item>
                </>
            )
        }
    }
];