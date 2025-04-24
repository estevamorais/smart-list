import React, { useState } from 'react';
import HeaderFilter from './HeaderFilter';
import ListCards from './ListCards';
import ListMap from './ListMap';
import ListTable from './ListTable';
import { Box, Divider } from '@mui/material';

// Dados genéricos
const data: Record<string, any>[] = [
  {
    nome: "Lucas Almeida",
    idade: 28,
    cargo: "Desenvolvedor Front-end",
    foto: "https://randomuser.me/api/portraits/men/21.jpg",
    localizacao: "São Paulo, Brasil",
    lat: -23.5505,
    long: -46.6333
  },
  {
    nome: "Mariana Costa",
    idade: 31,
    cargo: "Product Owner",
    foto: "https://randomuser.me/api/portraits/women/19.jpg",
    localizacao: "Rio de Janeiro, Brasil",
    lat: -22.9068,
    long: -43.1729
  },
  {
    nome: "Pedro Henrique",
    idade: 25,
    cargo: "UI Designer",
    foto: "https://randomuser.me/api/portraits/men/55.jpg",
    localizacao: "Belo Horizonte, Brasil",
    lat: -19.9167,
    long: -43.9345
  },
  {
    nome: "Aline Freitas",
    idade: 34,
    cargo: "QA Analyst",
    foto: "https://randomuser.me/api/portraits/women/41.jpg",
    localizacao: "Recife, Brasil",
    lat: -8.0476,
    long: -34.8770
  },
  {
    nome: "Rafael Silva",
    idade: 29,
    cargo: "DevOps Engineer",
    foto: "https://randomuser.me/api/portraits/men/73.jpg",
    localizacao: "Curitiba, Brasil",
    lat: -25.4284,
    long: -49.2733
  },
  {
    nome: "Beatriz Rocha",
    idade: 26,
    cargo: "Product Designer",
    foto: "https://randomuser.me/api/portraits/women/55.jpg",
    localizacao: "Porto Alegre, Brasil",
    lat: -30.0346,
    long: -51.2177
  },
  {
    nome: "André Martins",
    idade: 32,
    cargo: "Tech Lead",
    foto: "https://randomuser.me/api/portraits/men/12.jpg",
    localizacao: "Brasília, Brasil",
    lat: -15.7939,
    long: -47.8828
  },
  {
    nome: "Camila Dias",
    idade: 30,
    cargo: "Scrum Master",
    foto: "https://randomuser.me/api/portraits/women/77.jpg",
    localizacao: "Fortaleza, Brasil",
    lat: -3.7172,
    long: -38.5433
  }
];

// Tipagem das propriedades
export const properties = [
  { name: 'nome', type: 'text' },
  { name: 'idade', type: 'number' },
  { name: 'cargo', type: 'text' },
  { name: 'foto', type: 'image' },
  { name: 'localizacao', type: 'text' },
  { name: 'lat', type: 'lat' },
  { name: 'long', type: 'long' },
];

const SmartList = () => {
  const [activeList, setActiveList] = useState<'table' | 'cards' | 'map'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperties, setSelectedProperties] = useState<string[]>(['Todos']);
  const [sortBy, setSortBy] = useState<string>(''); // estado para controlar a ordenação

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

  // Ordena os dados com base no sortBy
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      })
    : filteredData;

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
        sortBy={sortBy}  // Passando o sortBy
        setSortBy={setSortBy}  // Passando a função setSortBy
      />
      <Divider sx={{ my: 2 }} />

      {activeList === 'table' && <ListTable data={sortedData} properties={properties} />}
      {activeList === 'cards' && <ListCards data={sortedData} properties={properties} />}
      {activeList === 'map' && <ListMap data={sortedData} properties={properties} />}
    </Box>
  );
};

export default SmartList;
