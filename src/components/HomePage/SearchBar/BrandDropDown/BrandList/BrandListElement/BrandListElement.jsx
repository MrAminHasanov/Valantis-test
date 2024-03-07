import { memo } from 'react'
import c from './BrandListElement.module.scss'

const BrandListElement = memo(
    function BrandListElement({ brand, brandElementHandleClick }) {
        const buttonContent =
            brand === ""
                ? "All"
                : brand || "Not branded"

        return (
            <li className={c.component}>
                <button type="button" onClick={() => brandElementHandleClick(brand)}>
                    {buttonContent}
                </button>
            </li>
        )
    }
)

export default BrandListElement