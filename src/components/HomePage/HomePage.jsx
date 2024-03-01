import c from './HomePage.module.scss'

import SearchBar from './SearchBar/SearchBar'
import Navigator from './Navigator/Navigator'
import Products from './Products/Products'
import Background from './Background/Background'

function HomePage() {
    return (
        <div className={c.component}>
            <Background />
            <SearchBar />
            <Products />
            <Navigator />
        </div>
    )
}

export default HomePage