import React from 'react';
import GridView from './GridView';
import GroupedView from './GroupedView';
import { Property } from './ItemCard';

interface ListCardsProps {
  data: Record<string, any>[];
  properties: Property[];
  groupBy?: string;
}

const ListCards: React.FC<ListCardsProps> = ({ data, properties, groupBy }) => {
  const canGroup =
    !!groupBy &&
    properties.some((p) => p.name === groupBy && (p.type === 'text' || p.type === 'number'));

  if (canGroup && groupBy) {
    return <GroupedView data={data} properties={properties} groupBy={groupBy} />;
  }

  return <GridView data={data} properties={properties} />;
};

export default ListCards;
