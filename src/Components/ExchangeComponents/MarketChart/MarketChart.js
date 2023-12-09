import React,{useEffect, useRef} from 'react';
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { widget } from '../../../charting_library_rename/charting_library.esm.js';
import Datafeed from './datafeed';
// import { TVChartContainer } from '../../tv-chart-container';
import MiniMarket from '../MiniMarket/MiniMarket';
import styles from './MarketChart.module.scss';

const MarketChart = ({miniData  , dmode , popup , setPopup}) => {

const [currency , market ] = ["BTRL" , 'INR']

const tvChartRef = useRef(null);

 useEffect(() => {
      //const newChosenExc =(chosenExchange==='binance'?'Binance':(chosenExchange.toLowerCase() === 'binanceusdm' ?'FBinance':(chosenExchange.toLowerCase() ==='testnet-binance'?'TBinance':'TFBinance')))
     // const newChosenExc =(chosenExchange==='binance'?'Binance':(chosenExchange.toLowerCase() === 'binanceusdm' ?'FBinance':(chosenExchange.toLowerCase() ==='testnet-binance'?'TBinance':'TFBinance')))
      //let newChosenExc = (chosenExchange==='binance'?'Binance': 'Binance')

      function getLanguageFromURL() {
        const regex = new RegExp('[\\?&]lang=([^&#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
     
      
      const widgetOptions = {
      
       symbol: `BTRLExchange:${currency}/${market}`, // dynamic 
      
        datafeed: Datafeed,
        interval: 'D',
        container: tvChartRef.current,
        library_path: '/charting_library/', 
        locale: getLanguageFromURL() || 'en',
        disabled_features: [], //'use_localstorage_for_settings'
        enabled_features: ['study_templates'],
        charts_storage_url: '',
        // charts_storage_url: 'http://traderpro.com/api/v1/user1',
        charts_storage_api_version: '1.1',
        saved_data_meta_info:true,
        //saved_data: true,
        auto_save_delay: 5,
        load_last_chart: true,
        client_id: 'BTRLexchange',
        user_id: "email",
       // chart_id: new Date().getTime(),
        fullscreen: false,
        autosize: true,
        studies_overrides: {},
        settings_adapter: {
          initialSettings: {  function(){  }},
          setValue: function(key, value) {  },
          removeValue: function(key) {  },
      },
      };
      
      const tvWidget = new widget(widgetOptions);
      tvWidget.onChartReady(() => {
        tvWidget.headerReady().then(() => {
        });
      });
    }, [market , currency, Datafeed]);
  return (
    <section className={dmode ? styles.marketchart_d : styles.marketchart_l }>
    <MiniMarket  miniData={miniData} dmode={dmode} popup={popup} setPopup={setPopup} />
    <div ref={ tvChartRef } id="chartArea" className={styles.chart}>
    {/* <TVChartContainer /> */}
    {/* <TradingViewWidget
    symbol="BINANCE:BTCUSDT"
    theme={dmode ? Themes.DARK : Themes.LIGHT}
    locale="in"
    autosize
  /> */}
    </div>
    </section>
  )
}

export default MarketChart