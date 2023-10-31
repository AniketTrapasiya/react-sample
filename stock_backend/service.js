const axios = require("axios");
// const { logger } = require("./utils");
const moment = require("moment");

async function data(req, res) {
    console.log(req.body)
    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/${req.body.SYMB}?region=US&lang=en-US&includePrePost=false&interval=${req.body.Interval}m&useYfid=true&range=${req.body.Range}d&corsDomain=finance.yahoo.com&.tsrc=finance`;
    try {
        const response = await axios.post('http://18.119.106.158/predict', {
            "SYMB": req.body.SYMB,
            "Interval": req.body.Interval,
            "Range": req.body.Range
        }
        );
        if (response.status === 200) {
            const data = response.data;
            console.log(data)
            // logger.info(JSON.stringify(data))
            if (data[0]) {
                const value = data?.map(item => [
                    // new Date(item.Date).getTime(),
                    moment(item.Date).unix() * 1000,
                    parseFloat(item.Open, 10),
                    parseFloat(item.High, 10),
                    parseFloat(item.Low, 10),
                    parseFloat(item.Close, 10),
                    parseFloat(item.Volume, 10),
                    item.Color
                    // You can set a default color if needed
                ]);
                // Extract individual data points from the response
                // console.log(value)
                // logger.info(value)
                return res.json({ data: value, accuracy: data[0].Accuracy, bull: data[0].Bullish_doji, bear: data[0].Bearish_doji });
            }
            return res.json([[]])
        } else {
            console.error(`Error: Request failed with status code ${response.status}`);
            return res.json([[]]);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.json([[]]);
    }
}

async function fetchData(req, res) {
    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/${req.body.SYMB}?region=US&lang=en-US&includePrePost=false&interval=${req.body.Interval}m&useYfid=true&range=${req.body.Range}d&corsDomain=finance.yahoo.com&.tsrc=finance`;

    console.log(req.body)
    const date = moment(req.body.endDate, 'MM/DD/YYYY, h:mm:ss A').format('Y-MM-DD HH:mm:ss.SSS Z');
    const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // console.log(formattedDate)
    const apiUrl = `https://api.twelvedata.com/time_series?apikey=7a8e68b26a9d472180f530cbfe1b7dd8&interval=${req.body.Interval}min&symbol=${req.body.SYMB}&timezone=exchange&start_date=${new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000)).toISOString()}&format=JSON&timezone=utc${req.body.SYMB === 'RELIANCE' ? '&exchange=NSE' : ''}`;
    const apiKey = "7a8e68b26a9d472180f530cbfe1b7dd8"; // Replace with your Twelve Data API key
    try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            const data = response.data;
            console.log(data.values[0])
            const value = data.values.map(item => [
                moment(item.datetime).unix() * 1000,
                // new Date(item.datetime).toISOString(),
                parseFloat(item.open, 10),
                parseFloat(item.high, 10),
                parseFloat(item.low, 10),
                parseFloat(item.close, 10),
                parseFloat(item.volume, 10),
                // You can set a default color if needed
            ]);

            value.reverse();
            const add = req.body.Interval * 60000
            console.log(add)
            value.push([value[value.length - 1][0] + add, value[value.length - 1][4], value[value.length - 1][4], value[value.length - 1][4], value[value.length - 1][4], 0]);
            return res.json(value);
        }
        else {
            console.error(`Error: Request failed with status code ${response.status} `);
            return res.json(null);
        }
    } catch (error) {
        console.error(`Error: ${error.message} `);
        return res.json(null);

    }
}

async function vwap(req, res) {
    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/${req.body.SYMB}?region=US&lang=en-US&includePrePost=false&interval=${req.body.Interval}m&useYfid=true&range=${req.body.Range}d&corsDomain=finance.yahoo.com&.tsrc=finance`;

    console.log(req.body)
    // console.log(formattedDate)
    const apiUrl = `https://api.twelvedata.com/vwap?apikey=7a8e68b26a9d472180f530cbfe1b7dd8&interval=${req.body.Interval}min&symbol=${req.body.SYMB}&timezone=exchange&start_date=${new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000)).toISOString()}& format=JSON${ req.body.SYMB === 'RELIANCE' ? '&exchange=NSE' : '' } `;
    try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            const data = response.data;
            console.log(data.values[0])
            const value = data.values.map(item => [
                moment(item.datetime).unix() * 1000,
                // new Date(item.datetime).toISOString(),
                parseFloat(item.vwap, 10),
                // You can set a default color if needed
            ]);

            value.reverse();
            return res.json(value);
        }
        else {
            console.error(`Error: Request failed with status code ${ response.status } `);
            return res.json(null);
        }
    } catch (error) {
        console.error(`Error: ${ error.message } `);
        return res.json(null);

    }
}

async function sma(req, res) {
    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/${req.body.SYMB}?region=US&lang=en-US&includePrePost=false&interval=${req.body.Interval}m&useYfid=true&range=${req.body.Range}d&corsDomain=finance.yahoo.com&.tsrc=finance`;

console.log(req.body)
// console.log(formattedDate)
const apiUrl = `https://api.twelvedata.com/sma?apikey=7a8e68b26a9d472180f530cbfe1b7dd8&interval=${req.body.Interval}min&symbol=${req.body.SYMB}&timezone=exchange&start_date=${new Date(new Date().getTime() - (365*  24 * 60 * 60 * 1000)).toISOString()}& format=JSON${ req.body.SYMB === 'RELIANCE' ? '&exchange=NSE' : '' } `;
    try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            const data = response.data;
            console.log(data.values[0])
            const value = data.values.map(item => [
                moment(item.datetime).unix() * 1000,
                // new Date(item.datetime).toISOString(),
                parseFloat(item.sma, 10),
                // You can set a default color if needed
            ]);

            value.reverse();
            return res.json(value);
        }
        else {
            console.error(`Error: Request failed with status code ${ response.status } `);
            return res.json(null);
        }
    } catch (error) {
        console.error(`Error: ${ error.message } `);
        return res.json(null);

    }
}


module.exports = { data, fetchData, vwap, sma }