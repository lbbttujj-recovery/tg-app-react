import React from "react";
import styles from './Main.module.less'
import {useTelegram} from "../../hooks/useTelegram";
import {Pie} from "../pie/Pie";
export const Main = () => {
    const {onToggleMainButton, user} = useTelegram()

    return (
        <div className={styles.main}>
            <h4 onClick={onToggleMainButton}>{`Как настроение сейчас, ${user}?`}</h4>
            <Pie/>
        </div>
    )
}