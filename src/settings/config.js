import { ToastContainer, toast } from 'react-toastify';

export const STATUS_SUCCESS = 200;
export const STATUS_VALIDATE = 422;
export const STATUS_AUTH = 401;
export const STATUS_FAIL = 500;

export const alertErrors = (mess, time = null) => {
    return toast.error(mess, {
        position: "top-right",
        autoClose: time ? time : 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const alertSuccess = (mess) => {
    return toast.success(mess, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}