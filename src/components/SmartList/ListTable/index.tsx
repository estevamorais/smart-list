import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface ListTableProps {
  data: any[];
  properties: { name: string; type: string }[];
}

const ListTable: React.FC<ListTableProps> = ({ data, properties }) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela simples">
          <TableHead>
            <TableRow>
              {properties.map((property) => (
                <TableCell key={property.name}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {property.name}
                  </Typography>
                </TableCell>
              ))}
              <TableCell>{/* Coluna para o botão de edição */}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  position: 'relative',
                  '&:hover .edit-btn': { opacity: 1 }
                }}
              >
                {properties.map((property) => (
                  <TableCell key={property.name} align="left">
                    {property.type === 'image' ? (
                      <img
                        src={row[property.name]}
                        alt="foto"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : (
                      row[property.name]
                    )}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton
                    className="edit-btn"
                    sx={{
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListTable;
