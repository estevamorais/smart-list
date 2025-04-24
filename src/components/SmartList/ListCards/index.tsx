import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

interface ListCardsProps {
  data: Record<string, any>[];
  properties: { name: string; type: string }[];
}

const ListCards: React.FC<ListCardsProps> = ({ data, properties }) => {
  // Filtra as propriedades por tipo
  const textProps = properties.filter((prop) => prop.type === 'text' || prop.type === 'number');
  const imageProp = properties.find((prop) => prop.type === 'image');

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card>
            {imageProp && item[imageProp.name] && (
              <CardMedia
                component="img"
                height="200"
                image={item[imageProp.name]}
                alt={item[imageProp.name]}
              />
            )}
            <CardContent>
              {textProps.map((prop) => (
                <Typography key={prop.name} variant="body2" color="text.secondary">
                  <strong>{prop.name}:</strong> {item[prop.name]}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListCards;
