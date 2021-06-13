import React from 'react';

export const UpdateForm = ({ onSubmit }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}