const GMene = ({op,text,styles}) => {


    return (
        <button onClick={op} id={styles} className={styles}>{text}</button>
    )

}



export default GMene