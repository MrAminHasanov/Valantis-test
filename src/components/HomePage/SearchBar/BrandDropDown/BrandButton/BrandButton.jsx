import c from './BrandButton.module.scss'

function BrandButton({ buttonContent, brandElementHandleClick }) {
    return (
        <li className={c.component}>
            <button type="button" onClick={() => brandElementHandleClick("")}>
                {buttonContent}
            </button>
        </li>
    )
}

export default BrandButton