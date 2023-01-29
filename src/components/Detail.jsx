import styles from "./Detail.module.scss";
import { Rate } from 'antd';
import { htmlToText } from "html-to-text"

const Detail = ({ data }) => {

    const summary = htmlToText(data?.summary, {
        wordwrap: 130
    });

    return <div className={styles.container}>
        <div><img alt="" className={styles.img} src={data.image?.original} /></div>
        <div className={styles.data}>
            <div className={styles.title}>
                <div><h1>{data.name}</h1>
                    <h2>Premiered: {data.premiered}</h2></div>
                <Rate allowHalf defaultValue={((data.rating.average) / 2)} />
            </div>
            <p>{summary}</p>
        </div>
    </div>
}

export default Detail