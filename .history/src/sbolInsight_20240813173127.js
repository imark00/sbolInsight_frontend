import * as React from "react";
import { Drawer, Box } from "@mui/material";

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
                <p>Drawer</p>
            </Drawer>

            <Container
                sx={{
                    width: '100%',
                    background: 'lightblue',
                    padding: '30px',
                }}

            >
                <p>SBOL Insight</p>
            </Container>
        </Box>
    );
}

export default SBOLInsightPage;
