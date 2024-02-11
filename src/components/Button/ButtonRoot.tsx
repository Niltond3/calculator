import { screenProps } from "@/app/page";
import { ComponentProps } from "react"
import {
evaluate
} from 'mathjs'
import { useSearchParams,useRouter, ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ButtonRootProps extends ComponentProps<'button'>{
  className?: string 
  onScreen: screenProps
  setNumber: React.Dispatch<React.SetStateAction<screenProps>>
}

export const onNumberPress = (setNumber: React.Dispatch<React.SetStateAction<screenProps>>, onScreen: screenProps, number: string) => {
  const {calc,lastCalc} = onScreen;
  const newValue= `${calc.startsWith('0') || lastCalc !== '' ? '' : calc}${number}`
  setNumber({...onScreen, calc:newValue, lastCalc:'' })
}

export const onDeletPress = (setNumber: React.Dispatch<React.SetStateAction<screenProps>>, onScreen: screenProps) => {
  const {calc, bracketClose} = onScreen
  const newValue = calc.length === 1 ? '0' : calc.endsWith(' ') ? calc.slice(0, -3) : calc.slice(0, -1)

  if(calc.endsWith('(')){
    const newbracketClose = bracketClose.slice(0, -1)
    setNumber({...onScreen,calc:newValue, bracketClose: newbracketClose})
    return
  }
  setNumber({...onScreen,calc:newValue})
}

export const onEqualPress = (setNumber: React.Dispatch<React.SetStateAction<screenProps>>, onScreen: screenProps, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  const {calc,bracketClose} = onScreen;

  const lastCalc = calc+bracketClose
  const result = `${evaluate(lastCalc)}`
  const params = searchParams.toString()
  const oldSearchParams = params ? '?'+params+'&' : '?'
  const uriCalc = encodeURIComponent(lastCalc.replaceAll(/\s/g,''))
  const uriResult = encodeURIComponent(result)
  const routerHistory = `${oldSearchParams}calc=${uriCalc}&result=${uriResult}`

  if (calc != '0') {
  router.push(routerHistory)
  setNumber({...onScreen,lastCalc:lastCalc, calc: result,bracketClose:''})
  }
}

export const onBracketOpenPress = (setNumber: React.Dispatch<React.SetStateAction<screenProps>>, onScreen: screenProps) => {
  const {calc, bracketClose} = onScreen;
  const newValue= `${calc.startsWith('0') ? '' : calc}(`
  setNumber({...onScreen,calc:newValue, bracketClose:`${bracketClose})`})
}

export const onBracketClosePress = (setNumber: React.Dispatch<React.SetStateAction<screenProps>>, onScreen: screenProps) => {
  const {calc, bracketClose} = onScreen
  if (bracketClose !== ''){
    setNumber({...onScreen,calc: calc+')',bracketClose: bracketClose.slice(0, -1)})
  }
}

export function ButtonRoot({className, onScreen, setNumber, ...props}: ButtonRootProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (event:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const children =  event.currentTarget.children[0];

    const actionsMap = {
      number: () => onNumberPress(setNumber, onScreen, children.innerHTML),
      function: () =>{
        const functionActionMap ={
          ce: ()=> setNumber({...onScreen,calc:'0',lastCalc:'',bracketClose:''}),
          c:()=> setNumber({...onScreen,calc:'0',bracketClose:''}),
          delete:()=> onDeletPress(setNumber, onScreen),
          change:()=> {
            const {calc} = onScreen;
            if(!calc.startsWith('0')) setNumber({...onScreen,negative:!onScreen.negative})
          },
          '(':()=>onBracketOpenPress(setNumber, onScreen),
          ')':()=>onBracketClosePress(setNumber, onScreen),
        }
        const action = children.getAttribute('data-action') as keyof typeof functionActionMap

        functionActionMap[action]()

      },
      operator: () => {
        const actionsMap = {
          default : () => onNumberPress(setNumber, onScreen, ` ${children.innerHTML} `), 
          '=' : () => onEqualPress(setNumber, onScreen, searchParams, router), 
        }
        const action = children.innerHTML === '=' ? '=' : 'default'
        actionsMap[action]()
      },
    }

   
    
    const action = children.ariaLabel as keyof typeof actionsMap

    actionsMap[action]()
  }

  return (
    <button onClick={handleClick}  className={`${className} m-2 h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-800 transition active:bg-gray-900 active:border-2 border-gray-700`} {...props}/>
  )
}