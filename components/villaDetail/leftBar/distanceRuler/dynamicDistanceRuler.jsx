import { useState, useEffect, useRef } from "react";
import DistanceRulerSkeleton from "./distanceRulerSkeleton";
import DistanceRuler from "./distanceRuler";

const DynamicDistanceRulerComponent = ({ t, villaSlug }) => {
  const [data, setData] = useState(null); // Veriyi tutar
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu
  const ref = useRef(null); // Intersection Observer için ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Bileşen göründüğünde veriyi çek
          fetchData();
          observer.disconnect(); // Tekrar tekrar tetiklenmesini önler
        }
      },
      { threshold: 0.1 } // Bileşenin %50'si görünür olduğunda tetiklenir
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://labirentapp.testgrande.com/api/Clients/GetAllDistanceRulerByVillaSlug?Slug=${villaSlug}&Language=tr`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} style={{ minHeight: "200px" }}>
      {isLoading ? (
        <DistanceRulerSkeleton />
      ) : (
        <DistanceRuler data={data} t={t} />
      )}
    </div>
  );
};

export default DynamicDistanceRulerComponent;
