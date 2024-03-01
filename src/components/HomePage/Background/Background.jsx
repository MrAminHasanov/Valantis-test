import c from "./Background.module.scss"

function Background() {
    return (
        <div className={c.component}>
            <div className={c.whiteBall_1}></div>
            <div className={c.whiteBall_2}></div>
        </div>
    )
}

export default Background