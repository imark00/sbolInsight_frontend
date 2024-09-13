import * as React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';

const drawerWidth = 60

function SBOLInsightPage() {

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
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <IconButton>
                    <UploadFileIcon />
                </IconButton>

                <IconButton>
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
                <p>SBOL Insight</p>
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
