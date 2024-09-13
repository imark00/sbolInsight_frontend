import * as React from "react";
import { Drawer, Box, IconButton, Icon } from "@mui/material";

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
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <IconButton> Icon 1</IconButton>
                <IconButton> Icon 2</IconButton>
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
