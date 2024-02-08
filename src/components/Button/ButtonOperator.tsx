interface OperatorProps {
  children:React.ReactNode
}

export function ButtonOperator({children}:OperatorProps){
  return <span aria-label="operator" data-action={children} className="flex items-center justify-center">{children}</span>
}