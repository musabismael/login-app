import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/apiService';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  [key: string]: any; // Add index signature
}

interface TableProps {
  role: string;
}

const Table: React.FC<TableProps> = ({ role }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: string) => {
    setSortedField(field);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = sortedField
    ? [...filteredUsers].sort((a, b) => {
        if (a[sortedField] < b[sortedField]) return -1;
        if (a[sortedField] > b[sortedField]) return 1;
        return 0;
      })
    : filteredUsers;
 // Pagination
 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

 const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

 const paginate = (pageNumber: number) => {
   setCurrentPage(pageNumber);
 };

  return (
    <div>
      {role === 'Editor' && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      )}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortedField === 'id' && '▼'}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortedField === 'name' && '▼'}
            </th>
            <th onClick={() => handleSort('role')}>
              Role {sortedField === 'role' && '▼'}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortedField === 'email' && '▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedUsers.length > usersPerPage && (
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => paginate(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Table;
