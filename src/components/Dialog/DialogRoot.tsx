"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function Dialog () {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)
  const showDialog = searchParams.get('showDialog')
  const router = useRouter()

  useEffect(()=>{
    showDialog === 'y' ? dialogRef.current?.show() : dialogRef.current?.close()
  },[showDialog])

  const onClose = () =>  {
    router.back()
    dialogRef.current?.close()
  }


  const onOK = () =>  {
    
  }

  const dialog: JSX.Element | null = showDialog === 'y' ? (
    <dialog ref={dialogRef}>
      DIALOG
      <button onClick={onOK}>
        click
      </button>
      <button onClick={onClose}>
        close
      </button>
    </dialog>
  ) : null

  return dialog
}