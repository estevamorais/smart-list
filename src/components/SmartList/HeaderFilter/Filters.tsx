import React from 'react';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  SelectChangeEvent,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  properties: { name: string; type: string }[];
  selectedProperties: string[];
  setSelectedProperties: React.Dispatch<React.SetStateAction<string[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  activeList: 'table' | 'cards' | 'map';
  groupBy: string;
  setGroupBy: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  properties,
  selectedProperties,
  setSelectedProperties,
  sortBy,
  setSortBy,
  activeList,
  groupBy,
  setGroupBy,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePropertyChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const selected = typeof value === 'string' ? value.split(',') : value;

    const allPropertyNames = properties.map((p) => p.name);

    if (selected.includes('Todos')) {
      if (selectedProperties.length === properties.length) {
        setSelectedProperties([]);
      } else {
        setSelectedProperties(allPropertyNames);
      }
    } else {
      setSelectedProperties(selected);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value);
  };

  // Apenas text/number podem ser usados para ordenar/agrupamento
  const orderableProps = properties.filter((p) => p.type === 'text' || p.type === 'number');

  const gridTemplateColumns = {
    map: '2fr 1fr',
    cards: '1.5fr 1fr 1fr 1fr',
    table: '1fr 1fr 1fr',
  };

  return (
    <Box
      sx={{
        p: 2,
        width: isMobile ? '90%' : 720,
        display: isMobile ? 'grid' : 'grid',
        gridTemplateColumns: isMobile ? '1fr' : gridTemplateColumns[activeList],
        gap: 2,
      }}
    >
      {isMobile && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          Filtros
        </Typography>
      )}

      {/* Buscar */}
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <Search sx={{ marginRight: 1 }} />
        }}
        fullWidth
      />

      {/* Filtrar Por */}
      <FormControl fullWidth>
        <InputLabel>Filtrar Por</InputLabel>
        <Select
          multiple
          value={
            selectedProperties.length === properties.length
              ? ['Todos', ...selectedProperties]
              : selectedProperties
          }
          onChange={handlePropertyChange}
          renderValue={(selected) =>
            selected.includes('Todos') || selectedProperties.length === properties.length
              ? 'Todos'
              : (selected as string[]).join(', ')
          }
          label="Filtrar Por"
        >
          <MenuItem value="Todos">
            <Checkbox checked={selectedProperties.length === properties.length} />
            <ListItemText primary="Todos" />
          </MenuItem>

          {properties.map((property) => (
            <MenuItem key={property.name} value={property.name}>
              <Checkbox checked={selectedProperties.includes(property.name)} />
              <ListItemText primary={property.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ordenar Por (somente table/cards) */}
      {['table', 'cards'].includes(activeList) ? (
        <FormControl fullWidth>
          <InputLabel>Ordenar Por</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Ordenar Por">
            <MenuItem value="">Nenhum</MenuItem>
            {orderableProps.map((property) => (
              <MenuItem key={property.name} value={property.name}>
                {property.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Box /> // placeholder para manter grid alinhado
      )}

      {/* Agrupar Por (somente cards) */}
      {activeList === 'cards' ? (
        <FormControl fullWidth>
          <InputLabel>Agrupar Por</InputLabel>
          <Select value={groupBy} onChange={handleGroupChange} label="Agrupar Por" defaultValue="">
            <MenuItem value="">Nenhum</MenuItem>
            {orderableProps.map((property) => (
              <MenuItem key={property.name} value={property.name}>
                {property.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Box /> // placeholder para manter grid alinhado
      )}
    </Box>
  );
};

export default Filters;
