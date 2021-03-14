import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Header from '../Header/Header'
import { useAuth } from '../../Contexts/Auth'
import { database, storage } from "../../firebase"
import Dropzone from 'react-dropzone'
import File from './File'
import './Drive.css'
import uploadIcon from './../../Assets/Images/upload.png'
import dragUploadIcon from './../../Assets/Images/dragUpload.png'

export default function Drive() {
    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState("");
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [filesLoaded, setFilesLoaded] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [userFiles, setUserFiles] = useState([]);

    function openUploadModal() {
        setUploadModal(true);
      }
    
    function closeUploadModal() {
        setUploadModal(false);
    }

    function openConfirmModal() {
        setConfirmModal(true);
      }
    
    function closeConfirmModal() {
        setConfirmModal(false);
        setUploadFiles([]);
    }

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

    function confirmUpload(files) {
        setUploadFiles(files);
        closeUploadModal();
        openConfirmModal();
    }

    function handleUploadFiles() {
        uploadFiles.forEach(file => {
            const filePath = '/files/' + currentUser.uid + '/' + file.name;
            const uploadTask = storage.ref(filePath).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            () => {},
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files.add({
                        url: url,
                        name: file.name,
                        userId: currentUser.uid,
                    });
                });
                setFilesLoaded(false);
            });
        });
        closeConfirmModal();
    }

    function getUserFiles() {
        if (filesLoaded)
            return;
        return database.files
            .where("userId", "==", currentUser.uid)
            .get()
            .then(snapshot => {
                const docs = snapshot.docs.map(doc => doc.data());
                setUserFiles(docs);
                setFilesLoaded(true);
            });
    }

    getUserDocument();
    getUserFiles();
    
    let elements = undefined;
    if (filesLoaded) {
        elements = userFiles.map((file) =>
            <File
                name={file.name}
                url={file.url}
                userId={file.userId}
            />
        );
    }

    return (
        <div className="app">
            <Header name={userInfo.name} />
            <button className="upload-btn" onClick={openUploadModal}>
                <img src={uploadIcon} className="upload-img" alt="upload"/>
                <span>New</span>
            </button>

            <div className="filesList">
                <div className="list-top">
                    <span>Name</span>
                </div>
                {elements}
            </div>

            <Modal show={uploadModal} onHide={closeUploadModal} size="lg">
                <Dropzone className="dropzone" onDrop={acceptedFiles => confirmUpload(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div className="drag-div" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img className="dragIcon" src={dragUploadIcon} alt="drag" />
                            <p className="drag-p" >Drag and drop Files here to Upload</p>
                            <p className="drag-p" >or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
            </Modal>
            
            <Modal show={confirmModal} onHide={closeConfirmModal}>
                <p className="drag-p">Would you like to upload {uploadFiles.length} files?</p>
                <Button onClick={handleUploadFiles}>Confirm</Button>
            </Modal>
        </div>
    )
}
