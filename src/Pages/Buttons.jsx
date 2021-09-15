import React from 'react'
import { useAppContext } from '../util/context'
const Buttons = () => {
    const {loading, page, nbPages, handlePage} = useAppContext();
    return (
        <div className="btn-container">
            <button disabled = {loading} className="btn" onClick = {() => handlePage("dec")}>
                prev
            </button>
            <p>{page + 1} of {nbPages}</p>
            <button disabled = {loading}className="btn" onClick = {() => handlePage("inc")}>
                next
            </button>
        </div>
    )
}

export default Buttons
