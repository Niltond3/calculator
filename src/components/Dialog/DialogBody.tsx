import { useRouter, useSearchParams} from "next/navigation"
import { useEffect, useRef } from "react"
import Image from "next/image";
import Util from "../Util";

export default function DialogBody({children, showBackdrop=false}:{children?: React.ReactNode, showBackdrop?:boolean}) {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)
  const showDialog = searchParams.get('showDialog')
  const router = useRouter()
  const util = Util()
  const handleClick = () => util.ReplaceRout('showDialog', 'n')

  useEffect(()=>{
    showDialog === 'y' ? dialogRef.current?.show() : dialogRef.current?.close()
  },[showDialog])


  const onClose = () =>  {
    util.ReplaceRout('showDialog', 'n')
    dialogRef.current?.close()
  }
  const onClean = () =>  {
    router.replace('?showDialog=y')
  }
  const results = searchParams.getAll('result')

  const calculationsAndResults = searchParams.getAll('calc').map((value, index)=>{
    return {
      calc: value, 
      result: results[index]
    }
  })
  
console.log(calculationsAndResults)
  const dialog: JSX.Element | null = showDialog === 'y' ? (
      <dialog ref={dialogRef} className="w-[20%] transition-all z-20 justify-center flex bg-slate-700 rounded-2xl flex-col p-2 drop-shadow-[0_4px_5px_rgba(255,255,255,0.25)]">
          <div className="flex justify-between p-2">
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
            <button onClick={onClean}>
                <Image
                  src="/trash.svg"
                  alt="trash icon"
                  className="dark:invert opacity-20 hover:opacity-60 transition h-auto"
                  width={16}
                  height={24}
                  priority
                />
            </button>
          </div>
          <div className='flex flex-col p-2 text-gray-300 gap-3'>
            {calculationsAndResults.length > 0 ? calculationsAndResults.map((value, index)=>{
              return (
                <div key={`${index}-calculationsAndResults`} className="flex items-center gap-1" >
                  <span className="border-gray-300 border rounded-md p-1 px-3 ">{value.calc}</span>
                  <span className="">=</span>
                  <span className="border-gray-300 border rounded-md p-1 px-3 ">{value.result}</span>
                </div>
              )
            }) : <span className="">Seus cálculos e resultados serão exibidos aqui</span>}
            {children}
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
