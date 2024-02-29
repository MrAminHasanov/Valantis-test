import SearchBar from './SearchBar/SearchBar'
import c from './HomePage.module.scss'
import Navigator from './Navigator/Navigator'
import Products from './Products/Products'

function HomePage() {
    return (
        <div className={c.component}>
            <SearchBar />
            <Products />
            <Navigator />
        </div>
    )
}

export default HomePage