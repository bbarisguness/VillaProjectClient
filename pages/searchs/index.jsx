import { getVillasByFilter } from '@/services/villa'
import VillaCard from "@/components/index/villa/card/villaCard";
import Seo from '@/components/seo';
import Pagination from '@/components/pagination/Pagination';
import { useRouter } from 'next/router';

export default function Searchs({ getFilterVillas, totalPage }) {
    console.log(getFilterVillas)
    const router = useRouter()
    const activePage = parseInt(router?.query?.p) || 1

    return (
        <>
            <Seo pageTitle={'Arama Sonuçları'} pageDesc={'Arama sonuçları desc'} />
            <section className="listPage_contentDetail listPage_villasDetail">
                <div className="villas">
                    <div className="listPage_container">
                        <div className="box">
                            <div className="top">
                                <div className="titleBox">
                                    <div className="title">Arama Sonuçları</div>
                                    <div className="subTitle">Toplam {getFilterVillas?.totalCount} adet tesis bulunmaktadır.</div>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="row">
                                    <ul>
                                        {
                                            getFilterVillas?.data.map((villa, index) => <VillaCard listPage={true} key={index} data={villa} photos={villa?.photos} />)
                                        }
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Pagination
                    newActivePage={activePage}
                    pageCount={totalPage}
                />
            </section>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const name = query?.name || ''
    const checkIn = query?.from || ''
    const checkOut = query?.to || ''
    const person = query?.person || '0'

    const sliceCheckInDate = checkIn.split('-')
    const sliceCheckOutDate = checkOut.split('-')
    const checkInFormat = `${sliceCheckInDate[2]}-${sliceCheckOutDate[1] <= 9 ? '0' : ''}${sliceCheckInDate[1]}-${sliceCheckInDate[0]}`
    const checkOutFormat = `${sliceCheckOutDate[2]}-${sliceCheckOutDate[1] <= 9 ? '0' : ''}${sliceCheckOutDate[1]}-${sliceCheckOutDate[0]}`

    const getFilterVillas = await getVillasByFilter({ checkIn: checkIn != '' ? checkInFormat : "", checkOut: checkOut != '' ? checkOutFormat : "", villaSearchText: name, person: person, size: 12, page: parseInt(query?.p) || 1 })
    const totalPage = Math.ceil(getFilterVillas?.totalCount / 12);
    return { props: { getFilterVillas, name, person, totalPage } }
}