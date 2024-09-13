import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';

const drawerWidth = "60px";

const SideMenu = ({ onOpenUploadModal, onOpenValidationModal }) => {

    return (
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
                onClick={onOpenUploadModal}
            >
                <UploadFileIcon sx={{
                    color: "black"
                }} />
            </IconButton>

            <IconButton
                onClick={onOpenValidationModal}
            >
                <RuleOutlinedIcon
                    sx={{
                        color: "black"
                    }} />
            </IconButton>
        </Drawer>
    );
}

export default SideMenu;