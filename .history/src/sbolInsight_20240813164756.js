import * as React from "react";
import { Drawer, Container } from "@mui/material";

const drawerWidth = 90

function SBOLInsightPage() {

    return (
        <div style={{ display: "flex" }}>

            <Drawer
                sx={{ width: drawerWidth, background: 'lightblue' }}
                variant="permanent"
                anchor="left"
            >
                <p>Drawer</p>
            </Drawer>
            {/* <div >
                <p>SBOL Insight</p>
            </div> */}
            <Container sx={{ width: '100%', background: 'lightblue' }}>
                <p>SBOL Insight</p>
            </Container>
        </div>
    );
}

export default SBOLInsightPage;