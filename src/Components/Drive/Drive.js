import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Header from '../Header/Header'
import { useAuth } from '../../Contexts/Auth'
import { database, storage } from "../../firebase"
import Dropzone from 'react-dropzone'

export default function Drive() {
    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState("");
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);

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
        });
        closeConfirmModal();
    }

    getUserDocument();
    return (
        <div>
            <Header name={userInfo.name} />
            <Button onClick={openUploadModal}>Upload</Button>

            <Modal show={uploadModal} onHide={closeUploadModal}>
                <Dropzone onDrop={acceptedFiles => confirmUpload(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
            </Modal>
            
            <Modal show={confirmModal} onHide={closeConfirmModal}>
                <p>Would you like to upload {uploadFiles.length} files?</p>
                <Button onClick={handleUploadFiles}>Confirm</Button>
            </Modal>
        </div>
    )
}
