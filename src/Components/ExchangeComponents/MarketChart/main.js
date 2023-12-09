// // Datafeed implementation, will be added later
// import Datafeed from './datafeed.js';
// function getCookie(name) {
// 	const value = `; ${document.cookie}`;
// 	const parts = value.split(`; ${name}=`);
// 	//console.log("parts=>",parts);
// 	if (parts.length === 2) return parts.pop().split(';').shift();
// }
// var prest="";

// var mytheme=getCookie('the_cookie');
// console.log("mytheme",mytheme)
// $(document).ready(function(){
// 	window.tvWidget = new TradingView.widget({
// 		debug: false,
// 		symbol: mysymbol,
// 		interval: '1D', // default interval
// 		container_id: 'tv_chart_container',
// 		datafeed: Datafeed,
// 		width:1000,
// 		height: 530,
// 		timezone: "Asia/Kolkata",
// 		library_path: 'https://btrlexchange.com/tv/charting_library_clonned_data/charting_library/',
// 		/* disabled_features: ['use_localstorage_for_settings', "timeframes_toolbar",
// 			"volume_force_overlay", "left_toolbar", "show_logo_on_all_charts",
// 			"caption_buttons_text_if_possible", "header_settings", "header_chart_type",
// 			"header_indicators", "header_compare", "compare_symbol", "header_screenshot",
// 			"header_widget_dom_node", "header_saveload", "header_undo_redo",
// 			"header_interval_dialog_button", "show_interval_dialog_on_key_press",
// 			"header_symbol_search", "header_resolutions", "header_widget"], */
// 		preset:prest,	
// 		disabled_features: ['use_localstorage_for_settings', 
// 			"header_chart_type",//"header_indicators", 
			
// 			"header_symbol_search", "timeframes_toolbar","go_to_date"],
// 		Enabled_features: ["study_templates", "dont_show_boolean_study_arguments", "hide_last_na_study_output"],
// 		overrides: {
// 			//"mainSeriesProperties.style": 8,
// 		},
// 		"studies": [
// 				"Volume@tv-basicstudies"
// 			  ],
// 	});
// });

