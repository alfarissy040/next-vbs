
const getPerorangan = async () => {
    const dataStsPernikahan = await fetch("/api/parameter/status-nikah").then((res) => res.json());
    const dataAgama = await fetch("/api/parameter/agama").then((res) => res.json());
    const dataNegara = await fetch("/api/parameter/negara").then((res) => res.json());
    const dataProfesi = await fetch("/api/parameter/profesi").then((res) => res.json());
    const dataJnsPekerjaan = await fetch("/api/parameter/jenis-pekerjaan").then((res) => res.json());

    return {
        dataStsPernikahan,
        dataAgama,
        dataNegara,
        dataProfesi,
        dataJnsPekerjaan
    }
}

export default getPerorangan
