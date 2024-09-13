import React, { useState } from "react";
import { Drawer, Box, IconButton, Typography, Modal, Button, Divider } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import { useDropzone } from 'react-dropzone'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';


const drawerWidth = 60

// function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
// }

const SBOLInsightPage = () => {
    const [testData, setTestData] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const closeUploadFileModal = () => setOpen(false);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, accept: {
            'application/rdf+xml': ['.rdf'],
            'text/turtle': ['.ttl'],
        }
    });
    const files = acceptedFiles.map(file => (
        <ListItem
            disablePadding="true"
            key={file.path}
        >
            <ListItemIcon>
                <InsertDriveFileOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={file.path} />
        </ListItem>
    ));


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

    function uploadFile() {
        console.log("Upload file")
        // testAPI()
        handleOpen()
    }

    function showValiationReport() {
        console.log("Show validation report")
    }

    function submitFile() {

    }


    return (
        <Box
            sx={{ display: 'flex' }}
        >
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
                    onClick={uploadFile}
                >
                    <UploadFileIcon />
                </IconButton>

                <IconButton
                    onClick={showValiationReport}
                >
                    <RuleOutlinedIcon />
                </IconButton>
            </Drawer>

            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    background: 'white',
                    padding: '30px',
                }}
            >
                {testData ?
                    <Box>
                        <p> {testData.status}</p>
                        <p> {testData.app}</p>
                        <p> {testData.message}</p>
                    </Box>
                    : <Box>
                        No data
                    </Box>
                }
                <Modal
                    open={open}
                    onClose={closeUploadFileModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                        backdrop: {
                            style: {
                                backgroundColor: 'transparent', boxShadow: 'none'
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
                                disableRipple="true"
                                onClick={closeUploadFileModal}
                                sx={{ letterSpacing: "0.04em" }}
                            >
                                Close
                            </Button>
                        </Box>
                        <Divider
                            sx={{ borderBottomWidth: '2px', borderColor: "#CBD0DC" }}
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



                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Modal content
                        </Typography> */}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
