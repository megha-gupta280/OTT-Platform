import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useMemo } from "react";
import { Card } from 'antd';
import styles from "./Home.module.scss";
import { Layout } from 'antd';
import logo from "../assets/tvm-header-logo.png"
import { Input } from 'antd';
import { useCallback } from "react";
import Detail from "./Detail"
import { connect } from "react-redux";
import { showId } from "./store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { getId } from "./store/selector";

const { Search } = Input;

const { Header, Content } = Layout;

const Home = ({ setId, ID }) => {

    const location = useLocation();
    const [show, setShows] = useState([])
    const [showData, setShowData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (ID === undefined) {
            setShowData(undefined)
        }
    }, [ID, setShowData])

    useEffect(() => {
        const getUsers = async () => {
            const users = await axios.get('https://api.tvmaze.com/shows');
            setShows(users.data);
        };
        getUsers();
    }, [setShows])

    const allGeneres = useMemo(() => {
        return Array.from(new Set(show.map((show) => {
            return show?.genres
        }).flat()))
    }, [show])

    const showsPerGenere = Object.fromEntries(allGeneres.reduce((acc, genre) => {
        const showsInGenre = show.filter((show) => {
            return show.genres.includes(genre)
        })
        acc.set(genre, showsInGenre)
        return acc
    }, new Map()))


    useEffect(() => {
        if (location.pathname === "/shows") {
            setId({ id: undefined })
        }
    }, [setId, location])

    const onSearch = useCallback((event) => {
        if (!event.target.value) {
            const getUsers = async () => {
                const users = await axios.get('https://api.tvmaze.com/shows');
                setShows(users.data);
            };
            getUsers();
        } else {
            const getUsers = async () => {
                const users = await axios.get(`https://api.tvmaze.com/search/shows?q=${event.target.value}`);
                const searchedShows = users.data.map((user) => {
                    return user.show
                })
                setShows(searchedShows);
            };
            getUsers()
        }
    }, [setShows])

    const getDetail = useCallback((id) => {
        setId({ id: id })
        const getUsers = async () => {
            const users = await axios.get(`https://api.tvmaze.com/shows/${id}`);
            setShowData(users.data)
        };
        getUsers()
        let path = `${id}`;
        navigate(path);
    }, [setShowData, setId, navigate])

    if (!show) {
        return <div>Loading...</div>
    }

    const showKeys = Object.keys(showsPerGenere)

    return <>
        <Layout>
            <Header className={styles.header}><img alt="" src={logo} />
                <Search placeholder="search show" onChange={onSearch} style={{ width: 200 }} />
            </Header>
            <Content>{showData ? <Detail data={showData} /> : <div className={styles.home}>{showKeys.map((key) => {
                return <div>
                    <div className={styles.category}>{key}</div>
                    <div className={styles.scroller}>{showsPerGenere[key].map((show) => {
                        return (<div onClick={() => getDetail(show.id)}>
                            <Card className={styles.cardBody}
                                cover={<img alt="" src={show?.image?.original ?? undefined} />} hoverable />
                        </div>)
                    })}</div>
                </div>
            })}
            </div>}
            </Content></Layout></>
}

const mapStateToProps = (state) => ({
    ID: getId(state),
});

const mapDispatchToProps = {
    setId: showId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)