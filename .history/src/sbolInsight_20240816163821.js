import React, { useState } from "react";
import { Drawer, Box, IconButton, Typography, Modal, Button, Divider } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';


const drawerWidth = 60

// function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
// }

const SBOLInsightPage = () => {
    const [testData, setTestData] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const closeUploadFileModal = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        //border: "2px solid #000",
        boxShadow: 24,
        borderRadius: "14px",
    };

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
                    <Box sx={style}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingLeft: '5px',
                                paddingRight: '5px',
                                paddingTop: '5px',
                            }}
                        >
                            <Typography fontSize={"19px"}>
                                Upload SBOL File
                            </Typography>

                            <Button
                                variant="text"
                                size="small"
                                color="error"
                                disableRipple="true"
                                onClick={closeUploadFileModal}
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
                                paddingBottom: "22px",
                            }}>
                            <Box
                                sx={{
                                    border: "2px solid #000",
                                    borderRadius: "14px",
                                    height: "100px",
                                }}
                            >
                            </Box>
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
