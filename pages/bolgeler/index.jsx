import RegionCard from "@/components/index/region/card/regionCard";
import Seo from "@/components/seo";
import { getRegions } from "@/services/region";
import React from "react";
export default function index({ regions }) {
  return (
    <>
      <Seo pageTitle={"Bölgeler"} pageDesc={"bölge"} />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">Bölgeler</div>
                  <div className="subTitle">
                    Toplam {regions?.data?.length} adet bölge listelendi.
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {regions.data.map((region, index) => (
                      <RegionCard key={index} data={region} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps() {
  const regions = await getRegions();
  return { props: { regions } };
}
