"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import Image from "next/image";

export default function DialogBody({children, showBackdrop=false}:{children?: React.ReactNode, showBackdrop?:boolean}) {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)
  const showDialog = searchParams.get('showDialog')
  const router = useRouter()
  const handleClick = () => router.back()

  useEffect(()=>{
    showDialog === 'y' ? dialogRef.current?.show() : dialogRef.current?.close()
  },[showDialog])

  const onClose = () =>  {
    router.back()
    dialogRef.current?.close()
  }

  const dialog: JSX.Element | null = showDialog === 'y' ? (
      <dialog ref={dialogRef} className="transition-all z-20 justify-center flex bg-slate-700 rounded-2xl flex-col left-28 p-2 drop-shadow-[0_4px_5px_rgba(255,255,255,0.25)]">
          <div>
            <button onClick={onClose} >
            <Image
                  src="/history.svg"
                  alt="history icon"
                  className="dark:invert opacity-20 hover:opacity-60 transition h-auto"
                  width={16}
                  height={24}
                  priority
                />
            </button>
          </div>
          <div>
            {children}
            <span className="text-gray-300">Seus cálculos e resultados serão exibidos aqui</span>
          </div>
      </dialog>
  ) : null

  return (
    <>
    {dialog}
    {showBackdrop && dialog && <div className="z-10 absolute top-0 left-0 w-full h-full backdrop-blur-[1px] bg-black/10" onClick={handleClick}/>}
    </>
  )
}
