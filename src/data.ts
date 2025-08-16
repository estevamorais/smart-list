const data: Record<string, any>[] = [
  { 
    nome: 'Lucas Almeida', 
    idade: 28, 
    cargo: 'Desenvolvedor Front-end', 
    foto: 'https://randomuser.me/api/portraits/men/21.jpg', 
    localizacao: 'São Paulo', 
    departamento: 'Tecnologia', 
    lat: -23.5505, 
    long: -46.6333 
  },
  { 
    nome: 'Mariana Costa', 
    idade: 31, 
    cargo: 'Product Owner', 
    foto: 'https://randomuser.me/api/portraits/women/19.jpg', 
    localizacao: 'Rio de Janeiro', 
    departamento: 'Produto', 
    lat: -22.9068, 
    long: -43.1729 
  },
  { 
    nome: 'Pedro Henrique', 
    idade: 25, 
    cargo: 'UI Designer', 
    foto: 'https://randomuser.me/api/portraits/men/55.jpg', 
    localizacao: 'São Paulo', 
    departamento: 'Design', 
    lat: -19.9167, 
    long: -43.9345 
  },
  { 
    nome: 'Aline Freitas', 
    idade: 34, 
    cargo: 'QA Analyst', 
    foto: 'https://randomuser.me/api/portraits/women/41.jpg', 
    localizacao: 'Recife', 
    departamento: 'Qualidade', 
    lat: -8.0476, 
    long: -34.877 
  },
  { 
    nome: 'Rafael Silva', 
    idade: 29, 
    cargo: 'DevOps Engineer', 
    foto: 'https://randomuser.me/api/portraits/men/73.jpg', 
    localizacao: 'Curitiba', 
    departamento: 'Infraestrutura', 
    lat: -25.4284, 
    long: -49.2733 
  },
  { 
    nome: 'Beatriz Rocha', 
    idade: 26, 
    cargo: 'Product Designer', 
    foto: 'https://randomuser.me/api/portraits/women/55.jpg', 
    localizacao: 'Porto Alegre', 
    departamento: 'Design', 
    lat: -30.0346, 
    long: -51.2177 
  },
  { 
    nome: 'André Martins', 
    idade: 32, 
    cargo: 'Tech Lead', 
    foto: 'https://randomuser.me/api/portraits/men/12.jpg', 
    localizacao: 'Brasília', 
    departamento: 'Tecnologia', 
    lat: -15.7939, 
    long: -47.8828 
  },
  { 
    nome: 'Camila Dias', 
    idade: 30, 
    cargo: 'Scrum Master', 
    foto: 'https://randomuser.me/api/portraits/women/77.jpg', 
    localizacao: 'Fortaleza', 
    departamento: 'Agilidade', 
    lat: -3.7172, 
    long: -38.5433 
  },
  { 
    nome: 'Thiago Nunes', 
    idade: 28, 
    cargo: 'Desenvolvedor Back-end', 
    foto: 'https://randomuser.me/api/portraits/men/44.jpg', 
    localizacao: 'São Paulo', 
    departamento: 'Tecnologia', 
    lat: -23.5505, 
    long: -46.6333 
  },
  { 
    nome: 'Fernanda Lopes', 
    idade: 31, 
    cargo: 'Analista de Produto', 
    foto: 'https://randomuser.me/api/portraits/women/52.jpg', 
    localizacao: 'Rio de Janeiro', 
    departamento: 'Produto', 
    lat: -22.9068, 
    long: -43.1729 
  },
  { 
    nome: 'Carlos Eduardo', 
    idade: 25, 
    cargo: 'UX Designer', 
    foto: 'https://randomuser.me/api/portraits/men/60.jpg', 
    localizacao: 'Porto Alegre', 
    departamento: 'Design', 
    lat: -30.0346, 
    long: -51.2177 
  },
  { 
    nome: 'Patrícia Moura', 
    idade: 29, 
    cargo: 'QA Engineer', 
    foto: 'https://randomuser.me/api/portraits/women/65.jpg', 
    localizacao: 'Curitiba', 
    departamento: 'Qualidade', 
    lat: -25.4284, 
    long: -49.2733 
  },
  { 
    nome: 'Rodrigo Ferreira', 
    idade: 26, 
    cargo: 'SysAdmin', 
    foto: 'https://randomuser.me/api/portraits/men/82.jpg', 
    localizacao: 'Recife', 
    departamento: 'Infraestrutura', 
    lat: -8.0476, 
    long: -34.877 
  },
  { 
    nome: 'Juliana Prado', 
    idade: 34, 
    cargo: 'UX Writer', 
    foto: 'https://randomuser.me/api/portraits/women/80.jpg', 
    localizacao: 'Brasília', 
    departamento: 'Design', 
    lat: -15.7939, 
    long: -47.8828 
  },
  { 
    nome: 'Eduardo Farias', 
    idade: 30, 
    cargo: 'Agile Coach', 
    foto: 'https://randomuser.me/api/portraits/men/88.jpg', 
    localizacao: 'Fortaleza', 
    departamento: 'Agilidade', 
    lat: -3.7172, 
    long: -38.5433 
  },
  { 
    nome: 'Sofia Martins', 
    idade: 32, 
    cargo: 'Arquiteta de Software', 
    foto: 'https://randomuser.me/api/portraits/women/15.jpg', 
    localizacao: 'São Paulo', 
    departamento: 'Tecnologia', 
    lat: -23.5505, 
    long: -46.6333 
  },
];

// Tipagem das propriedades
const properties = [
  { name: 'nome', type: 'text' },
  { name: 'idade', type: 'number' },
  { name: 'cargo', type: 'text' },
  { name: 'foto', type: 'image' },
  { name: 'localizacao', type: 'text' },
  { name: 'lat', type: 'lat' },
  { name: 'long', type: 'long' },
];

// Obejto de opções para agrupamento
const groupByOptions = properties
  .filter((prop) => prop.type === 'text' || prop.type === 'number')
  .map((prop) => prop.name);

const defaultGroupBy = 'cargo'; // Agrupamento padrão

export {  data, properties, groupByOptions, defaultGroupBy };