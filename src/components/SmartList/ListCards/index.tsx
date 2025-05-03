import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface ListCardsProps {
  data: Record<string, any>[];
  properties: { name: string; type: string }[];
}

const ListCards: React.FC<ListCardsProps> = ({ data, properties }) => {
  const textProps = properties.filter((prop) => prop.type === 'text' || prop.type === 'number');
  const imageProp = properties.find((prop) => prop.type === 'image');

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Box position="relative" sx={{ '&:hover .edit-btn': { opacity: 1 } }}>
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
            <IconButton
              className="edit-btn"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'white',
                opacity: 0,
                transition: 'opacity 0.3s',
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListCards;
