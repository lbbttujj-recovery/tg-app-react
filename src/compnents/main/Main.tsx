import React from "react";
import styles from './Main.module.less'
export const Main = () => {
    return (
        <div className={styles.main}>
            <h4>Какое настроение сейчас?</h4>
            <p>222</p>
            <div>
                <button>Выбрать</button>
            </div>
        </div>
    )
}