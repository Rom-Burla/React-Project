interface Props{
    text:string
}

function Title({text}:Props){
    const storedMode = localStorage.getItem('mode')
    const titleColor = storedMode==='dark'?'text-info':''
    return(
        <h1 className={titleColor + " text-center mt-4 fw-bolder"}>
            {text}
        </h1>
    )
}

export default Title