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


const drawerWidth = "60px"

// function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
// }

const SBOLInsightPage = () => {

    const [openVModal, setOpenVModal] = useState(false);
    const openValidationModal = () => setOpenVModal(true);
    const closeValidationModal = () => setOpenVModal(false);

    const [testData, setTestData] = useState('');
    const [showGraph, setShowGraph] = useState(false);
    const openGraph = () => setShowGraph(true);
    const closeGraph = () => setShowGraph(false);


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

    const graphData2 = {
        elements: {
            nodes: [
                {
                    id: "n1",
                    name: "col1",
                    uri: "https://sbolstandard.org/examples/col1"
                },
                {
                    id: "n2",
                    name: "TetR_protein",
                    uri: "https://sbolstandard.org/examples/TetR_protein"
                },
                {
                    id: "n3",
                    name: "LacI_protein",
                    uri: "https://sbolstandard.org/examples/LacI_protein"
                },
            ],
            edges: [
                {
                    id: "e1",
                    label: "member",
                    source: "n1",
                    target: "n2"
                },
                {
                    id: "e2",
                    label: "member",
                    source: "n1",
                    target: "n3"
                },
                {
                    id: "e3",
                    label: "hasNamespace",
                    source: "n1",
                    target: "n4"
                },
            ]
        }
    }

    const graphData = {
        "elements": {
            "nodes": [
                {
                    id: "n1",
                    name: "col1",
                    uri: "https://sbolstandard.org/examples/col1"
                },
                {
                    "id": "n2",
                    "name": "TetR_protein",
                    "uri": "https://sbolstandard.org/examples/TetR_protein"
                },
                {
                    "id": "n3",
                    "name": "LacI_protein",
                    "uri": "https://sbolstandard.org/examples/LacI_protein"
                },
                {
                    "id": "n4",
                    "name": "examples",
                    "uri": "https://sbolstandard.org/examples"
                },
                {
                    "id": "n5",
                    "name": "Collection",
                    "uri": "http://sbols.org/v3#Collection"
                },
                {
                    "id": "n6",
                    "name": "https://identifiers.org/SBO:0000252",
                    "uri": "https://identifiers.org/SBO:0000252"
                },
                {
                    "id": "n7",
                    "name": "GO:0003700",
                    "uri": "GO:0003700"
                },
                {
                    "id": "n8",
                    "name": "LacI",
                    "uri": "LacI"
                },
                {
                    "id": "n9",
                    "name": "LacI protein",
                    "uri": "LacI protein"
                },
                {
                    "id": "n10",
                    "name": "Component",
                    "uri": "http://sbols.org/v3#Component"
                },
                {
                    "id": "n11",
                    "name": "https://identifiers.org/GO:0003700",
                    "uri": "https://identifiers.org/GO:0003700"
                },
                {
                    "id": "n12",
                    "name": "TetR",
                    "uri": "TetR"
                },
                {
                    "id": "n13",
                    "name": "TetR protein",
                    "uri": "TetR protein"
                }
            ],
            "edges": [
                {
                    "id": "e1",
                    "label": "member",
                    "source": "n1",
                    "target": "n2"
                },
                {
                    "id": "e2",
                    "label": "member",
                    "source": "n1",
                    "target": "n3"
                },
                {
                    "id": "e3",
                    "label": "hasNamespace",
                    "source": "n1",
                    "target": "n4"
                },
                {
                    "id": "e4",
                    "label": "displayId",
                    "source": "n1",
                    "target": "n1"
                },
                {
                    "id": "e5",
                    "label": "type",
                    "source": "n1",
                    "target": "n5"
                },
                {
                    "id": "e6",
                    "label": "type",
                    "source": "n3",
                    "target": "n6"
                },
                {
                    "id": "e7",
                    "label": "role",
                    "source": "n3",
                    "target": "n7"
                },
                {
                    "id": "e8",
                    "label": "name",
                    "source": "n3",
                    "target": "n8"
                },
                {
                    "id": "e9",
                    "label": "hasNamespace",
                    "source": "n3",
                    "target": "n4"
                },
                {
                    "id": "e10",
                    "label": "displayId",
                    "source": "n3",
                    "target": "n3"
                },
                {
                    "id": "e11",
                    "label": "description",
                    "source": "n3",
                    "target": "n9"
                },
                {
                    "id": "e12",
                    "label": "type",
                    "source": "n3",
                    "target": "n10"
                },
                {
                    "id": "e13",
                    "label": "type",
                    "source": "n2",
                    "target": "n6"
                },
                {
                    "id": "e14",
                    "label": "role",
                    "source": "n2",
                    "target": "n11"
                },
                {
                    "id": "e15",
                    "label": "name",
                    "source": "n2",
                    "target": "n12"
                },
                {
                    "id": "e16",
                    "label": "hasNamespace",
                    "source": "n2",
                    "target": "n4"
                },
                {
                    "id": "e17",
                    "label": "displayId",
                    "source": "n2",
                    "target": "n2"
                },
                {
                    "id": "e18",
                    "label": "description",
                    "source": "n2",
                    "target": "n13"
                },
                {
                    "id": "e19",
                    "label": "type",
                    "source": "n2",
                    "target": "n10"
                }
            ]
        },
        "status": "success"
    }


    const elements = [
        {
            data: {
                id: 'one',
                label: 'Node 1'
            },
        },
        {
            data: {
                id: 'two',
                label: 'Node 2'
            },
        },
        {
            data: {
                source: 'one',
                target: 'two',
                label: 'Edge from Node1 to Node2'
            }
        }
    ];

    const elements2 = {
        nodes: [
            { "data": { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } }
        ],
        edges: [
            {
                "data": { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
            }
        ]
    };

    const message = "Could not validate the SBOL document:\r\nsbol3-11804 - If the hasParticipation properties of an Interaction refer to one or more Participation objects, and one of the type properties of this Interaction comes from Table 11, then the Participation objects SHOULD have a role from the set of role properties that is cross listed with this type in Table 12.,\r\n\tValue: [https://identifiers.org/SBO:0000019],\r\n\tProperty: components[5].interactions[0].hasParticipation[https://sbolstandard.org/examples/TetR_producer/Interaction2/Participation2].role,\r\n\tEntity URI: https://sbolstandard.org/examples/TetR_producer/Interaction2,\r\n\tEntity Type: class org.sbolstandard.core3.entity.Interaction\r\n\r\nsbol3-11902 - The Feature referenced by the participant property of a Participation MUST be contained by the Component that contains the Interaction that contains the Participation.,\r\n\tChild Entity URI: https://sbolstandard.org/examples/TetR_producer/SubComponent9,\r\n\tChild Entity Type: class org.sbolstandard.core3.entity.SubComponent,\r\n\tProperty: components[16].hasInteraction[https://sbolstandard.org/examples/LacI_producer/Interaction4].hasParticipation[https://sbolstandard.org/examples/LacI_producer/Interaction4/Participation3].participant,\r\n\tEntity URI: https://sbolstandard.org/examples/LacI_producer,\r\n\tEntity Type: class org.sbolstandard.core3.entity.Component\r\n\r\nsbol3-11804 - If the hasParticipation properties of an Interaction refer to one or more Participation objects, and one of the type properties of this Interaction comes from Table 11, then the Participation objects SHOULD have a role from the set of role properties that is cross listed with this type in Table 12.,\r\n\tValue: [https://identifiers.org/SBO:0000019],\r\n\tProperty: components[16].interactions[0].hasParticipation[https://sbolstandard.org/examples/LacI_producer/Interaction3/Participation2].role,\r\n\tEntity URI: https://sbolstandard.org/examples/LacI_producer/Interaction3,\r\n\tEntity Type: class org.sbolstandard.core3.entity.Interaction"


    const testAPI = async () => {
        try {
            let response = await fetch("http://localhost:8080/api/test")
            if (response.status === 200) {
                let data = await response.json()
                setTestData(data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    // useEffect(() => { testAPI() }, [])

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
            let response = await axios.post(url, formData, config)
            console.log(response)
        } catch (error) {
            console.error('Error:', error)
        }
    }


    function showValiationModal() {
        openVModal ? closeValidationModal() : openValidationModal()
    }

    function showGraphModal() {
        showGraph ? closeGraph() : openGraph()
    }

    function submitFile(event) {
        event.preventDefault()
        closeUploadFileModal()
        getGraphData()
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
                    // onClick={openUploadFileModal}
                    onClick={showGraphModal}
                >
                    <UploadFileIcon />
                </IconButton>

                <IconButton
                    onClick={showValiationModal}
                >
                    <RuleOutlinedIcon />
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

                {/* {testData ?
                    <Box>
                        <p> {testData.status}</p>
                        <p> {testData.app}</p>
                        <p> {testData.message}</p>
                    </Box>
                    : <Box>
                        No data
                    </Box>
                } */}

                {showGraph
                    ? <CytoscapeComponent

                        // elements={
                        //     CytoscapeComponent.normalizeElements({
                        //         nodes: graphData2.elements.nodes,
                        //         edges: graphData2.elements.edges,
                        //     })
                        // }

                        //elements={elements}
                        elements={CytoscapeComponent.normalizeElements({
                            nodes: elements2.nodes,
                            edges: elements2.edges
                        })}
                        stylesheet={[
                            {
                                selector: 'node',
                                style: {
                                    label: 'data(label)',
                                    width: "10px",
                                    height: "10px",
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    label: 'data(label)',
                                    width: 3,

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
                    : null
                }


                {/* Validation results view */}
                {openVModal ?
                    <Box id="validationModal"
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
                                    Validation Report : test.rdf
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

                            {/* <Typography id="message"
                                sx={{
                                    whiteSpace: "pre-line"
                                }}
                            >
                                {message}
                            </Typography> */}

                            <Box
                                sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                }}>
                                <div className="validationText">
                                    {message}
                                </div>
                            </Box>
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

