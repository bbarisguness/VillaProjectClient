import { useState } from "react";
import dynamic from "next/dynamic";
import "@/styles/styles.css";
import Seo from "@/components/seo";
import { getVillas } from "@/services/villa";
import Pagination from "@/components/pagination/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/router";

const VillaCard = dynamic(() => import("@/components/index/villa/card/villaCard"), {
  ssr: true, // SSR olmadan yüklenmesi yeterli
});

export default function List({ villas }) {
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Kiralık Villalar"}
        pageDesc={"Labirent Fethiye Kiralık Villalar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">Kiralık Villalar</div>
                  <div className="subTitle">
                    Toplam {villas?.totalCount} adet tesis bulunmaktadır.
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villas?.data.map((villa, index) => (
                      <VillaCard
                        listPage={true}
                        key={index}
                        data={villa}
                        photos={villa?.photos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                //setNewActivePage={setNewActivePage}
                newActivePage={activePage}
                pageCount={Math.ceil(villas?.totalCount / 20)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const villas = await getVillas(query?.p ? query?.p - 1 : 0);
  return { props: { villas } };
}
