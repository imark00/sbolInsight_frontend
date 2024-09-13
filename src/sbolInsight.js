import React, { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import './App.css';
import { quantum } from 'ldrs'
import FileUpload from './components/fileUpload';
import ValidationMessages from './components/validation';
import GraphView from './components/graph';
import SideMenu from './components/sideMenu';

quantum.register()

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

const SBOLInsightPage = () => {

    const [openVModal, setOpenVModal] = useState(false);
    const openValidationModal = () => setOpenVModal(true);
    const closeValidationModal = () => setOpenVModal(false);

    const [openUploadModal, setOpenUploadModal] = useState(false);

    const openUploadFileModal = () => setOpenUploadModal(true);
    const closeUploadFileModal = () => setOpenUploadModal(false);


    const [graphElements, setGraphElements] = useState(null);
    const [graphError, setGraphError] = useState(false);

    const [validationData, setValidationData] = useState(null);

    const [loading, setLoading] = useState(false);

    const getGraphData = async (file) => {
        try {
            const url = "http://localhost:8080/api/graph-data"
            const formData = new FormData();
            formData.append('file', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
                // onUploadProgress: function (progressEvent) {
                //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     setUploadProgress(percentCompleted);
                // }
            }

            setGraphElements(null)
            await timeout(5000)

            let response = await axios.post(url, formData, config)


            if (response.status === 200) {
                setGraphElements(response.data.elements)
            } else {
                setGraphError(true)
            }

        } catch (error) {
            console.error('Error:', error)
            setGraphError(true)
        }
    }

    const getValidationData = async (file) => {
        try {
            const url = "http://localhost:8080/api/validate"
            const formData = new FormData();
            formData.append('file', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }

            setValidationData(null)
            let response = await axios.post(url, formData, config)

            if (response.status === 200) {
                setValidationData(response.data)
            } else {
                console.log("Error")
                console.log(response)
            }

        } catch (error) {
            console.error('Error:', error)
        }
    }


    const handleFileUpload = async (files) => {
        const file = files[0];
        closeUploadFileModal();
        closeValidationModal();
        setLoading(true);
        await getGraphData(file);
        await getValidationData(file);
        setLoading(false);
    };


    return (
        <Box
            sx={{ display: 'flex' }}
        >
            {/* SideMenu Component */}
            <SideMenu
                onOpenUploadModal={openUploadFileModal}
                onOpenValidationModal={openValidationModal}
            />

            <Box
                sx={{
                    position: 'relative',
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: 'white',
                }}
            >
                {/* Graph View Component*/}
                <GraphView
                    graphElements={graphElements}
                    graphError={graphError}
                    loading={loading}
                />

                {/* Validation Message Component */}
                <ValidationMessages
                    open={openVModal}
                    onClose={closeValidationModal}
                    validationData={validationData}
                />
            </Box>

            {/* // Upload file modal */}
            <FileUpload
                open={openUploadModal}
                onClose={closeUploadFileModal}
                onSubmit={handleFileUpload}
            />
        </Box>
    );
}

export default SBOLInsightPage;

