import "./Container.css"

function Container(props) {
  return (
    <div className='body'>
      {props.children}
    </div>
  )
}

export default Container;
