import { useEffect, useState } from "react"

const App = () => {
  const [inputAmount, setInputAmount] = useState(1)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("BRL")
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    if (rate === null) {
      return
    }

    document.title = `${rate?.toFixed(2)} ${to}`
    return () => (document.title = "Conversor de moedas")
  }, [rate, to])

  useEffect(() => {
    if (to === from || inputAmount === 0) {
      setRate(null)
      return
    }

    const id = setTimeout(() => {
      setRate(null)
      setLoading("Carregando...")

      const apiKey = "NpfeL1reaHmOZ2yEcRiP2G2tYICHh8b4"
      fetch(
        `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${inputAmount}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          setRate(response.value)
          setLoading(null)
        })
        .catch(console.log)
    }, 500)

    return () => clearInterval(id)
  }, [from, to, inputAmount])

  const handleChangeInputAmount = (e) => setInputAmount(e.target.value)
  const handleChangeFrom = (e) => setFrom(e.target.value)
  const handleChangeTo = (e) => setTo(e.target.value)

  return (
    <>
      <input
        value={inputAmount}
        onChange={handleChangeInputAmount}
        type="number"
        autoFocus
      />

      <div className="selects">
        <select value={from} onChange={handleChangeFrom}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select value={to} onChange={handleChangeTo}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      {loading && <h2>{loading}</h2>}
      {rate && (
        <h2>
          {rate?.toFixed(2)} {to}
        </h2>
      )}
    </>
  )
}
export { App }
