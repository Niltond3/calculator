interface NumberProps {
  number: ','|0|1|2|3|4|5|6|7|8|9
}

export function ButtonNumber({number}:NumberProps){
  
  //setNumber(onScreen+number)
  return <span aria-label="number" >{number}</span>
}