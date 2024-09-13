import React, { useState } from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import { Modal } from '@mui/base/Modal';



const drawerWidth = 60

// function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
// }

const SBOLInsightPage = () => {
    const [testData, setTestData] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
    }

    function showValiationReport() {
        console.log("Show validation report")
    }


    function showFileUploadModal() {
        return (
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Modal Header
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Modal content
                    </Typography>
                </Box>
            </Modal>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>

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
                    background: 'lightblue',
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
                    </Box>}
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
