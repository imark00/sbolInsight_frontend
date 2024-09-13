import React, { useState } from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import axios from "axios";
import './App.css';
import CytoscapeComponent from 'react-cytoscapejs';
import { quantum } from 'ldrs'
import FileUpload from './components/fileUpload';
import ValidationMessages from './components/validation';


const drawerWidth = "60px"

quantum.register()

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

const SBOLInsightPage = () => {

    const [openVModal, setOpenVModal] = useState(false);
    const openValidationModal = () => setOpenVModal(true);
    const closeValidationModal = () => setOpenVModal(false);

    const [openUploadModal, setOpenUploadModal] = useState(false);


    //const [open, setOpen] = useState(false);
    const openUploadFileModal = () => setOpenUploadModal(true);
    const closeUploadFileModal = () => setOpenUploadModal(false);

    // const [uploadProgress, setUploadProgress] = useState(0);

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


    function showValiationModal() {
        openVModal ? closeValidationModal() : openValidationModal()
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
            {/* Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        padding: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <IconButton
                    onClick={openUploadFileModal}
                >
                    <UploadFileIcon sx={{
                        color: "black"
                    }} />
                </IconButton>

                <IconButton
                    onClick={showValiationModal}
                >
                    <RuleOutlinedIcon
                        sx={{
                            color: "black"
                        }} />
                </IconButton>
            </Drawer>

            <Box
                sx={{
                    position: 'relative',
                    width: "100vw", height: "100vh",
                    backgroundColor: 'white',
                }}
            >
                {graphElements
                    ? <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements({
                            nodes: graphElements.nodes,
                            edges: graphElements.edges
                        })}
                        stylesheet={[
                            {
                                selector: 'node',
                                style: {
                                    label: 'data(name)',
                                    width: "30px",
                                    height: "30px",
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    label: 'data(label)',
                                    width: 2,

                                }
                            }
                        ]}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        layout={{
                            name: 'grid',
                            fit: true
                        }}
                    />
                    : <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        {graphError
                            ? <Typography>
                                Could not generate the graph
                            </Typography>
                            : loading
                                ? <Box>
                                    <l-quantum
                                        size="220"
                                        speed="2.2"
                                        color="#36A108"
                                    />
                                </Box>
                                : <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "70px",
                                            letterSpacing: "0.04em",
                                            fontWeight: "bold",
                                            fontStyle: "oblique"
                                        }}
                                    >
                                        Welcome to SBOLInsight
                                    </Typography>
                                </Box>
                        }
                    </Box>
                }


                {/* Validation results view */}
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

