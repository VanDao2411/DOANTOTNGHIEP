import React from 'react'
import { Headers, Footers, FloatMenu } from '../../Components'
import { Outlet } from 'react-router-dom'

const Public = () => {
  return (
    <div>
      <Headers />
      <div className=" p-[50px] pl-[80px] pr-[80px]">
        <Outlet />
      </div>
      <div className="">
        <FloatMenu />
      </div>
      <div className="">
        <Footers />

      </div>
    </div>
  )
}

export default Public