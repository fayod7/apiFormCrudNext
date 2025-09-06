'use client'
import Form from "@/components/form/Form";
import UsersView, { IUser } from "@/components/users-view/UsersView";
import { useEffect, useState } from "react";

export default  function Home() {

  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

    useEffect(() => {
    fetchUsers();
  }, []);
   const fetchUsers = async () => {
    const res = await fetch('https://689cc5cece755fe69786fba7.mockapi.io/user');
    const data = await res.json();
    setUsers(data);
  };
  const handleDelete = async(id: string | undefined) => {
    const res = await fetch(`https://689cc5cece755fe69786fba7.mockapi.io/user/${id}`,{ method: 'DELETE'})
    fetchUsers();
}
  const handleUpdate = (user: IUser) => {
    setEditingUser(user);
  }
  return (
    <div className="flex flex-col gap-5">
    <Form editingUser={editingUser} setEditingUser={setEditingUser} refreshUsers={fetchUsers}/>
     <UsersView data={users} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
}
