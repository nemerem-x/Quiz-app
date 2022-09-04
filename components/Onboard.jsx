export default function Onboard(props){
    return (
        <div className="onboard">
            <div className="app">
                <h1>Quizzical</h1>
                <p>Are you ready to test your knowledge?</p>
                <button
                    onClick={props.handleClick}
                    className='start-quiz'>Start quiz</button>
            </div>
        </div>
    )
}