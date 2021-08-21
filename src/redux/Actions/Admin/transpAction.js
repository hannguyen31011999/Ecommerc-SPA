import * as transport from '../../Contants/Admin/TransportContants';

export const listAction = (data, pagination) => ({
    type: transport.listContant,
    payload: {
        data,
        pagination
    }
});