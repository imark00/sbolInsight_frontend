import * as React from "react";
import { Drawer } from "@mui/material";

const drawerWidth = 90

const useStyles = makeStyles({
    page: {
        width: '100%',
        background: '#f9f9f9',

    },
    drawer: {
        width: drawerWidth,
    }
})

function SBOLInsightPage() {
    const classes = useStyles()

    return (
        <div>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
            ></Drawer>
            <div className={classes.page}>
                <p>SBOL Insight</p>
            </div>
        </div>
    );
}

export default SBOLInsightPage;