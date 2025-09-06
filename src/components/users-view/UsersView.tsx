'use client'
import { FC, memo } from 'react';
import userImg from '@/assets/user.jpg'
import Image from 'next/image';

export interface IUser{
    first_name: string
    last_name: string
    gender: string
    address: string
    id: string
}

interface Props{
    data: IUser[]
    handleDelete: (id: string) => void;
    handleUpdate: (user: IUser) => void;
}

const UsersView:FC<Props> = ({ data, handleDelete, handleUpdate }) => {
  return (
    <div className="container grid grid-cols-5 gap-3">
      {
        data?.map((user:IUser) => (
            <div key={user.id} className='flex flex-col gap-3 bg-white rounded-md py-5 px-4 hover:cursor-pointer duration-200 hover:shadow-md border border-slate-200 justify-between'>
                <div className='flex justify-center'>
                    <Image className='size-20 rounded-full object-cover border-2 border-[#077]' src={userImg} alt="userimg" />
                </div>
                <div className='flex flex-col gap-2 text-center'>
                    <h3 className='text-lg font-semibold text-gray-800'>{user.first_name} {user.last_name}</h3>
                <p className='text-gray-600 text-sm'>{user.gender}</p>
                <div className='flex flex-col gap-1'>
                    <button onClick={() => handleDelete(user.id)} className='bg-slate-600 text-white cursor-pointer px-2 py-1 rounded-md'>delete</button>
                <button onClick={() => handleUpdate(user)} className='bg-slate-600 text-white cursor-pointer px-2 py-1 rounded-md'>update</button>
                </div>
                </div>
            </div>
        ))
      }
    </div>
  );
};

export default memo(UsersView);