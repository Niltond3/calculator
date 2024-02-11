"use client"
import React from 'react'
import Util from "../Util"

export default function DialogTrigger({children}:{children?: React.ReactNode}) {
  const util = Util()

  const handleClick = () => util.ReplaceRout('showDialog', 'y')

  return <button onClick={handleClick}>{children}</button>
}
