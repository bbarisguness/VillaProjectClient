import Slider from "@/components/index/slider/slider";
// import TreeStep from "@/components/index/treestep/treestep";
// import Villa from "@/components/index/villa/villa";
// import Regions from "@/components/index/region/region";
// import Apart from "@/components/index/apart/apart";
// import Service from "@/components/index/service/service";
// import Blog from "@/components/index/blog/blog";
// import VillaRent from "@/components/index/villaRentInfo/villaRentInfo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { getCache, setCache } from "@/lib/cache";

//const Slider = lazy(() => import('@/components/index/slider/slider'));
const TreeStep = lazy(() => import("@/components/index/treestep/treestep"));
const Villa = lazy(() => import("@/components/index/villa/villa"));
const Regions = lazy(() => import("@/components/index/region/region"));
const Apart = lazy(() => import("@/components/index/apart/apart"));
const Service = lazy(() => import("@/components/index/service/service"));
const Blog = lazy(() => import("@/components/index/blog/blog"));
const VillaRent = lazy(() =>
  import("@/components/index/villaRentInfo/villaRentInfo")
);

import "@/styles/styles.css";
import { getVillasHome, getHotels } from "@/services/villa";
import { getCategoriesHome } from "@/services/category";
import Seo from "@/components/seo";
import { getRegions } from "@/services/region";
import { getBlogs } from "@/services/blog";
import { lazy, Suspense } from "react";

export default function Home({
  villa,
  categories,
  regions,
  blogs,
  newVillas,
  testimonials,
  aparts,
}) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Villalar"}
      />

      <Slider />
      <Suspense fallback={<div>loading</div>}>
        <section id="contentContainer">
          <TreeStep />
          <Villa category={categories} villas={villa} />
          <Regions homePage={true} regions={regions} />
          <Apart aparts={aparts} />
          <Service />
          {/* <NewVillas villas={newVillas} /> */}
          {/* <Testimonial testimonials={testimonials} /> */}
          <Blog blog={blogs} />
          <VillaRent />
        </section>
      </Suspense>
    </>
  );
}

// export async function getServerSideProps({ locale }) {
//   // API çağrılarını paralel olarak başlat
//   const otelData = getHotels(0, 4);
//   const regionData = getRegions(locale);
//   const blogsData = getBlogs(locale);
//   const categories = await getCategoriesHome(locale);

//   const [aparts, regions, blogs, villa] = await Promise.all([
//     otelData,
//     regionData,
//     blogsData,
//     getVillasHome(8, 0, categories?.data[0]?.id),
//   ]);

//   return {
//     props: {
//       villa,
//       categories,
//       blogs,
//       regions,
//       aparts,
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }

export async function getStaticProps({ locale }) {
  console.log("tekrar generate edildi");
  const cachedAparts = getCache("homepageCachedAparts", locale);
  const cachedRegionData = getCache("homepageCachedRegions", locale);
  const cachedBlogData = getCache("homepageCachedBlogs", locale);
  const cachedCategoriesData = getCache("homepageCachedCategories", locale);
  const cachedhomeVillaData = getCache("homepageCachedVillas", locale);

  let otelData, regionData, blogsData, categories, homeVillas;

  if (cachedAparts) {
    otelData = cachedAparts;
    console.log("cachedAparts cache");
  } else {
    otelData = getHotels(0, 4);
    console.log("cachedAparts api");
  }

  if (cachedRegionData) {
    regionData = cachedRegionData;
    console.log("cachedRegionData cache");
  } else {
    regionData = getRegions(locale);
    console.log("cachedRegionData api");
  }

  if (cachedBlogData) {
    blogsData = cachedBlogData;
    console.log("cachedBlogData cache");
  } else {
    blogsData = getBlogs(locale);
    console.log("cachedBlogData api");
  }

  if (cachedCategoriesData) {
    categories = cachedCategoriesData;
    console.log("cachedCategoriesData cache");
  } else {
    categories = await getCategoriesHome(locale);
    console.log("cachedCategoriesData api");
  }

  if (cachedhomeVillaData) {
    homeVillas = cachedhomeVillaData;
    console.log("cachedHomeVillaData cache");
  } else {
    homeVillas = getVillasHome(8, 0, categories?.data[0]?.id);
    console.log("cachedHomeVillaData api");
  }

  const [aparts, regions, blogs, villa] = await Promise.all([
    otelData,
    regionData,
    blogsData,
    homeVillas,
  ]);

  //SET CACHE DATAS
  if (!cachedAparts) {
    setCache("homepageCachedAparts", locale, aparts, 10 * 1000);
    console.log("homepageCachedAparts  cacheSetEt");
  }

  if (!cachedRegionData) {
    setCache("homepageCachedRegions", locale, regions, 3600 * 1000); // 1 saat geçerli
    console.log("homepageCachedRegions  cacheSetEt");
  }

  if (!cachedBlogData) {
    setCache("homepageCachedBlogs", locale, blogs, 10 * 1000);
    console.log("homepageCachedBlogs  cacheSetEt");
  }

  if (!cachedCategoriesData) {
    setCache("homepageCachedCategories", locale, categories, 3600 * 1000); //1 saat geçerli
    console.log("homepageCachedCategories  cacheSetEt");
  }

  if (!cachedhomeVillaData) {
    setCache("homepageCachedVillas", locale, villa, 10 * 1000);
    console.log("homepageCachedVillas  cacheSetEt");
  }

  return {
    props: {
      villa,
      categories,
      blogs,
      regions,
      aparts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
