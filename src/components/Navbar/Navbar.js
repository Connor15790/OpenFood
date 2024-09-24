import React from 'react'
import styles from "./Navbar.module.css"

const Navbar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className={styles.container}>
            <div className={styles.logoandname}>
                <img src="/assets/off.png" height="100px" alt="logo" />
            </div>

            <div className={styles.searchcontainer}>
                <form className={styles.searchbar}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchinput}
                    />
                </form>
            </div>
        </div>
    )
}

export default Navbar