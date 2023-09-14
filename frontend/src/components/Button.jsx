import '../index.css'

const Button = (props) => {


    return (
        <button
            type={props.type || 'button'}
            onClick={props.onclick}
            className={props.className}
            disabled={props.isDisabled||false}
        >
            <div className='btn-manage'>
                <div><span>{props.text}</span></div>
                <div>
                    <span>{<props.icon></props.icon>}</span>
                </div>
            </div>
        </button>
    );

}

export default Button;