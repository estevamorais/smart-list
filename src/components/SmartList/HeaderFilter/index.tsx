import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  SelectChangeEvent
} from '@mui/material';
import { TableView, ViewComfy, Map, Search } from '@mui/icons-material';

interface HeaderFilterProps {
  activeList: 'table' | 'cards' | 'map';
  setActiveList: React.Dispatch<React.SetStateAction<'table' | 'cards' | 'map'>>;
  properties: { name: string; type: string }[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedProperties: string[];
  setSelectedProperties: React.Dispatch<React.SetStateAction<string[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderFilter: React.FC<HeaderFilterProps> = ({
  activeList,
  setActiveList,
  properties,
  searchQuery,
  setSearchQuery,
  selectedProperties,
  setSelectedProperties,
  sortBy,
  setSortBy
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePropertyChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedProperties(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const areAllPropertiesSelected = properties.every((property) =>
    selectedProperties.includes(property.name)
  );

  useEffect(() => {
    setSelectedProperties(properties.map((p) => p.name));
  }, [properties, setSelectedProperties]);

  // Lógica para exibir botões
  const hasImageProperty = properties.some((prop) => prop.type === 'image');
  const hasLatLong = 
    properties.some((prop) => prop.type === 'lat') && 
    properties.some((prop) => prop.type === 'long');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        gap: 3,
        maxWidth: '1200px',
        padding: '0 16px'
      }}>
        {/* Botões de navegação */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            onClick={() => setActiveList('table')}
            variant={activeList === 'table' ? 'contained' : 'outlined'}
            color={activeList === 'table' ? 'primary' : 'inherit'}
            startIcon={<TableView sx={{ fontSize: 28 }} />}
          >
            Tabela
          </Button>

          {hasImageProperty && (
            <Button
              onClick={() => setActiveList('cards')}
              variant={activeList === 'cards' ? 'contained' : 'outlined'}
              color={activeList === 'cards' ? 'primary' : 'inherit'}
              startIcon={<ViewComfy sx={{ fontSize: 28 }} />}
            >
              Cartões
            </Button>
          )}

          {hasLatLong && (
            <Button
              onClick={() => setActiveList('map')}
              variant={activeList === 'map' ? 'contained' : 'outlined'}
              color={activeList === 'map' ? 'primary' : 'inherit'}
              startIcon={<Map sx={{ fontSize: 28 }} />}
            >
              Mapa
            </Button>
          )}
        </Box>

        {/* Campo de pesquisa e filtro */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '250px' }}
            InputProps={{
              startAdornment: <Search sx={{ marginRight: 1 }} />
            }}
          />

          <FormControl sx={{ minWidth: 180, width: 250 }}>
            <InputLabel>Filtrar Por</InputLabel>
            <Select
              multiple
              value={selectedProperties}
              onChange={handlePropertyChange}
              renderValue={(selected) =>
                areAllPropertiesSelected ? 'Todos' : selected.join(', ')
              }
              label="Filtrar Por"
            >
              {properties.map((property) => (
                <MenuItem key={property.name} value={property.name}>
                  <Checkbox checked={selectedProperties.includes(property.name)} />
                  <ListItemText primary={property.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown de ordenação - visível apenas em 'table' ou 'cards' */}
          {['table', 'cards'].includes(activeList) && (
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Ordenar Por</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Ordenar Por"
                disabled={activeList !== 'table' && activeList !== 'cards'}
              >
                <MenuItem value="">Nenhum</MenuItem>
                {properties
                  .filter((prop) => prop.type === 'text' || prop.type === 'number') // Filtro para ordenar por texto e número
                  .map((property) => (
                    <MenuItem key={property.name} value={property.name}>
                      {property.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderFilter;
