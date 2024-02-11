import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

export default function Util() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return {
    ReplaceRout: (name: string, value: string) => router.replace(pathName + '?' + createQueryString(name, value))
  }

}
