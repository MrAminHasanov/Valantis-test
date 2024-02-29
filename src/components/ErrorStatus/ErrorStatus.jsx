import c from './ErrorStatus.module.scss'
import { ReactComponent as ErrorIcon } from "../../img/warning.svg"

function ErrorStatus({ errorMesage }) {

    return (
        <div className={c.component}>
            <ErrorIcon width="70px" height="70px" fill='rgb(225, 38, 38)' />
            <span className={c.errorMesage}>{errorMesage}</span>
        </div>
    )
}

export default ErrorStatus