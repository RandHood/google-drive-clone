import React from 'react';
import './File.css';
import fileIcon from './../../Assets/Images/file.png'

export default function File(props) {
    return (
        <a href={props.url} target="_blank">
            <div className="entry-container">
                <img className="fileIcon" src={fileIcon} alt="file"/>
                <span className="entry">{props.name}</span>
            </div>
        </a>
    )
}
