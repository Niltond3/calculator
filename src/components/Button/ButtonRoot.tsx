import { ComponentProps, MouseEventHandler } from "react"

interface ButtonRootProps extends ComponentProps<'button'>{
  className?: string 
  onScreen: string
  setNumber: React.Dispatch<React.SetStateAction<string>>
}
export function ButtonRoot({className, onScreen, setNumber, ...props}: ButtonRootProps) {

  const handleClick = (event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const children =  event.currentTarget.children[0];
    const label = children.ariaLabel ? event.currentTarget.children[0].ariaLabel : 'default'

    const actionsMap = {
      number: () => {
        setNumber(`${onScreen.startsWith('0') ? '' : onScreen}${children.innerHTML}`)
      },
      default: () => console.log('not map yet')
    }

   
    
    const action = label as keyof typeof actionsMap

    actionsMap[action]()
  }
  return (
    <button onClick={handleClick} className={`${className} m-2 h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-800 transition active:bg-gray-900 active:border-2 border-gray-700`} {...props}/>
  )
}