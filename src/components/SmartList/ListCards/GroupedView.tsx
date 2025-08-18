// src/components/SmartList/ListCards/GroupedView.tsx
import React from 'react';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import ItemCard, { Property } from './ItemCard';

interface GroupedViewProps {
  data: Record<string, any>[];
  properties: Property[];
  groupBy: string;
}

const GroupedView: React.FC<GroupedViewProps> = ({ data, properties, groupBy }) => {
  const groups = React.useMemo(() => {
    return data.reduce((acc, item) => {
      const key = String(item[groupBy] ?? '—');
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, Record<string, any>[]>);
  }, [data, groupBy]);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minHeight: 220, pb: 1 }}>
        {Object.entries(groups).map(([groupName, items]) => (
          <Box
            key={groupName}
            sx={{
              flex: '0 0 320px',
              maxWidth: 360,
              minWidth: 280,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              p: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, px: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {groupName}
              </Typography>
              <Chip size="small" label={items.length} />
            </Box>
            <Divider sx={{ mb: 1.5 }} />

            <Stack spacing={1.5}>
              {items.map((item: Record<string, any>, idx: number) => (
                <ItemCard key={idx} item={item} properties={properties} compact />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GroupedView;
