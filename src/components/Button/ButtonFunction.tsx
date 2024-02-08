interface ButtonFunctionProps {
  children:React.ReactNode
  action: 'ce'|'c'|'delete'|'change'|"("|")"
}

export function ButtonFunction({children, action}:ButtonFunctionProps){
  return <span aria-label="function" data-action={action} className="flex items-center justify-center">{children}</span>
}