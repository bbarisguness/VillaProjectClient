"use client";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import { useEffect, useRef, useState } from "react";
import Seo from "@/components/seo";
import styles from "./page.module.css";

export default function SSS() {
  const fieldRef = useRef();
  const [accordionIndex, setIndex] = useState(0);

  const scroolBottom = () => {
    fieldRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (fieldRef.current && accordionIndex != 0) {
      const timer = setTimeout(() => scroolBottom(), 600);
      return () => clearTimeout(timer);
    }
  }, [accordionIndex]);

  return (
    <>
      <Seo
        pageTitle={"Sıkça Sorulan Sorular"}
        pageDesc={"Labirent Fethiye Sıkça Sorulan Sorular"}
      />
      <BreadCrumb link="sss" />
      <section className={`${styles["contentDetail"]} faq`}>
        <div className="accordionBox">
          <div className={styles.container}>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>Soru Cevap</h1>
            </div>
            <div className={styles.accordion}>
              <div
                ref={accordionIndex == 0 ? fieldRef : null}
                onClick={
                  accordionIndex == 0 ? () => setIndex(-1) : () => setIndex(0)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 0 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Sık Sorulan Sorular</div>
                <div className={styles.desc}>
                  Bu sayfamızda hizmetlerimizle alakalı sık sorulan sorulara ve
                  cevaplarına yer verilmektedir. Aklınıza takılan diğer
                  sorularınız için de her zaman çağrı merkezimizle iletişime
                  geçebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 1 ? fieldRef : null}
                onClick={
                  accordionIndex == 1 ? () => setIndex(-1) : () => setIndex(1)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 1 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Giriş çıkış saatleri kaçtır?</div>
                <div className={styles.desc}>
                  Villalarımızın giriş saati 16.00, çıkış saati 10.00’dır. Arada
                  kalan süre zarfında tesislerimiz yeni misafirlerimiz için
                  temizlenip hazırlanmakta ve bu saatler dışında giriş ve
                  çıkışlar yapılamamaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 2 ? fieldRef : null}
                onClick={
                  accordionIndex == 2 ? () => setIndex(-1) : () => setIndex(2)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 2 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalarınızın maksimum kapasitesi kaç kişidir?
                </div>
                <div className={styles.desc}>
                  Villalarımızın maksimum kapasitesi belirtilen kişi sayısı
                  kabul edilmektedir ve her villamızın maksimum kapasitesi
                  farklıdır. Bu sayıya çocuklar da dahildir ve sayının üzerine
                  çıkılması kabul edilmemektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 3 ? fieldRef : null}
                onClick={
                  accordionIndex == 3 ? () => setIndex(-1) : () => setIndex(3)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 3 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Evcil hayvan kabul ediyor musunuz?
                </div>
                <div className={styles.desc}>
                  Aksi bir durum belirtilmedikçe hizmet verdiğimiz
                  villalarımızın hiç birisinde evcil hayvan kabul
                  edilmemektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 4 ? fieldRef : null}
                onClick={
                  accordionIndex == 4 ? () => setIndex(-1) : () => setIndex(4)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 4 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Ekstra giderler nelerdir?</div>
                <div className={styles.desc}>
                  Aksi belirtilmedikçe sayfamızda sunulan fiyatlara su,
                  elektrik, klima, çarşaf, havlu değişimi, haftada bir temizlik
                  dahildir. Ekstra gider olan ve ayrıca ücret gerektiren
                  detaylar villamızın açıklamalarında belirtilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 5 ? fieldRef : null}
                onClick={
                  accordionIndex == 5 ? () => setIndex(-1) : () => setIndex(5)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 5 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Kiralama fiyatlarına neler dahildir?
                </div>
                <div className={styles.desc}>
                  Villa kiralama fiyatlarına belirtilen konaklama kapasitesine
                  uygun şekilde kiralama süresindeki genel giderler, Wi-Fi,
                  havuz ve bahçe bakımı, arıza halinde servis, komisyon bedeli
                  KDV’si dahil bulunmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 6 ? fieldRef : null}
                onClick={
                  accordionIndex == 6 ? () => setIndex(-1) : () => setIndex(6)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 6 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Gelirken yanımızda neler getirmeliyiz?
                </div>
                <div className={styles.desc}>
                  Villalarımızın mutfak gereçleri belirtilen kişi sayısınca tam
                  donanımlıdır. Herkes için bir set banyo ve yüz havlusu,
                  yataklar hazırlanmış vaziyette teslim edilir. Özel
                  eşyalarınızı ve dilerseniz fotoğraf makinesi, bilgisayar,
                  tablet, plaj havlusu gibi ekstralar getirebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 7 ? fieldRef : null}
                onClick={
                  accordionIndex == 7 ? () => setIndex(-1) : () => setIndex(7)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 7 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Mutaassıp ailelere uygun nedir?
                </div>
                <div className={styles.desc}>
                  Mutaassıp ailelere uygun demek bahçesi ve havuz alanı çevrili
                  olup dışardan kesinlikle içerisi görünmeyen, muhafazakâr
                  ailelerin rahatlıkla konaklamasına uygun villaları ifade
                  etmektedir. Bu tür villalarımız da mevcuttur.
                </div>
              </div>
              <div
                ref={accordionIndex == 8 ? fieldRef : null}
                onClick={
                  accordionIndex == 8 ? () => setIndex(-1) : () => setIndex(8)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 8 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Havuz bakımı nasıl ve ne zaman yapılmaktadır?
                </div>
                <div className={styles.desc}>
                  Havuz bakımı düzenli olarak bakım personellerince
                  yapılmaktadır. Havuza girerken aşırı yağ kullanımı, elbise ile
                  girilmesi gibi nedenlerle oluşabilecek sorunlara karşı
                  hassasiyet gösterilmelidir. Havuz suyunun boşaltılması ve
                  yeniden doldurulması hem yüksek maliyet hem de uzun zaman
                  gerektirdiği için havuzlarımız dolduruldukları ilk günden
                  itibaren düzenli şekilde temizlenmektedir. Gereken ilaçlamalar
                  yapılmakta ve havuz suyu devridaim yapmaktadır. Bu nedenle
                  havuz suyunun sürekli değiştirilmesine gerek yoktur.
                </div>
              </div>
              <div
                ref={accordionIndex == 9 ? fieldRef : null}
                onClick={
                  accordionIndex == 9 ? () => setIndex(-1) : () => setIndex(9)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 9 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Kiralama süreleri ne kadardır?
                </div>
                <div className={styles.desc}>
                  Villalarımızın minimum kiralama süreleri genellikle 5 gün
                  olmakla birlikte villamıza göre değişiklik gösterebilmektedir.
                  Her villamızın fiyat tablosu kısmında minimum konaklama süresi
                  belirtilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 10 ? fieldRef : null}
                onClick={
                  accordionIndex == 10 ? () => setIndex(-1) : () => setIndex(10)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 10 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villa temizliği detayları nelerdir?
                </div>
                <div className={styles.desc}>
                  Villalarımız her misafirimizin girişi öncesinde temizlenmekte
                  ve tertemiz şekilde teslim edilmektedir. Bununla birlikte
                  haftalık olarak villa temizliği yapılmakta, haftalık temizlik
                  kiralama fiyatlarına dahil bulunmaktadır. Bir haftadan uzun
                  konaklamalarda hafta arası ücretsiz temizlik hizmeti
                  verilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 11 ? fieldRef : null}
                onClick={
                  accordionIndex == 11 ? () => setIndex(-1) : () => setIndex(11)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 11 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalarınızda yedek havlu ve çarşaf var mıdır?
                </div>
                <div className={styles.desc}>
                  Bütün villalarımızda temiz havlu ve temiz çarşaf
                  bulunmaktadır. Her minimum konaklama süresi için bir çarşaf ve
                  havlu takımı yer almakta; ancak plaj havlusu bulunmamaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 12 ? fieldRef : null}
                onClick={
                  accordionIndex == 12 ? () => setIndex(-1) : () => setIndex(12)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 12 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Kişi sayısına çocuklar dahil midir?
                </div>
                <div className={styles.desc}>
                  Çocuklar kişi sayısına dahil edilmektedir ve maksimum
                  konaklayacak kişi sayısı çocuklar da düşünülerek
                  hesaplanmalıdır.
                </div>
              </div>
              <div
                ref={accordionIndex == 13 ? fieldRef : null}
                onClick={
                  accordionIndex == 13 ? () => setIndex(-1) : () => setIndex(13)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 13 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Talep formunu doldurduğumda rezervasyon kesinleşiyor mu?
                </div>
                <div className={styles.desc}>
                  Yalnızca talep formunu doldurmanız villa kiralama işleminizin
                  bittiği manasına gelmez. Rezervasyonunuzun kesinleşmesi için
                  ön kaparo bedelini ödemeniz ve sonrasında bizim size
                  konfirmasyon belgesi göndermemiz gerekir. Rezervasyonunuz
                  böylece kesinlik kazanır.
                </div>
              </div>
              <div
                ref={accordionIndex == 14 ? fieldRef : null}
                onClick={
                  accordionIndex == 14 ? () => setIndex(-1) : () => setIndex(14)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 14 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalara giriş – çıkış saatleri nedir?
                </div>
                <div className={styles.desc}>
                  Villalarımızın giriş saati 16.00 – 20.00 arasındadır.
                  Çıkışların ise en geç 10.00’da yapılması gerekmekte, bu arada
                  temizlik gerçekleştirilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 15 ? fieldRef : null}
                onClick={
                  accordionIndex == 15 ? () => setIndex(-1) : () => setIndex(15)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 15 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalarda yemek hizmeti var mı?
                </div>
                <div className={styles.desc}>
                  Villalarımızda kahvaltı, öğle yemeği, akşam yemeği, açık büfe
                  gibi servisler bulunmamaktadır. Kiralayacağınız villalarda
                  yiyecek, içecek tüketebilirsiniz; fakat bunları kendiniz temin
                  etmelisiniz. Mutfak bölümümüzde yemek yapmaya elverişli bütün
                  olanaklar bulunmakta, araç gereçler kişi sayısınca yer
                  almaktadır.
                  <br /> Bununla birlikte kendi bünyemizde yer alan Binnaz
                  Restaurant adlı işletmemiz saat 10.00 – 22.00 arasında paket
                  servisi vermektedir. Dilerseniz 0 537 880 07 03 numaramızdan
                  iletişime geçebilir ve paket siparişi verebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 16 ? fieldRef : null}
                onClick={
                  accordionIndex == 16 ? () => setIndex(-1) : () => setIndex(16)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 16 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalara evcil hayvan getirebilir miyiz?
                </div>
                <div className={styles.desc}>
                  Aksi belirtilmediği taktirde villalarımıza evcil hayvan
                  getirmenize izin verilmemektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 17 ? fieldRef : null}
                onClick={
                  accordionIndex == 17 ? () => setIndex(-1) : () => setIndex(17)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 17 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  T.C. numaram yok. Rezervasyonumu nasıl yapabilirim?
                </div>
                <div className={styles.desc}>
                  Rezervasyon kısmında T.C. kimlik numaranız istenmektedir.
                  Fakat T.C. kimlik numaranız yoksa hangi ülkenin
                  vatandaşıysanız o ülke kimlik kartı numarasını girebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 18 ? fieldRef : null}
                onClick={
                  accordionIndex == 18 ? () => setIndex(-1) : () => setIndex(18)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 18 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Kiraladığımız villaya geldiğimizde değişim yapıp başka bir
                  yere geçebilir miyiz?
                </div>
                <div className={styles.desc}>
                  Maalesef böyle bir uygulama yoktur. Kiralamış olduğunuz
                  villayı değiştirmek istemeniz halinde bütün ücretini ödemek
                  zorundasınız. Aynı şekilde geçeceğiniz villanın ücretini de
                  ödemelisiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 19 ? fieldRef : null}
                onClick={
                  accordionIndex == 19 ? () => setIndex(-1) : () => setIndex(19)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 19 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Ev sahibinin bizi evden çıkarma yetkisi var mı?
                </div>
                <div className={styles.desc}>
                  Misafirlerimizin konforu ve memnuniyeti bizim için çok
                  önemlidir. Bu yüzden evlerde gürültü yaparak çevreyi rahatsız
                  etmemelisiniz. Bu durumda şikâyet gelmesi halinde önce
                  misafirler uyarılacak, aynı durum devam ederse ev sahibinin
                  evden çıkarma hakkı olacaktır. Özellikle çocuk sayısının fazla
                  olması bu ihtimali doğurmaktadır. Bu yüzden çocuk sayısının
                  fazlalığı nedeniyle gürültü olacağını düşünüyorsanız ev seçimi
                  hususunda daha müstakil, çevresi daha sakin villaları seçmeye
                  özen gösterebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 20 ? fieldRef : null}
                onClick={
                  accordionIndex == 20 ? () => setIndex(-1) : () => setIndex(20)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 20 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Tatil bölgemiz ne kadar güvenlidir?
                </div>
                <div className={styles.desc}>
                  Villalarımızın bulundukları yerler son derece güvenlidir. Her
                  yıl yüzlerce aile bu bölgelerde tatillerini geçirmektedir. Bu
                  yüzden en az evleriniz kadar villalarımızın da güvenli
                  olduğundan emin olabilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 21 ? fieldRef : null}
                onClick={
                  accordionIndex == 21 ? () => setIndex(-1) : () => setIndex(21)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 21 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villaların sigortası var mıdır?
                </div>
                <div className={styles.desc}>
                  Villalarımızın deprem, hırsızlık, yangın, su baskını gibi
                  sigortalarının sorumluluğu ev sahiplerindedir. Fakat bunlar
                  yapılmış olsa dahi geçici konaklayanların zararları sigorta
                  kapsamına girmemektedir. Bu nedenle en kötü senaryoları
                  düşünüyorsanız seyahate çıkmadan önce seyahatle ilgili özel
                  sigortaları değerlendirebilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 22 ? fieldRef : null}
                onClick={
                  accordionIndex == 22 ? () => setIndex(-1) : () => setIndex(22)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 22 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Aracımız yok. Villaya nasıl geçebiliriz?
                </div>
                <div className={styles.desc}>
                  Misafirlerimizin villalarına geçme sorumluluğu kendilerine
                  aittir. Fakat araç kiralama hizmetimiz vardır. Ek ücret
                  ödeyerek araç kiralama hizmeti almanız halinde havalimanına
                  indiğinizde aracınız hazır olacaktır ve villanıza kolayca
                  geçmeniz mümkün olacaktır. Ya da taksi kiralayabilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 23 ? fieldRef : null}
                onClick={
                  accordionIndex == 23 ? () => setIndex(-1) : () => setIndex(23)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 23 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Araç kiralama hizmetiniz var mı?
                </div>
                <div className={styles.desc}>
                  Hangi villada konaklarsanız konaklayın her zaman araca
                  ihtiyacınız olacaktır. Villaların bulunduğu bölgeler daha çok
                  küçük yerleşim yerleri olduğundan toplu ulaşımda zorluk
                  yaşanabilmektedir. Üstelik çevrede gezilip görülmesi gereken
                  yerlere, markete, restorana vs. gidip gelmek için de araca
                  ihtiyacınız olacaktır. Firmamız her ihtiyaca uygun, istenen
                  sürelerde araç kiralama hizmeti vermekte, tatiliniz boyunca
                  özel araç konforunu yaşamanızı sağlamaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 24 ? fieldRef : null}
                onClick={
                  accordionIndex == 24 ? () => setIndex(-1) : () => setIndex(24)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 24 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Korunaklı villanın anlamı nedir?
                </div>
                <div className={styles.desc}>
                  Sektörde bahçesi ve havuzu duvarlarla çevrili, etraftan
                  içerisi görünmeyecek şekilde tasarlanmış villalar korunaklı
                  villa olarak adlandırılmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 25 ? fieldRef : null}
                onClick={
                  accordionIndex == 25 ? () => setIndex(-1) : () => setIndex(25)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 25 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Konakladığımız sürede bir problemle karşılaşırsak ne
                  yapmalıyız?
                </div>
                <div className={styles.desc}>
                  Konakladığınız sürece tatil konutlarınızdaki her türlü
                  gereksiniminizle biz ilgileniyoruz. 7/24 bizimle iletişime
                  geçebilirsiniz. İhtiyaçlarınızı ya bizzat ya da ev
                  sahipleriyle birlikte gideriyoruz.
                </div>
              </div>
              <div
                ref={accordionIndex == 26 ? fieldRef : null}
                onClick={
                  accordionIndex == 26 ? () => setIndex(-1) : () => setIndex(26)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 26 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Havuzun bakımı hangi sıklıkla yapılıyor?
                </div>
                <div className={styles.desc}>
                  Havuz bakımı düzenli olarak görevli personellerimizce
                  yapılmaktadır. Havuz bakımına dair sizlerin herhangi bir
                  müdahalede bulunmanıza gerek yoktur. Devridaim olarak havuz
                  suyu kendini temizlemektedir. Fakat havuza girerken aşırı yağ
                  kullanımı, elbise ile girilmesi gibi nedenlerle sorunlar
                  oluşmaması için dikkat edilmesi gerekmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 27 ? fieldRef : null}
                onClick={
                  accordionIndex == 27 ? () => setIndex(-1) : () => setIndex(27)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 27 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Havuz suyu değiştiriliyor mu?
                </div>
                <div className={styles.desc}>
                  Havuz suyunun boşaltılması ve yeniden doldurulması yüksek
                  maliyet gerektirmektedir. Aynı zamanda uzun zaman almaktadır.
                  Bunun yerine havuz suyu doldurulduğu ilk günden itibaren
                  düzenli olarak temizlenmekte, gereken ilaçlamalar ve devridaim
                  gerçekleştirilmektedir. Bu nedenle hijyen ve sağlık açısından
                  sorun yaşanmamakta, havuz suyunun da değiştirilmesine gerek
                  kalmamaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 28 ? fieldRef : null}
                onClick={
                  accordionIndex == 28 ? () => setIndex(-1) : () => setIndex(28)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 28 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Havuz temizliği istemediğim taktirde iptal edebilir miyim?
                </div>
                <div className={styles.desc}>
                  Sizin ve sizden sonraki misafirlerimizin sağlığı için havuz
                  temizliğinin düzenli olarak görevli personellerce yapılması
                  gerekmektedir. Bu temizlik mutlaka yapılmalıdır. Bu nedenle
                  vakti zamanı geldiğinde gerçekleştirilmekte, sizin iptal etme
                  gibi bir durumunuz söz konu olamamaktadır. Sağlık bakanlığı
                  tarafından zorunlu kılındığı için villamız boş olsa dahi bu
                  temizlik yapılmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 29 ? fieldRef : null}
                onClick={
                  accordionIndex == 29 ? () => setIndex(-1) : () => setIndex(29)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 29 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Havuz suyunun miktarını kendimize göre ayarlayabilir miyiz?
                </div>
                <div className={styles.desc}>
                  Hayır. Havuz suyunun azaltılması için motorun ve teknik
                  sistemin durdurulması gerekir. Çalışan teknik sistemin ve
                  motorun durdurulması suyun bakteri ve yosun üretmesine neden
                  olabilir. Bu da hijyen açısından uygun değildir. Her
                  villamızın havuzunun boyutları sayfasında yaklaşık olarak
                  yazdığı için size en uygununu seçmenizi öneriyoruz. Çok sayıda
                  alternatif olduğu için rahatlıkla bu bilgileri görerek tercih
                  yapabilirsiniz ve bunu kabul ederek kiralama yaptığınız kabul
                  edilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 30 ? fieldRef : null}
                onClick={
                  accordionIndex == 30 ? () => setIndex(-1) : () => setIndex(30)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 30 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Erken çıkış yapılması halinde ücret iadesi var mı?
                </div>
                <div className={styles.desc}>
                  Bölgemiz turizm açısından yılın her dönemi hareketlidir ve
                  kiracının isteği doğrultusunda erken çıkış yapılması halinde
                  ücret iadesi yapılmamaktadır. Fakat villa sahibi ya da villa
                  açısından mücbir bir sebep oluşması halinde ücret iadesi söz
                  konusu olabilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 31 ? fieldRef : null}
                onClick={
                  accordionIndex == 31 ? () => setIndex(-1) : () => setIndex(31)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 31 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villalarda mangal/barbekü var mı?
                </div>
                <div className={styles.desc}>
                  Evet. Hemen bütün villalarımızın havuz terasında ya da bahçe
                  alanında mangal, barbekü bulunmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 32 ? fieldRef : null}
                onClick={
                  accordionIndex == 32 ? () => setIndex(-1) : () => setIndex(32)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 32 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Muhafazakar villa ne demek?</div>
                <div className={styles.desc}>
                  Bölgemizde yer alan villaların bir kısmının havuzu, havuz
                  terası ve bahçesi dış çevreden görünmeyecek biçimde doğal
                  ortamdadır. Ya da perdeleme sistemiyle bütün bu alanlar
                  dışardan soyutlanmıştır. Özellikle tesettürlü kadınların
                  rahatlıkla havuza girip güneşlenebileceği, bahçelerinde
                  dolaşabileceği bu villalar sektörde muhafazakar villa olarak
                  anılmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 33 ? fieldRef : null}
                onClick={
                  accordionIndex == 33 ? () => setIndex(-1) : () => setIndex(33)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 33 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Çocuk havuzu güvenli midir?</div>
                <div className={styles.desc}>
                  Çocuk havuzu her villada yoktur. Bazı villalarda anne
                  babaların daha rahat dinlenebilmesi için küçük ebatlı havuzlar
                  vardır ve buralar çocuklar için daha uygundur. Ancak her
                  havuzda olduğu gibi buralarda da kaza riskleri vardır ve
                  tavsiyemiz ebeveynlerin kontrollerini esirgememeleridir.
                </div>
              </div>
              <div
                ref={accordionIndex == 34 ? fieldRef : null}
                onClick={
                  accordionIndex == 34 ? () => setIndex(-1) : () => setIndex(34)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 34 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Villada ütü bulunuyor mu?</div>
                <div className={styles.desc}>
                  Evet. Villalarımızda ütü bulunmaktadır. Eğer konaklamak için
                  geçtiğiniz villada ütü bulunmuyorsa yardım alabilir ve
                  teminini sağlayabilirsiniz.
                </div>
              </div>
              <div
                ref={accordionIndex == 35 ? fieldRef : null}
                onClick={
                  accordionIndex == 35 ? () => setIndex(-1) : () => setIndex(35)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 35 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villada saç kurutma makinesi var mı?
                </div>
                <div className={styles.desc}>
                  Evet. Genel olarak kiraladığımız bütün villalarda saç kurutma
                  makinesi bulunmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 36 ? fieldRef : null}
                onClick={
                  accordionIndex == 36 ? () => setIndex(-1) : () => setIndex(36)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 36 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Villada internet var mı?</div>
                <div className={styles.desc}>
                  Aksi belirtilmedikçe villalarımızda kablosuz internet
                  bağlantısı vardır. Fakat villalarımız konum itibariyle büyük
                  şehir merkezlerinde değildirler ve bu nedenle fiber optik vb.
                  altyapılar bulunmayabilmektedir. Bu yüzden bağlantı hızı
                  altyapının izin verdiği ölçüde olmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 37 ? fieldRef : null}
                onClick={
                  accordionIndex == 37 ? () => setIndex(-1) : () => setIndex(37)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 37 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Villalar denize yakı mı?</div>
                <div className={styles.desc}>
                  Denize yakınlık mevzusu villalarımıza göre değişmektedir. Bazı
                  villalarımız denize yürüme mesafesindeyken bazıları 20-25 km
                  mesafede olabilmektedir. Sayfamızda her villamızın konumu ve
                  denize mesafesi yer almaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 38 ? fieldRef : null}
                onClick={
                  accordionIndex == 38 ? () => setIndex(-1) : () => setIndex(38)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 38 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villada bebek yatağı ve mama sandalyesi var mı?
                </div>
                <div className={styles.desc}>
                  Standart olarak villalarımızda bebek yatağı ve mama sandalyesi
                  yer almaz. Bazı villalarımızda, özellikle de çocuk havuzu olan
                  villalarımızda bulunabilmektedir. Sayfamızda villalara ait
                  detaylar yer almakta, bu tür ayrıntılar da
                  öğrenilebilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 39 ? fieldRef : null}
                onClick={
                  accordionIndex == 39 ? () => setIndex(-1) : () => setIndex(39)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 39 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Villada sinek, böcek var mı? İlaçlama yapılıyor mu?
                </div>
                <div className={styles.desc}>
                  Villalarımızın hemen hepsi doğada yer almaktadır. Bu nedenle
                  sinek, böcek vs. olma ihtimali vardır. Bu yüzden de düzenli
                  olarak ilaçlama yapılmakta, güvenliğinizi tehdit edecek
                  unsurlar ortadan kaldırılmaktadır.
                </div>
              </div>
              <div
                ref={accordionIndex == 40 ? fieldRef : null}
                onClick={
                  accordionIndex == 40 ? () => setIndex(-1) : () => setIndex(40)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 40 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Villada sigara içiliyor mu?</div>
                <div className={styles.desc}>
                  Villalarımızın tamamının kapalı alanlarında sigara içilmesi
                  yasaktır. Ancak teras, bahçe gibi açık alanlarında sigara
                  içilebilmektedir.
                </div>
              </div>
              <div
                ref={accordionIndex == 41 ? fieldRef : null}
                onClick={
                  accordionIndex == 41 ? () => setIndex(-1) : () => setIndex(41)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 41 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>Ekstra hizmetler nelerdir?</div>
                <div className={styles.desc}>
                  Siz değerli misafirlerimizin mükemmel bir tatil geçirmesi için
                  bütün imkanlarımızı seferber ediyoruz. İsteğe göre araç
                  kiralama, su sporları, turistik turlar, yemek servisi gibi
                  konularda da yardımcı oluyoruz.
                </div>
              </div>
              <div
                ref={accordionIndex == 42 ? fieldRef : null}
                onClick={
                  accordionIndex == 42 ? () => setIndex(-1) : () => setIndex(42)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 42 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Konaklayacağım villanın anahtarını kimden alacağım?
                </div>
                <div className={styles.desc}>
                  Labirent Turizm olarak en büyük farklarımızdan birisini bu
                  noktada ortaya koyuyoruz. Konaklayacağınız villaya geçişte
                  bizzat biz eşlik ediyor, anahtarı biz teslim ediyoruz. Güvenle
                  villanıza yerleşmenizi sağlıyoruz.
                </div>
              </div>
              <div
                ref={accordionIndex == 43 ? fieldRef : null}
                onClick={
                  accordionIndex == 43 ? () => setIndex(-1) : () => setIndex(43)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 43 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>
                  Konakladığımız villaya giriş yaptıktan sonra süreyi
                  uzatabiliyor muyuz?
                </div>
                <div className={styles.desc}>
                  Bu durum konakladığınız villanın müsait olup olmamasına göre
                  değişmektedir. Eğer villanız daha önceden rezerve edildiyse
                  konaklama süresini uzatamıyoruz. Fakat aynı şartlarda bir
                  villa bulmak için elimizden geleni yapıyoruz.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
