
import './Layout.scss'
export const Layout = (props: any) => {
  return (
    <div  className='layout'>
      {props.children}
    </div>
  )
}