//villa detay ve otel detay sayfasında sağ yukarda Gecelik En Düşük fiyatın altına gelen fiyat aralıkları(minimum ve maximum)
export function getPriceRange(priceTablesArray = [], currentPriceTypeText) {

    if (priceTablesArray.length == 0) {
        return <>
            {currentPriceTypeText}0
        </>
    }

    return <>
        {currentPriceTypeText}
        {
            Math.min(
                ...priceTablesArray?.map((o) => o.price)
            )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        } {" "}
        - {currentPriceTypeText}
        {
            Math.max(
                ...priceTablesArray?.map((o) => o.price)
            )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        } {" "}
    </>
}