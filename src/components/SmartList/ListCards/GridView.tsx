import React from 'react';
import { Grid } from '@mui/material';
import ItemCard, { Property } from './ItemCard';

interface GridViewProps {
  data: Record<string, any>[];
  properties: Property[];
}

const GridView: React.FC<GridViewProps> = ({ data, properties }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <ItemCard item={item} properties={properties} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridView;
