import * as React from "react";
import { Drawer, Container } from "@mui/material";

const drawerWidth = 90

function SBOLInsightPage() {

    return (
        <Box sx={{ display: 'flex' }}>

            <Drawer
                sx={{
                    width: drawerWidth, background: 'lightblue', flexShrink: 0,
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

            <Box sx={{ width: '100%', background: 'lightblue' }}>
                {/* component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }} */}
                <p>SBOL Insight</p>
            </Box>
        </Box>
    );
}

export default SBOLInsightPage;
