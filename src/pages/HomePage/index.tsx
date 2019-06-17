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
    }, [contentList, currentMenu])

    function handleContentChange(data: string) {
        const result: RecordItem[] = parseContent(data, language)
        const temp: string[] = []
        result.forEach((item: RecordItem) => {
            const key: string = getItemTitle(item)
            if (temp && !temp.includes(key)) {
                temp.push(key)
            }
        })
        setContentList(result)
        setMenuList(temp)
        setCurrentMenu(temp[0])
    }

    function handleMenuChange(item: string) {
        backToTop()
        setCurrentMenu(item)
    }

    // const checkContent = _.isEmpty(contentList)
    const Content = () => (
        <div className={styles.content}>
            <div className={styles.bookMenu}>
                <BookMenu menuList={menuList} onChange={handleMenuChange} value={currentMenu}/>
            </div>
            <div className={styles.bookClippings}>
                <BookClippings data={bookData}/>
            </div>
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <TextInput onChange={handleContentChange}/>
                <SelectLang className={styles.lang}/>
            </div>
            <Content/>

        </div>
    );
}

export default HomePage;
