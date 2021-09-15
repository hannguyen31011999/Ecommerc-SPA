import * as constants from './Constants';

const initialState = {
    loading: false,
    categories: {},
    product: {},
    option: {},
    product_sku: [],
    review: {
        data: [],
        pagination: {
        }
    },
    inventory: {},
    discount: {},
    variants: [],
    slug: [],
    image: {

    }
}

const ProductDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading:
            return { ...state, loading: payload }
        case constants.fetchSuccess: {
            const { categories, product, option, product_sku, review, inventory, discount, variants, slug } = payload;
            return { ...state, categories, product, option, product_sku, review, inventory, discount, variants, slug, image: product_sku[0], loading: false };
        }
        case constants.fetchFail:
            return { ...state, loading: payload }
        case constants.changeImage: {
            return { ...state, image: payload };
        }
        default:
            return state
    }
}

export default ProductDetailReducer;
