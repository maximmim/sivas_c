


const GMene = ({op,text,style}) => {


    return (
        <button onClick={op} id={style} className={style}>{text}</button>
    )

}



export default GMene