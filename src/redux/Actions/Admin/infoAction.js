import { infoContants } from "../../Contants/Admin/InfoContants";

export const infoAction = (user) => ({
    type: infoContants,
    payload: user
});