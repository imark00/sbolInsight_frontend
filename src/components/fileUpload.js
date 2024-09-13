import React from "react";
import { Box, Button, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Modal } from "@mui/material";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ open, onClose, onSubmit }) => {

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

    const handleFileSubmit = (event) => {
        event.preventDefault();
        if (files.length > 0) {
            onSubmit(acceptedFiles);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                        onClick={onClose}
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
                        onClick={handleFileSubmit}
                    >
                        Submit
                    </Button>
                </Box>



            </Box>
        </Modal>
    );
}

export default FileUpload;