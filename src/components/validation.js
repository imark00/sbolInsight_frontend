import React from "react";
import { Box, Typography, Button } from "@mui/material";


const validationMessages = ({ open, onClose, validationData }) => {

    if (!open) return null;


    return (
        <Box id="validationModal"
            sx={{
                width: "100%",
                height: "260px",
                backgroundColor: '#F8F8F8',
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: '3px solid #CBD0DC',
                boxSizing: "border-box",
                padding: "10px 20px 20px 20px",
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    flex: 1,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography>
                        Validation Report
                    </Typography>

                    <Button
                        variant="text"
                        size="small"
                        color="error"
                        onClick={onClose}
                        sx={{
                            letterSpacing: "0.04em"
                        }}
                    >
                        Close
                    </Button>
                </Box>

                {validationData
                    ? <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                        }}>
                        <div className="validationText">
                            {
                                validationData.status === "success"
                                    ? <div>
                                        Total Statements: {validationData.totalStmts} <br /> <br />
                                        {validationData.stmts}
                                    </div>
                                    : validationData.error
                            }
                        </div>
                    </Box>
                    : <Box
                        sx={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            display: 'flex',
                            textAlign: 'center',
                        }}>
                        <div className="validationText">
                            Nothing to show yet
                        </div>
                    </Box>
                }

            </Box>
        </Box>
    );
}

export default validationMessages;