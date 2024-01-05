import { User } from "@/types";
import { useEffect, useState } from "react";

const UserOverview = () => {
    const [users, setUsers] = useState<User[]>([]);
    

    const SetUsers = () => {
        setUsers([
            {
                name: "Wannes",
                password: "admin",
                admin: true,
            },
            {
                name: "Robin",
                password: "admin",
                admin: true,
            },
            {
                name: "greetjej",
                password: "greetjej123",
                admin: false,
            },
            {
                name: "elkes",
                password: "elkes123",
                admin: false,
            },
            {
                name: "johanp",
                password: "johanp123",
                admin: false,
            },
            
        ]);
    }

    useEffect(() => {
        SetUsers();
    }, []);

    return (
        <div className="mx-auto mt-6 w-1/3 py-5">
        <h1 className="text-center mb-4 text-lg">Users</h1>
        <table className="w-full table-auto">
          <thead className="border">
            <tr>
              <th className="tableData">Username</th>
              <th className="tableData">Password</th>
              <th className="tableData">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border">
                <td className="tableData">{user.name}</td>
                <td className="tableData">{user.password}</td>
                <td className="tableData">
                  {user.admin ? "Admin" : "User"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default UserOverview;