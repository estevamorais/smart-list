import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Drawer,
  useMediaQuery,
} from '@mui/material';
  import { TableView, ViewComfy, Map, Add, FilterList } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Filters from './Filters';

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
  showAddButton?: boolean;
  groupBy: string;
  setGroupBy: React.Dispatch<React.SetStateAction<string>>;
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
  setSortBy,
  showAddButton = false,
  groupBy,
  setGroupBy,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasImageProperty = properties.some((prop) => prop.type === 'image');
  const hasLatLong =
    properties.some((prop) => prop.type === 'lat') &&
    properties.some((prop) => prop.type === 'long');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          gap: 3,
          maxWidth: '1200px',
          padding: '0 16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Botões sempre visíveis */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          {showAddButton && (
            <Button variant="contained" color="primary" startIcon={<Add />}>
              {isMobile ? 'Adicionar' : 'Adicionar Novo'}
            </Button>
          )}

          <Tooltip title="Visualizar em Tabela">
            <IconButton
              onClick={() => setActiveList('table')}
              color={activeList === 'table' ? 'primary' : 'default'}
            >
              <TableView />
            </IconButton>
          </Tooltip>

          {hasImageProperty && (
            <Tooltip title="Visualizar em Cartões">
              <IconButton
                onClick={() => setActiveList('cards')}
                color={activeList === 'cards' ? 'primary' : 'default'}
              >
                <ViewComfy />
              </IconButton>
            </Tooltip>
          )}

          {hasLatLong && (
            <Tooltip title="Visualizar no Mapa">
              <IconButton
                onClick={() => setActiveList('map')}
                color={activeList === 'map' ? 'primary' : 'default'}
              >
                <Map />
              </IconButton>
            </Tooltip>
          )}

          {isMobile && (
            <Tooltip title="Abrir filtros">
              <IconButton onClick={() => setFiltersOpen(true)}>
                <FilterList />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Filtros visíveis só no desktop (em ROW) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              properties={properties}
              selectedProperties={selectedProperties}
              setSelectedProperties={setSelectedProperties}
              sortBy={sortBy}
              setSortBy={setSortBy}
              activeList={activeList}
              groupBy={groupBy}
              setGroupBy={setGroupBy}
            />
          </Box>
        )}
      </Box>

      {/* Drawer no mobile com largura controlada */}
      <Drawer
        anchor="right"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        sx={{
          width: 300,
          maxWidth: '90vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            maxWidth: '90vw',
          },
        }}
      >
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          properties={properties}
          selectedProperties={selectedProperties}
          setSelectedProperties={setSelectedProperties}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeList={activeList}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
        />
      </Drawer>
    </Box>
  );
};

export default HeaderFilter;
