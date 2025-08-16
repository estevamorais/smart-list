import { useEffect, useState } from 'react';
import HeaderFilter from './HeaderFilter';
import ListCards from './ListCards';
import ListMap from './ListMap';
import ListTable from './ListTable';
import { Box, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { data, properties, groupByOptions, defaultGroupBy } from '../../data'; 

const SmartList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeList, setActiveList] = useState<'table' | 'cards' | 'map'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>(['Todos']);
  const [sortBy, setSortBy] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>(defaultGroupBy); 

  const filteredData = data.filter((item) => {
    if (selectedProperties.includes('Todos')) {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return selectedProperties.some((property) =>
        String(item[property]).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      })
    : filteredData;

  // Visualização padrão cards no mobile
  useEffect(() => {
    if (activeList === 'table') {
      setActiveList(isMobile ? 'cards' : 'table');
    }
  }, [isMobile, activeList]);

  return (
    <Box>
      <HeaderFilter
        activeList={activeList}
        setActiveList={setActiveList}
        properties={properties}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedProperties={selectedProperties}
        setSelectedProperties={setSelectedProperties}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showAddButton={true}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        groupByOptions={groupByOptions}
      />
      <Divider sx={{ my: 2 }} />

      {activeList === 'table' && <ListTable data={sortedData} properties={properties} />}

      {activeList === 'cards' && (
        <ListCards data={sortedData} properties={properties} groupBy={groupBy} />
      )}

      {activeList === 'map' && <ListMap data={sortedData} properties={properties} />}
    </Box>
  );
};

export default SmartList;
