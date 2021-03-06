import React, {useEffect, useState} from 'react';
import styles from "./index.module.scss";
import TextInput from '../../components/TextInput'
import parseContent from '../../parse'
import {RecordItem} from '../../parse/type'
import BookMenu from '../../components/BookMenu'
import BookClippings from '../../components/BookClippings'
import Store from '../../store'
import {getItemTitle, backToTop} from '../../utils'
import SelectLang from '../../components/SelectLang'
import BackToTop from '../../components/BackToTop'
import Github from '../../components/GIthub'
let interval: any;
const HomePage: React.FunctionComponent = () => {
    const {language} = Store.useContainer()
    const [contentList, setContentList] = useState<RecordItem[]>([])
    const [menuList, setMenuList] = useState<string[]>([])
    const [currentMenu, setCurrentMenu] = useState<string>('')
    const [bookData, setBookData] = useState<RecordItem[]>([])


    useEffect(() => {
        const temp: RecordItem[] = contentList.filter(v => {
            const key: string = getItemTitle(v)
            return key && key === currentMenu
        })
        setBookData(temp)
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [contentList, currentMenu])

    function handleContentChange(data: string) {
        const result: RecordItem[] = parseContent(data, language)
        const temp: string[] = []
        result.forEach((item: RecordItem) => {
            const key: string = getItemTitle(item)
            if (!temp.includes(key)) {
                temp.push(key)
            }
        })
        setContentList(result)
        setMenuList(temp)
        setCurrentMenu(temp[0])
    }

    function handleMenuChange(item: string) {
        interval = backToTop()
        setCurrentMenu(item)
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Github link="https://github.com/nusr/my-clippings"/>
                <div className={styles.header}>
                    <TextInput onChange={handleContentChange}/>
                    <SelectLang className={styles.lang}/>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.bookMenu}>
                    <BookMenu menuList={menuList} onChange={handleMenuChange} value={currentMenu}/>
                </div>
                <div className={styles.bookClippings}>
                    <BookClippings data={bookData}/>
                    <BackToTop/>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
