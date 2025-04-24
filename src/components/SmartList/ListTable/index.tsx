import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface ListTableProps {
  data: any[];
  properties: { name: string; type: string }[];
}

const ListTable: React.FC<ListTableProps> = ({ data, properties }) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {properties.map((property) => (
                <TableCell key={property.name}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {property.name}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {properties.map((property) => (
                  <TableCell key={property.name} align="left">
                    {property.type === 'image' ? (
                      <img src={row[property.name]} alt="foto" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    ) : (
                      row[property.name]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListTable;
