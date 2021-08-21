import { infoContants } from "../../Contants/Admin/InfoContants";

const initialState = {
    user: {
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case infoContants: {
            return { ...state, user: payload }
        }
        default: {
            return state
        }
    }
}
