import * as constants from './Constants';
import { apiProductDetail } from '../../../../services/clientApi';

export const loadingAct = payload => ({
    type: constants.loading,
    payload
});

export const fetchProductAct = payload => ({
    type: constants.fetchSuccess,
    payload
});

export const fetchProductFailAct = payload => ({
    type: constants.fetchFail,
    payload
});

export const fetchProductAction = (slug) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProductDetail.getProduct(slug);
        let result = res.data.data;
        if (res.data.status_code === 200) {
            const data = {
                categories: result.categories,
                product: result.product,
                option: result.option,
                product_sku: result.product_sku,
                review: {
                    data: result.review.data,
                    total: result.review.total,
                    currentPage: result.review.current_page
                },
                inventory: result.inventory,
                discount: result.discount,
                variants: result.variants,
                slug: result.slug
            }
            dispatch(fetchProductAct(data));
        }
    } catch (e) {

    }
}