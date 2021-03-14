import React from 'react'

export default function File(props) {
    return (
        <a className="entry" href={props.url} target="_blank">
            <div>
                {props.name}
            </div>
        </a>
    )
}
