import { useEffect, useState } from "react";
import { ProductInfo } from "../produktInfo/ProduktInfo";
import { getProduct } from "../../Api";
import * as S from "./Container.Styles"

export function Container(params) {

  const [product, setProduct] = useState(0)
  const [offset, setOffset] = useState(0)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchSelectValue, setSearchSelectValue] = useState('')

  function productInfo(offset) {
    getProduct("get_ids", { "offset": offset, "limit": 50 })
      .then((prod) => {
        if (prod && prod.result) {
          return getProduct("get_items", { "ids": prod.result })
        }
      })
      .then((prodInfo) => {
        const output = [];
        if (prodInfo && prodInfo.result)
          prodInfo.result.reduce(function (isDup, item, index) {
            const nextProd = prodInfo.result[index + 1];
            if (nextProd && item.id === nextProd.id) {
              return true;
            } else if (isDup) {
              return false;
            } else {
              output.push(item);
            }

            return false;
          }, false);

        setProduct(output)
      })
  }
  useEffect(() => {
    productInfo()
  }, [])

  const choicePage = (p) => {
    setProduct(false);
    let i = offset + p;
    setOffset(i)
    productInfo(i)
  };



  function productFilterInfo() {
    let value = searchInputValue

    if (searchSelectValue === 'price') {
      value = Number(searchInputValue)
    }

    getProduct("filter", { [searchSelectValue]: value })
      .then((prod) => {
        if (prod && prod.result) {
          return getProduct("get_items", { "ids": prod.result })
        }
      })
      .then((prodInfo) => {
        const output = [];
        if (prodInfo && prodInfo.result)
          prodInfo.result.reduce(function (isDup, item, index) {
            const nextProd = prodInfo.result[index + 1];
            if (nextProd && item.id === nextProd.id) {
              return true;
            } else if (isDup) {
              return false;
            } else {
              output.push(item);
            }

            return false;
          }, false);

        setProduct(output)
      })
  }

  return (
    <>
      <p>Cписок товаров</p>
      <S.Filter>
        <form>
          <select name="filter" id="filter-select" onChange={(event) => { setSearchSelectValue(event.target.selectedOptions[0].value) }}>
            <option value="">-- Фильтровать по: --</option>
            <option value="product">Название</option>
            <option value="price">Цена</option>
            <option value="brand">Бренд</option>
          </select>
        </form>
        <input onChange={(event) => {
          setSearchInputValue(event.target.value);
          console.log(event)
        }}></input>
        <button onClick={() => productFilterInfo()}>Фильтровать</button>
      </S.Filter>


      <S.ProdInfo>
        {product ? product.map((prod, index) => (
          <ProductInfo key={index} prod={prod} />
        )) : <p>loading...</p>}
      </S.ProdInfo>
      <S.Pages>
        <p onClick={() => choicePage(-50)} style={{ visibility: offset !== 0 ? "visible" : "hidden" }} >назад</p>
        <p onClick={() => choicePage(50)}>вперед</p>
      </S.Pages>
    </>
  )
}