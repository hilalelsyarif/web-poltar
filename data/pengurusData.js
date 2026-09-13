/**
 * Data Pengurus Korps Polisi Taruna (POLTAR) SMKN 2 Depok
 * Struktur data bersih per Angkatan (Akt 18 - 22):
 * 1) Pimpinan Komando: Wadanpol 1, Danpol, Wadanpol 2
 * 2) Penegak Kedisiplinan Taruna (PKT): Ketua PKT & PKT
 * 3) Sekretaris & Bendahara: Sekretaris & Bendahara
 * 4) Divisi Operasional: TIK, Jasmani, Humas, Linmas (Linmas hanya Akt 18 & 19)
 * 5) Anggota: Khusus Angkatan 18 & 19
 *
 * Murni menggunakan placeholder default foto /images/placeholder.jpg
 * dan siap diisi murni dari halaman Admin.
 */

const createAngkatanData = (gen) => {
  const genNum = parseInt(gen, 10);
  const isAkt18Or19 = genNum === 18 || genNum === 19;

  // 1. Pimpinan Komando (Wadanpol 1 di kiri, Danpol di tengah, Wadanpol 2 di kanan)
  const pimpinan = [
    {
      id: `gen-${gen}-wadanpol1`,
      name: "Nama Personel",
      position: "Wadanpol 1",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-danpol`,
      name: "Nama Personel",
      position: "Danpol",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-wadanpol2`,
      name: "Nama Personel",
      position: "Wadanpol 2",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
  ];

  // 2. Penegak Kedisiplinan Taruna (PKT)
  const pkt = [
    {
      id: `gen-${gen}-ketua-pkt`,
      name: "Nama Personel",
      position: "Ketua PKT",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-pkt-1`,
      name: "Nama Personel",
      position: "PKT",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-pkt-2`,
      name: "Nama Personel",
      position: "PKT",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
  ];

  // 3. Sekretaris & Bendahara
  const sekretarisBendahara = [
    {
      id: `gen-${gen}-sekretaris`,
      name: "Nama Personel",
      position: "Sekretaris",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-bendahara`,
      name: "Nama Personel",
      position: "Bendahara",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
  ];

  // 4. Divisi Operasional (TIK, Jasmani, Humas, dan Linmas khusus Akt 18 & 19)
  const divisiOperasional = [
    {
      id: `gen-${gen}-tik`,
      name: "Nama Personel",
      position: "TIK",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-jasmani`,
      name: "Nama Personel",
      position: "Jasmani",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-humas`,
      name: "Nama Personel",
      position: "Humas",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
  ];

  if (isAkt18Or19) {
    divisiOperasional.push({
      id: `gen-${gen}-linmas`,
      name: "Nama Personel",
      position: "Linmas",
      generation: gen,
      image: "/images/placeholder.jpg",
    });
  }

  // 5. Anggota (Khusus Angkatan 18 & 19)
  const anggota = isAkt18Or19
    ? [
        {
          id: `gen-${gen}-anggota-1`,
          name: "Nama Personel",
          position: "Anggota",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
      ]
    : [];

  return {
    pimpinan,
    pkt,
    sekretarisBendahara,
    divisiOperasional,
    anggota,
  };
};

export const pengurusData = {
  18: createAngkatanData("18"),
  19: createAngkatanData("19"),
  20: createAngkatanData("20"),
  21: createAngkatanData("21"),
  22: createAngkatanData("22"),
};

export const generations = ["18", "19", "20", "21", "22"];

export default pengurusData;
