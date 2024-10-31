import "@/styles/styles.css";
import Seo from "@/components/seo";
import { getVillasForSale } from "@/services/villa";
import { useEffect, useState } from "react";
import VillaCard from "@/components/index/villa/card/villaCard";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
export default function SalesList({ villasForSale, totalPage }) {
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;
  return (
    <>
      <Seo
        pageTitle={"Satılık Villalar"}
        pageDesc={"Labirent Fethiye Satılık Villalar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">Satılık Villalar</div>
                  <div className="subTitle">
                    Toplam {totalPage} adet tesis bulunmaktadır.
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villasForSale?.data?.map((villa, index) => (
                      <VillaCard
                        salePage={true}
                        key={index}
                        data={villa}
                        photos={villa?.photos || []}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                newActivePage={activePage}
                pageCount={Math.ceil(villasForSale?.totalCount / 20) || 1}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps({ query }) {
  const page = query?.p ? query?.p - 1 : 0;
  const villasForSale = await getVillasForSale(page);
  const totalPage = villasForSale?.totalCount || 0;
  return { props: { villasForSale, totalPage } };
}
