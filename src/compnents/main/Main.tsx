import React from "react";
import styles from './Main.module.less'
import {useTelegram} from "../../hooks/useTelegram";
import {Pie} from "../pie/Pie";
export const Main = () => {

    const {onToggleMainButton, user} = useTelegram()

    return (
        <div>
            <h4 className={styles.title} onClick={onToggleMainButton}>{`Как настроение сейчас, ${user}?`}</h4>
            <div className={styles.main}>
                <Pie/>
            </div>
        </div>
    )
}