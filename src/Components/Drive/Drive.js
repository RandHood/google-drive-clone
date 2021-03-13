import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Header/Header'
import { useAuth } from '../../Contexts/Auth'
import { database } from "../../firebase"

export default function Drive() {
    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState("");
    const [infoLoaded, setInfoLoaded] = useState(false);

    function getUserDocument() {
        if (infoLoaded)
            return;
        return database.users
            .where("userId", "==", currentUser.uid)
            .get()
            .then(snapshot => {
                const docs = snapshot.docs.map(doc => doc.data());
                setUserInfo(docs[0]);
                setInfoLoaded(true);
            });
    }

    getUserDocument();
    return (
        <div>
            <Header name={userInfo.name} />
        </div>
    )
}
