import c from "./Loader.module.scss"

function Loader({ loadingMessage }) {

    return (
        <div className={c.component}>
            <span className={c.loader}> </span>
            <span className={c.loadingMessage}>{loadingMessage}</span>
        </div>
    )
}

export default Loader