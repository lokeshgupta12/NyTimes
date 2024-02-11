// ListDataContext.js
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useMemo } from 'react';

const ListDataContext = createContext();

function ListDataProvider({ children }) {
  const [listData, setListData] = useState([]);
  const contextValue = useMemo(() => ({ listData, setListData }), [listData, setListData]);
  return <ListDataContext.Provider value={contextValue}>{children}</ListDataContext.Provider>;
}
ListDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ListDataProvider;

export const useListData = () => useContext(ListDataContext);
