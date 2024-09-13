import React, { useEffect, useState } from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';


const drawerWidth = 60

function uploadFile() {
    console.log("Upload file")
}

function showValiationReport() {
    console.log("Show validation report")
}

// function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
// }

function SBOLInsightPage() {

    const [testData, setTestData] = useState('Hello World!');

    const testAPI = async () => {
        fetch("http://localhost:8080/api/test")
            .then((response) => response.json())
            .then((data) => setTestData(data))
            .catch((error) => console.error('Error:', error))
    }

    useEffect(() => { testAPI() }, [])

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
                    background: 'lightblue',
                    padding: '30px',
                }}
            >
                <p> {testData.status}</p>
                <p> {testData.app}</p>
                <p> {testData.message}</p>
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
