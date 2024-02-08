import { screenProps } from "@/app/page";
import { ComponentProps } from "react"
import {
evaluate
} from 'mathjs'

interface ButtonRootProps extends ComponentProps<'button'>{
  className?: string 
  onScreen: screenProps
  setNumber: React.Dispatch<React.SetStateAction<screenProps>>
}
export function ButtonRoot({className, onScreen, setNumber, ...props}: ButtonRootProps) {

  const handleClick = (event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const children =  event.currentTarget.children[0];

    const actionsMap = {
      number: () => {
        const {value} = onScreen;
        const newValue= `${value.startsWith('0') ? '' : value}${children.innerHTML}`
        setNumber({...onScreen, value:newValue })
      },
      function: () =>{
        const functionActionMap ={
          ce: ()=> setNumber({...onScreen,value:'0',result:'',bracketClose:''}),
          c:()=> setNumber({...onScreen,value:'0',bracketClose:''}),
          delete:()=> {
            const {value, bracketClose} = onScreen
            const newValue = value.length === 1 ? '0' : value.endsWith(' ') ? value.slice(0, -3) : value.slice(0, -1)

            if(value.endsWith('(')){
              const newbracketClose = bracketClose.slice(0, -1)
              setNumber({...onScreen,value:newValue, bracketClose: newbracketClose})
              return
            }
            setNumber({...onScreen,value:newValue})
          },
          change:()=> {
            const {value} = onScreen;
            if(!value.startsWith('0')) setNumber({...onScreen,negative:!onScreen.negative})
          },
          '(':()=>{
            const {value, bracketClose} = onScreen;
            const newValue= `${value.startsWith('0') ? '' : value}(`
            setNumber({...onScreen,value:newValue, bracketClose:`${bracketClose})`})
          },
          ')':()=>{
            const {value, bracketClose} = onScreen
            if (bracketClose !== ''){
              setNumber({...onScreen,value: value+')',bracketClose: bracketClose.slice(0, -1)})
            }
          },
        }
        const action = children.getAttribute('data-action') as keyof typeof functionActionMap

        functionActionMap[action]()

      },
      operator: () => {
        const actionsMap = {
          default : () => {
            const {value} = onScreen;
            const newValue= `${value.startsWith('0') ? '' : value} ${children.innerHTML} `
            setNumber({...onScreen, value:newValue })
          }, 
          '=' : () => {
            const {value,bracketClose} = onScreen;
            setNumber({...onScreen,result:evaluate(value+bracketClose)})
          }, 
        }
        const action = children.innerHTML === '=' ? '=' : 'default'
        console.log(action)
        actionsMap[action]()
      },
    }

   
    
    const action = children.ariaLabel as keyof typeof actionsMap

    actionsMap[action]()
  }
  return (
    <button onClick={handleClick} className={`${className} m-2 h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-800 transition active:bg-gray-900 active:border-2 border-gray-700`} {...props}/>
  )
}