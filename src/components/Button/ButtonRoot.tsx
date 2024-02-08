import { screenProps } from "@/app/page";
import { ComponentProps, MouseEventHandler } from "react"

interface ButtonRootProps extends ComponentProps<'button'>{
  className?: string 
  onScreen: screenProps
  setNumber: React.Dispatch<React.SetStateAction<screenProps>>
}
export function ButtonRoot({className, onScreen, setNumber, ...props}: ButtonRootProps) {

  const handleClick = (event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const children =  event.currentTarget.children[0];
    const label = children.ariaLabel || 'default'

    const actionsMap = {
      number: () => {
        const {value} = onScreen;
        const newValue= `${value.startsWith('0') ? '' : value}${children.innerHTML}`
        setNumber({...onScreen, value:newValue })
      },
      function: () =>{
        const functionActionMap ={
          ce: ()=> setNumber({...onScreen,value:'0',result:'0',bracketClose:'',bracketCount:undefined}),
          c:()=> setNumber({...onScreen,value:'0',bracketClose:'',bracketCount:undefined}),
          delete:()=> {
            const {value, bracketCount, bracketClose} = onScreen
            const newValue = value.length === 1 ? '0' : value.slice(0, -1)
            if(value.endsWith('(')){
              console.log('ends')
              const newbracketCount = bracketCount! - 1;
              const newbracketClose = bracketClose.slice(0, -1)
              setNumber({...onScreen,value:newValue, bracketCount:newbracketCount, bracketClose: newbracketClose})
          } else  setNumber({...onScreen,value:newValue})
          },
          change:()=> setNumber({...onScreen,negative:!onScreen.negative}),
          '(':()=>{
            const {value, bracketCount, bracketClose} = onScreen;
            const newValue= `${value.startsWith('0') ? '' : value}(`
            const newBracketClose = `${bracketClose})`
            setNumber({...onScreen,value:newValue,bracketCount:bracketCount ? bracketCount +1 : 1, bracketClose:newBracketClose})
          },
          ')':()=>{},
        }
        const action = children.getAttribute('data-action') as keyof typeof functionActionMap

        functionActionMap[action]()

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