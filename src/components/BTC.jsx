import { useState, useEffect, useContext } from "react"
import UseContext from "../Context"
import { AreaChart , Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import "../css/BTC.css"
import btc_coin from "../assets/btc_icon.webp";

function BTC() {
  const { btcShow, showChart, setShowChart } = useContext(UseContext)
  const [price, setPrice] = useState(null)
  const [detail, setDetail] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [chartData, setChartData] = useState([])

  // Static/fake historical candles for deploy-safe mode.
  useEffect(() => {
    const base = 97250;
    const formatted = Array.from({ length: 50 }, (_, i) => ({
      time: new Date(Date.now() - (50 - i) * 60000).toLocaleTimeString(),
      price: Number((base + Math.sin(i / 3) * 220 + i * 3.5).toFixed(2)),
    }));

    setDetail({
      open_24h: 96800,
      high_24h: 98120,
      low_24h: 95890,
      volume_24h: 1120,
    });
    setPrice(formatted[formatted.length - 1].price);
    setChartData(formatted);
  }, [refresh])

  // Simulate live price movement without external sockets.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setPrice((prev) => {
        const current = typeof prev === "number" ? prev : 97250;
        const drift = (Math.random() - 0.5) * 130;
        const next = Number((current + drift).toFixed(2));

        setChartData((data) => [
          ...data.slice(-49),
          { time: new Date().toLocaleTimeString(), price: next },
        ]);

        setDetail((old) => {
          const base = old || {
            open_24h: 96800,
            high_24h: 98120,
            low_24h: 95890,
            volume_24h: 1120,
          };

          return {
            ...base,
            high_24h: Math.max(base.high_24h, next),
            low_24h: Math.min(base.low_24h, next),
            volume_24h: base.volume_24h + 2,
          };
        });
        return next;
      });
    }, 4000);

    return () => {
      window.clearInterval(timer);
    }
  }, [btcShow, refresh])

  const percentageValue =
    !detail || !detail.open_24h ? 0 : +(((price - detail.open_24h) / detail.open_24h) * 100).toFixed(2)

  const percentage = `${percentageValue >= 0 ? "+" : ""}${percentageValue}%`

  const volume = !detail
    ? "Loading..."
    : "$" + Math.floor(detail?.volume_24h * ((+detail?.high_24h + +detail?.low_24h) / 2 || 0)).toLocaleString()

  const high = !detail ? "Loading..." : Math.floor(detail?.high_24h).toLocaleString()
  const low = !detail ? "Loading..." : Math.floor(detail?.low_24h).toLocaleString()

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : null

  return (
    <>
      {btcShow.show && (
        <div className="btc_widget_win95">
          {/* Main content - made more compact */}
          <div className="btc_content">
            <div className="btc_price_section">
              <div className="btc_price_header">
                <img src={btc_coin} alt="" className="btc_price_icon" />
                <span className="btc_symbol">BTC-USD</span>
              </div>
              <div className="btc_price_main">
                <span className="btc_price">{formattedPrice || "Loading..."}</span>
                <span className={`btc_percentage ${percentageValue >= 0 ? "positive" : "negative"}`}>{percentage}</span>
              </div>
            </div>

            <div className="btc_stats_section">

              <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">Vol:</span>
                  <span className="btc_stat_value">{volume}</span>
                </div>
              </div>

              <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">High:</span>
                  <span className="btc_stat_value">{high}</span>
                </div>
                </div>

                <div className="btc_stat_row">
                <div className="btc_stat_item">
                  <span className="btc_stat_label">Low:</span>
                  <span className="btc_stat_value">{low}</span>
                </div>
              </div>
            </div>
            {showChart && (
              <div className="btc_chart_section">
                <div className="btc_chart_container">
                  {chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height={60}>
                      <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={["dataMin", "dataMax"]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            fontSize: "10px",
                            padding: '6px',
                            opacity: '0.95'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#000080"
                          fill="#00008033"
                          strokeWidth={1}
                          isAnimationActive={false}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            )}


            
            <div className="btc_bottom_section">
              <div className="btc_refresh_button"
              onClick={() => setShowChart(!showChart)}
            >
              <p>{showChart ? 'Hide chart' : 'Show chart'}</p>
            </div>

              <button
                className={`btc_refresh_button ${refresh ? "active" : ""}`}
                onClick={() => setRefresh(!refresh)}
                onAnimationEnd={() => setRefresh(false)}
              >
                <p>Refresh</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BTC
