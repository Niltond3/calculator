import { ComponentProps } from "react"

interface ButtonRootProps extends ComponentProps<'button'>{
  className?: string  
}
export function ButtonRoot({className, ...props}: ButtonRootProps) {
  return (
    <button className={`${className} m-2 h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-800 transition active:bg-gray-900 active:border-2 border-gray-700`} {...props}/>
  )
}