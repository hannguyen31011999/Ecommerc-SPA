import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HeaderContent from './HeaderContent'
import HeaderMenu from './HeaderMenu'
import HeaderTop from './HeaderTop'
import * as trans from '../Modules/Actions';

export default function MainHeader() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(trans.fetchCategoriesAction());
    }, []);
    return (
        <header>
            <HeaderTop />
            <HeaderContent />
            <HeaderMenu />
        </header>

    )
}
