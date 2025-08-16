import React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export interface Property {
  name: string;
  type: string;
}

interface ItemCardProps {
  item: Record<string, any>;
  properties: Property[];
  compact?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, properties, compact }) => {
  const textProps = properties.filter((prop) => prop.type === 'text' || prop.type === 'number');
  const imageProp = properties.find((prop) => prop.type === 'image');

  return (
    <Box position="relative" sx={{ '&:hover .edit-btn': { opacity: 1 } }}>
      <Card variant={compact ? 'outlined' : undefined}>
        {imageProp && item[imageProp.name] && (
          <CardMedia
            component="img"
            height={compact ? '160' : '200'}
            image={item[imageProp.name]}
            alt={String(item[imageProp.name])}
          />
        )}
        <CardContent sx={{ py: compact ? 1.5 : undefined }}>
          {textProps.map((prop) => (
            <Typography key={prop.name} variant="body2" color="text.secondary">
              <strong>{prop.name}:</strong> {String(item[prop.name])}
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
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default ItemCard;
