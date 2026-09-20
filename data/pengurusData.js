/**
 * Data Pengurus Korps Polisi Taruna (POLTAR) SMKN 2 Depok
 * Struktur data bersih per Angkatan (Akt 18 - 22):
 * 1) Pimpinan Komando:
 *    - Khusus Akt 22: Wadanki 1, Danki, Wadanki 2
 *    - Akt 18 - 21: Wadanpol 1, Danpol, Wadanpol 2
 * 2) Penegak Kedisiplinan Taruna (PKT): 1 Ketua PKT + 3 Anggota PKT (Total 4 slot)
 * 3) Sekretaris & Bendahara: Sekretaris & Bendahara
 * 4) Divisi Operasional: TIK (2 slot), Jasmani (2 slot), Humas (2 slot), Linmas (2 slot khusus Akt 18 & 19)
 * 5) Anggota: Khusus Angkatan 18 & 19 (3 slot)
 *
 * Murni menggunakan placeholder default foto /images/placeholder.jpg
 * dan siap diisi murni dari halaman Admin.
 */

const createAngkatanData = (gen) => {
  const genNum = parseInt(gen, 10);
  const isAkt22 = genNum === 22;
  const isAkt18Or19 = genNum === 18 || genNum === 19;

  // Khusus Angkatan 22 (Data Personel Resmi)
  if (isAkt22) {
    return {
      pimpinan: [
        {
          id: "gen-22-wadanki1",
          name: "Rasya Walisyani",
          position: "Wadanki 1",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-danki",
          name: "M. Bagas Alghifari",
          position: "Danki",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-wadanki2",
          name: "Nurul Hafidz",
          position: "Wadanki 2",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
      ],
      pkt: [
        {
          id: "gen-22-ketua-pkt",
          name: "Arifianto Ilham",
          position: "Ketua PKT",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-pkt-1",
          name: "Hilal El Syarif",
          position: "PKT",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-pkt-2",
          name: "Ramadhan Jothi",
          position: "PKT",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
      ],
      sekretarisBendahara: [
        {
          id: "gen-22-sekretaris-1",
          name: "Keysha Adinda N",
          position: "Sekretaris",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-sekretaris-2",
          name: "Masayu Queensha",
          position: "Sekretaris",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-bendahara-1",
          name: "Aryabima Suyatna",
          position: "Bendahara",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-bendahara-2",
          name: "Djessica Putri",
          position: "Bendahara",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
      ],
      divisiOperasional: [
        {
          id: "gen-22-tik-1",
          name: "Rendy Arifianto",
          position: "TIK",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-tik-2",
          name: "Jasmine Malika",
          position: "TIK",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-tik-3",
          name: "Syafa Annafi",
          position: "TIK",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-jasmani-1",
          name: "Abqary Muhammad",
          position: "Jasmani",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-jasmani-2",
          name: "Jonathyan Febrian",
          position: "Jasmani",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-jasmani-3",
          name: "Dimas Akbar",
          position: "Jasmani",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-humas-1",
          name: "Babyna Syasyabila",
          position: "Humas",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
        {
          id: "gen-22-humas-2",
          name: "Kayla Satira",
          position: "Humas",
          generation: "22",
          image: "/images/placeholder.jpg",
        },
      ],
      anggota: [],
    };
  }

  // 1. Pimpinan Komando (Wadanpol/Wadanki 1 di kiri, Danpol/Danki di tengah, Wadanpol/Wadanki 2 di kanan)
  const pimpinan = isAkt22
    ? [
        {
          id: `gen-${gen}-wadanki1`,
          name: "Nama Personel",
          position: "Wadanki 1",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
        {
          id: `gen-${gen}-danki`,
          name: "Nama Personel",
          position: "Danki",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
        {
          id: `gen-${gen}-wadanki2`,
          name: "Nama Personel",
          position: "Wadanki 2",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
      ]
    : [
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

  // 2. Penegak Kedisiplinan Taruna (PKT) - 4 Orang (1 Ketua PKT + 3 Anggota PKT)
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
    {
      id: `gen-${gen}-pkt-3`,
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

  // 4. Divisi Operasional (TIK, Jasmani, Humas masing-masing 2 slot, dan Linmas khusus Akt 18 & 19)
  const divisiOperasional = [
    {
      id: `gen-${gen}-tik-1`,
      name: "Nama Personel",
      position: "TIK",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-tik-2`,
      name: "Nama Personel",
      position: "TIK",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-jasmani-1`,
      name: "Nama Personel",
      position: "Jasmani",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-jasmani-2`,
      name: "Nama Personel",
      position: "Jasmani",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-humas-1`,
      name: "Nama Personel",
      position: "Humas",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
    {
      id: `gen-${gen}-humas-2`,
      name: "Nama Personel",
      position: "Humas",
      generation: gen,
      image: "/images/placeholder.jpg",
    },
  ];

  if (isAkt18Or19) {
    divisiOperasional.push(
      {
        id: `gen-${gen}-linmas-1`,
        name: "Nama Personel",
        position: "Linmas",
        generation: gen,
        image: "/images/placeholder.jpg",
      },
      {
        id: `gen-${gen}-linmas-2`,
        name: "Nama Personel",
        position: "Linmas",
        generation: gen,
        image: "/images/placeholder.jpg",
      }
    );
  }

  // 5. Anggota (Khusus Angkatan 18 & 19 - 3 Slot)
  const anggota = isAkt18Or19
    ? [
        {
          id: `gen-${gen}-anggota-1`,
          name: "Nama Personel",
          position: "Anggota",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
        {
          id: `gen-${gen}-anggota-2`,
          name: "Nama Personel",
          position: "Anggota",
          generation: gen,
          image: "/images/placeholder.jpg",
        },
        {
          id: `gen-${gen}-anggota-3`,
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

export function getDefaultPengurusFlatList() {
  const list = [];
  generations.forEach((gen) => {
    const d = pengurusData[gen];
    if (!d) return;
    const combined = [
      ...(d.pimpinan || []),
      ...(d.pkt || []),
      ...(d.sekretarisBendahara || []),
      ...(d.divisiOperasional || []),
      ...(d.anggota || []),
    ];
    combined.forEach((item, index) => {
      list.push({
        id: item.id || `default-${gen}-${index}`,
        name: item.name || "Nama Personel",
        position: item.position || "",
        generation: parseInt(gen, 10),
        image_path: "",
        image_url: item.image || "/images/placeholder.jpg",
        is_default: true,
      });
    });
  });
  return list;
}

export default pengurusData;
