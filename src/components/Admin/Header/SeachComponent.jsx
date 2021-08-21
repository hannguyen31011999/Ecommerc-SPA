import React from 'react'

export default function SeachComponent() {
    return (
        <div>
            <form action="*">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Seach" />
                    <button className="btn btn-outline-primary" type="button"><i className="fa fa-search" /></button>
                </div>
            </form>
        </div>
    )
}
