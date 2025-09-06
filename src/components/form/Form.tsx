'use client'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FC, memo, useEffect, useState } from "react"
import { IUser } from "../users-view/UsersView"
interface Props{
  editingUser: IUser | null;
  setEditingUser: (user: IUser | null) => void;
  refreshUsers: () => void;
}

const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().required(),
    
  })
  .required()


const Form:FC<Props>  = ({ editingUser, setEditingUser, refreshUsers }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    if (editingUser) {
      setValue("first_name", editingUser.first_name)
      setValue("last_name", editingUser.last_name)
      setValue("address", editingUser.address)
      setValue("gender", editingUser.gender)
    } else {
      reset()
    }
  }, [editingUser, setValue, reset])

  const onSubmit = async(data:any) => {
  if (editingUser) {
      await fetch(`https://689cc5cece755fe69786fba7.mockapi.io/user/${editingUser.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setEditingUser(null)
    } else {
      await fetch('https://689cc5cece755fe69786fba7.mockapi.io/user',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    }
    reset()      
    refreshUsers()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-[500px] bg-white mx-auto  py-5 px-4 rounded-[10px] shadow-md mt-5'>
        <div className="w-full flex flex-col">
      <input {...register("first_name")}  className={`py-[8px] indent-3 focus:border-blue-500 border-[1px] outline-none shadow-md text-[18px] rounded-[5px] ${ errors?.first_name ? 'border-red-500' : 'border-slate-300' }`} placeholder="first name"/>
      {errors?.first_name && <p className="text-red-500">{errors.first_name?.message}</p>}
        </div>

            <div className="w-full flex flex-col">
      <input {...register("last_name")}  className={`py-[8px] indent-3 focus:border-blue-500 border-[1px] outline-none shadow-md text-[18px] rounded-[5px] ${ errors?.last_name ? 'border-red-500' : 'border-slate-300' }`} placeholder="last name"/>
      {errors?.last_name && <p className="text-red-500">{errors.last_name?.message}</p>}
            </div>
            <div className="w-full flex flex-col">
      <input {...register("address")}  className={`py-[8px] indent-3 focus:border-blue-500 border-[1px] outline-none shadow-md text-[18px] rounded-[5px] ${ errors?.address ? 'border-red-500' : 'border-slate-300' }`} placeholder="address"/>
      {errors?.address && <p className="text-red-500">{errors.address?.message}</p>}
            </div>
            <div className="w-full flex flex-col">
      <input {...register("gender")}  className={`py-[8px] indent-3 focus:border-blue-500 border-[1px] outline-none shadow-md text-[18px] rounded-[5px] ${ errors?.gender ? 'border-red-500' : 'border-slate-300' }`} placeholder="gender"/>
      {errors?.gender && <p className="text-red-500">{errors.gender?.message}</p>}
            </div>


      <input type="submit" />
    </form>
  )
}

export default memo(Form)