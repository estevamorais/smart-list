import React from 'react';
import { Box } from '@mui/material';
import ItemCard, { Property } from './ItemCard';

interface GridViewProps {
  data: Record<string, any>[];
  properties: Property[];
}

const GridView: React.FC<GridViewProps> = ({ data, properties }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',  
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        },
      }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ItemCard item={item} properties={properties} />
        </Box>
      ))}
    </Box>
  );
};

export default GridView;
