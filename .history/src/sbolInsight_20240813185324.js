import * as React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
//import UploadFileIcon from '@mui/icons-material/UploadFile';

const drawerWidth = 60

function SBOLInsightPage() {

    return (
        <Box sx={{ display: 'flex' }}>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    padding: '8px',
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        padding: '8px',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <IconButton>
                    I1
                </IconButton>

                <IconButton> I2</IconButton>
            </Drawer>

            <Box
                sx={{
                    width: '100%',
                    background: 'lightblue',
                    padding: '30px',
                }}
            >
                <p>SBOL Insight</p>
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
