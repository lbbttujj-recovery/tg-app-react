import React from "react";
import styles from './Main.module.less'
export const Main = () => {
    const tg = window.Telegram.WebApp
    return (
        <div className={styles.main}>
            <h4>Какое настроение сейчас?</h4>
            <p>222</p>
            <div>
                <button onClick={() => tg.close()}>Выбрать</button>
            </div>
        </div>
    )
}