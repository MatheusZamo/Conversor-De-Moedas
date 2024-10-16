import { useEffect, useState } from "react"

const App = () => {
  const [inputAmount, setInputAmount] = useState(0)
  const [selectBaseCurrency, setSelectBaseCurrency] = useState("USD")
  const [selectConversionCurrency, setSelectConversionCurrency] =
    useState("BRL")
  const [conversionValue, setConversionValue] = useState(null)

  useEffect(() => {
    const apiKey = "NpfeL1reaHmOZ2yEcRiP2G2tYICHh8b4"
    fetch(
      `https://api.currencybeacon.com/v1/convert?from=${selectBaseCurrency}&to=${selectConversionCurrency}&amount=${inputAmount}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => setConversionValue(response.value))
      .catch(console.log)
  }, [selectBaseCurrency, selectConversionCurrency, inputAmount])

  useEffect(() => {
    conversionValue !== 0
      ? (document.title = `${conversionValue?.toFixed(
          2,
        )} ${selectConversionCurrency}`)
      : (document.title = "Conversor de moedas")
  }, [conversionValue])

  const handleChangeInputAmount = (e) => setInputAmount(e.target.value)
  const handleChangeSelectBase = (e) => setSelectBaseCurrency(e.target.value)
  const handleChangeSelectConversion = (e) =>
    setSelectConversionCurrency(e.target.value)

  return (
    <>
      <input
        value={inputAmount}
        onChange={handleChangeInputAmount}
        type="number"
        autoFocus
      />

      <div className="selects">
        <select value={selectBaseCurrency} onChange={handleChangeSelectBase}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          value={selectConversionCurrency}
          onChange={handleChangeSelectConversion}
        >
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      {conversionValue !== 0 && (
        <h2>
          {conversionValue?.toFixed(2)} {selectConversionCurrency}
        </h2>
      )}
    </>
  )
}
export { App }
