import * as React from "react";
import { Drawer, Container } from "@mui/material";

const drawerWidth = 90

function SBOLInsightPage() {

    return (
        <div>

            <Drawer
                sx={{ width: drawerWidth }}
                variant="permanent"
                anchor="left"
            >

            </Drawer>
            {/* <div >
                <p>SBOL Insight</p>
            </div> */}
            <Container sx={{ width: '100%', background: '#f9f9f9' }}>
                <p>SBOL Insight</p>
            </Container>
        </div>
    );
}

export default SBOLInsightPage;