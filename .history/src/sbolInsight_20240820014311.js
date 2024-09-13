import React, { useState } from "react";
import { Drawer, Box, IconButton, Typography, Modal, Button, Divider } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import { useDropzone } from 'react-dropzone'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from "axios";
import './App.css';
import CytoscapeComponent from 'react-cytoscapejs';
import { quantum } from 'ldrs'


const drawerWidth = "60px"

quantum.register()

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

const SBOLInsightPage = () => {

    const [openVModal, setOpenVModal] = useState(false);
    const openValidationModal = () => setOpenVModal(true);
    const closeValidationModal = () => setOpenVModal(false);

    // const [showGraph, setShowGraph] = useState(false);
    // const openGraph = () => setShowGraph(true);
    // const closeGraph = () => setShowGraph(false);


    const [open, setOpen] = useState(false);
    const openUploadFileModal = () => setOpen(true);
    const closeUploadFileModal = () => setOpen(false);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, accept: {
            'application/rdf+xml': ['.rdf'],
            'text/turtle': ['.ttl'],
        }
    });
    const files = acceptedFiles.map(file => (
        <ListItem
            key={file.path}
        >
            <ListItemIcon>
                <InsertDriveFileOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={file.path} />
        </ListItem>
    ));

    // const [uploadProgress, setUploadProgress] = useState(0);

    const [graphElements, setGraphElements] = useState(null);
    const [graphError, setGraphError] = useState(false);

    const [validationData, setValidationData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [validationIconColor, setValidationIconColor] = useState("black");

    const getGraphData = async () => {
        try {
            const url = "http://localhost:8080/api/graph-data"
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
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

    const getValidationData = async () => {
        try {
            const url = "http://localhost:8080/api/validate"
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
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

    // function showGraphModal() {
    //     showGraph ? closeGraph() : openGraph()
    // }

    const submitFile = async (event) => {
        event.preventDefault()
        closeUploadFileModal()
        closeValidationModal()
        setLoading(true)
        await getGraphData()
        await getValidationData()
        setLoading(false)
    }

    const validationIconStyle = {
        color: validationData
            ? validationData.status === "success"
                ? setValidationIconColor("green")
                : setValidationIconColor("d70505")
            : validationIconColor
    }


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
                // onClick={showGraphModal}
                >
                    <UploadFileIcon />
                </IconButton>

                <IconButton
                    onClick={showValiationModal}
                >
                    <RuleOutlinedIcon
                        sx={{ validationIconStyle }} />
                </IconButton>
            </Drawer>

            <Box
                sx={{
                    position: 'relative',
                    width: "100vw", height: "100vh",
                    backgroundColor: 'white',
                }}
            >
                {/* <Box
                    sx={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {showGraph
                        ? <CytoscapeComponent
                            elements={elements}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            layout={{
                                name: 'grid',
                                fit: true
                            }}
                        />
                        : null
                    }
                </Box> */}



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
                                    <Typography>
                                        Welcome to SBOL Insight
                                    </Typography>
                                </Box>
                        }
                    </Box>
                }


                {/* Validation results view */}
                {openVModal
                    ? <Box id="validationModal"
                        sx={{
                            width: "100%",
                            height: "260px",
                            backgroundColor: '#F8F8F8',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            border: '3px solid #CBD0DC',
                            boxSizing: "border-box",
                            padding: "10px 20px 20px 20px",
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                flex: 1,
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>
                                    Validation Report
                                </Typography>

                                <Button
                                    variant="text"
                                    size="small"
                                    color="error"
                                    onClick={showValiationModal}
                                    sx={{
                                        letterSpacing: "0.04em"
                                    }}
                                >
                                    Close
                                </Button>
                            </Box>

                            {validationData
                                ? <Box
                                    sx={{
                                        flex: 1,
                                        overflowY: 'auto',
                                    }}>
                                    <div className="validationText">
                                        {
                                            validationData.status === "success"
                                                ? validationData.rdf_model
                                                : validationData.error
                                        }
                                    </div>
                                </Box>
                                : <Box
                                    sx={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        textAlign: 'center',
                                    }}>
                                    <div className="validationText">
                                        Nothing to show yet
                                    </div>
                                </Box>
                            }

                        </Box>
                    </Box>
                    : null
                }
            </Box>

            {/* // Upload file modal */}
            <Modal
                open={open}
                onClose={closeUploadFileModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                slotProps={{
                    backdrop: {
                        style: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none'
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "475px",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: "23px",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: '11px',
                            paddingRight: '7px',
                            paddingTop: '7px',
                            paddingBottom: '2px',
                        }}
                    >
                        <Typography
                            fontSize={"19px"}
                            letterSpacing={"0.02em"}
                        >
                            Upload SBOL File
                        </Typography>

                        <Button
                            variant="text"
                            size="small"
                            color="error"
                            onClick={closeUploadFileModal}
                            sx={{ letterSpacing: "0.04em" }}
                        >
                            Close
                        </Button>
                    </Box>
                    <Divider
                        sx={{
                            borderBottomWidth: '2px',
                            borderColor: "#CBD0DC"
                        }}
                    />

                    <Box
                        sx={{
                            paddingTop: "45px",
                            paddingLeft: "25px",
                            paddingRight: "25px",
                            paddingBottom: "16px",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                border: "2px dashed #CBD0DC",
                                borderRadius: "14px",
                                height: "100px",
                                marginBottom: "20px",
                                width: "100%",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                            {...getRootProps({ className: 'dropzone' })}
                        >
                            <input {...getInputProps()} />
                            <Box >
                                <Typography
                                    color={"#292D32"}
                                    fontSize={"15px"}
                                    letterSpacing={"0.04em"}
                                >
                                    Choose a file or drap and drop it here
                                </Typography>

                                <Typography
                                    color={"#A9ACB4"}
                                    fontSize={"12px"}
                                    letterSpacing={"0.04em"}
                                >
                                    RDF/XML, Turtle, N-Triples, and JSON-LD formats, up to 25MB
                                </Typography>
                            </Box>
                        </Box>

                        {/* <progress value={uploadProgress} max="100"></progress> */}

                        <List>{files}</List>

                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "11px",
                                width: "168px",
                                backgroundColor: "#084BCF",
                            }}
                            disabled={files.length === 0}
                            onClick={submitFile}
                        >
                            Submit
                        </Button>
                    </Box>



                </Box>
            </Modal>
        </Box>
    );
}

export default SBOLInsightPage;

