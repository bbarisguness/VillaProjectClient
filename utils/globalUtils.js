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

export function scrolltoHash(element_id) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};

//"5.500.46" to "5.500,46"
export function replaceLastDotWithComma(input) {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const lastDotIndex = input.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return input; // Nokta yoksa orijinal metni döndür
    }
    
    return input.slice(0, lastDotIndex) + ',' + input.slice(lastDotIndex + 1);
}