import React from 'react'
import ScrollToTop from '../../components/Client/Buttons/ScrollToTop';
import withLayout from '../../hoc/withLayouts';
import MainHeader from './Header/MainHeader';
import MainFooter from './Footer/MainFooter';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';

function ClientTemplate(props) {
    return (
        <>
            <ToastContainer />
            <MainHeader />
            {props.children}
            <MainFooter />
            <LoadingComponent />
            <ScrollToTop />
        </>
    )
}

export default withLayout(ClientTemplate);