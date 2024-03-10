import * as S from "./ProductInfo.Styles"



export function ProductInfo({ prod }) {
    return (
        <S.ProdInfo >
            <S.Info> Название: {prod.product}</S.Info>
            <S.Info> Брэнд: {prod.brand ? prod.brand : "Неизвестно"}</S.Info>            
            <S.Info> Цена: {prod.price}</S.Info>
            <S.Info> id: {prod.id}</S.Info>
        </S.ProdInfo>
    )




}