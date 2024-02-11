"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React from 'react'

export default function DialogTrigger({children}:{children?: React.ReactNode}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const params = searchParams.toString()
  const oldSearchParams = params ? '?'+params+'&' : '?'

  const handleClick = () => router.push(`${oldSearchParams}showDialog=y`)
  return <button onClick={handleClick}>{children}</button>
}
