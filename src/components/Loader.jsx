import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Head from "next/head";

export default function Loader(props) {
    const { height = '100vh', width = "100%", message } = props
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: height, alignItems: 'center', justifyContent: 'center' }}>
            <Head>
                <title>Loading...</title>
            </Head>

            <ThreeDots
                height={'20'}
                width={width}
                radius='6'
                color="#56B0E3"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
            <div style={{marginTop:"8px",color:"#56B0E3"}}>{message && message}</div>
        </div>
    )
}