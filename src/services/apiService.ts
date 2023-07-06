// import usersData from './db.json'

interface User {
    id: number;
    name: string;
    role: string;
    email: string;
}

export async function getUsers(): Promise<User[]> {
    const response = await fetch('http://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}

// export function getUsers(): Promise<User[]> {
    
//   return Promise.resolve(usersData);
// }
