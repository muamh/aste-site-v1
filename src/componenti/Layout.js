import { Outlet } from "react-router-dom";

import React from 'react'

const layout = () => {
  return (
    <main>
        <Outlet/>
    </main>
  )
}

export default layout