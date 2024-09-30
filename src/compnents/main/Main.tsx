import React, {useEffect} from "react";
import styles from './Main.module.less'
import {useTelegram} from "../../hooks/useTelegram";
export const Main = () => {
    const {ready, onClose, onToggleMainButton, user} = useTelegram()

    return (
        <div className={styles.main}>
            <h4 onClick={onToggleMainButton}>{`Как настроение сейчас, ${user}?`}</h4>
            <p>222</p>
        </div>
    )
}