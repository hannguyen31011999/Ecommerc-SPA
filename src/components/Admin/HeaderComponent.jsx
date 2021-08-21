import React from 'react';
import InfoComponent from './Header/InfoComponent';
import SeachComponent from './Header/SeachComponent';

export default function HeaderComponent(props) {
    return (
        <div className="header">
            <div className="row align-items-center">
                <div className="header__left col-12 col-md-6 col-lg-4 d-none d-md-block">
                    <SeachComponent />
                </div>
                <div className="header__right col-12 col-md-6 col-lg-8">
                    <InfoComponent />
                </div>
            </div>
            <div className="form-hidden" id="form-hidden">
                <input type="text" className="form-control" placeholder="Seach" />
            </div>
        </div>
    )
}
