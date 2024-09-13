import React from 'react';
import { Box, Typography } from '@mui/material';
import CytoscapeComponent from 'react-cytoscapejs';

const GraphView = ({ graphElements, graphError, loading }) => {

    return (
        <Box
            sx={{
                position: 'relative',
                width: "100%",
                height: "100%",
                backgroundColor: 'white',
            }}
        >
            {graphElements
                ? <CytoscapeComponent
                    elements={CytoscapeComponent.normalizeElements({
                        nodes: graphElements.nodes,
                        edges: graphElements.edges
                    })}
                    stylesheet={[
                        {
                            selector: 'node',
                            style: {
                                label: 'data(name)',
                                width: "30px",
                                height: "30px",
                            }
                        },
                        {
                            selector: 'edge',
                            style: {
                                label: 'data(label)',
                                width: 2,

                            }
                        }
                    ]}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    layout={{
                        name: 'grid',
                        fit: true
                    }}
                />
                : <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    {graphError
                        ? <Typography>
                            Could not generate the graph
                        </Typography>
                        : loading
                            ? <Box>
                                <l-quantum
                                    size="220"
                                    speed="2.2"
                                    color="#36A108"
                                />
                            </Box>
                            : <Box>
                                <Typography
                                    sx={{
                                        fontSize: "70px",
                                        letterSpacing: "0.04em",
                                        fontWeight: "bold",
                                        fontStyle: "oblique"
                                    }}
                                >
                                    Welcome to SBOLInsight
                                </Typography>
                            </Box>
                    }
                </Box>
            }
        </Box>
    );
}

export default GraphView;