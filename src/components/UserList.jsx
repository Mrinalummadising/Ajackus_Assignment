import React from "react";

function UserList({ users, onEdit, onDelete }) {
  // Check if users is an array and has data
  if (!Array.isArray(users) || users.length === 0) {
    return <p className="text-center text-lg">No users available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-red-200 table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-indigo-100">
            <th className="py-3 px-4 text-center text-sm font-semibold text-white bg-red-400">
              ID
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-white bg-orange-400">
              First Name
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-white bg-amber-300">
              Last Name
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-white hidden sm:table-cell bg-lime-400">
              Email
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-white hidden md:table-cell bg-green-500">
              Department
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-white bg-emerald-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4 text-center">{user.id}</td>
              <td className="py-2 px-4 text-center">{user.firstName}</td>
              <td className="py-2 px-4 text-center">{user.lastName}</td>
              <td className="py-2 px-4 text-center hidden sm:table-cell">
                {user.email}
              </td>
              <td className="py-2 px-4 text-center hidden md:table-cell">
                {user.department}
              </td>
              <td className="py-2 px-4 text-center">
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
